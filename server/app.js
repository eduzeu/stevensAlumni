import express from "express";
import dotenv from "dotenv";
import { users } from "./config/mongoCollections.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from 'cors';
let userCollection = await users();
let saltrounds = 10;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin (React dev server)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true // If you need to include credentials (cookies, etc.)
}));
app.use(express.json()); 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Store the decoded user info in req
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  let user = await userCollection.findOne({email: email});
  let compare = await bcrypt.compare(password, user.password);
  if(!user || compare) {
    return res.status(401).json({message: 'Invalid Login'});
  }
  const token = jwt.sign({ _id: user._id, email: user.email }, 'secret_key');
  return res.json({ token });
});

app.post("/api/createAccount", async (req, res) => {
  const {
    email,
    password,
    fullName,
    gradYear,
    major,
    jobTitle,
    company,
    linkedIn,
    location,
    mentoring
    } = req.body;
  let alreadyExists = await userCollection.findOne({email: email});
  if(alreadyExists){
    return res.status(400).json({message: 'User with this email already exists'});
  }
  let hashedPass = await bcrypt.hash(password, saltrounds);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let userObj = {
    "Full Name": fullName,
    "Graduation Year": gradYear,
    "Major": major,
    "Email": email,
    "Job Title": jobTitle,
    "Company": company,
    "LinkedIn Profile": linkedIn,
    "Location": location,
    "Interested in Mentoring?": mentoring,
    "Last Updated": today,
    "Password": hashedPass,
    "Mentorees": [],
    "Mentors": [],
    "IncomingRequests": [],
    "OutgoingRequests": []
  }
  let inserted = await userCollection.insertOne(userObj);
  if(!inserted.acknowledged){
    return res.status(403).json({message: "Server error, could not create account"});
  }
  return res.json({message: "Account created successfully"});
});

app.get("/api/getAllMentors", async (req, res) => {
  let allUsers = await userCollection.find({"Interested in Mentoring?": true}).toArray();
  return res.json({users: allUsers});
});

app.get("/api/getAllUsers", async (req, res) => {
  let allUsers = await userCollection.find({}).toArray();
  return res.json({users: allUsers});
});

app.get("/api/getAllActiveMentors", async (req, res) => {
  let mentors = await userCollection.find({$expr: { $gte: [{ $size: "$Mentorees" }, 1]}}).toArray();
  return res.json({users: mentors});
});

app.post("/api/acceptMentoree/:mentoreeId", authenticateToken, async (req, res) => {
  let currUser = req.user;
  const {mentoreeId} = req.params;
  let user = await userCollection.findOne({_id: currUser._id});
  user["IncomingRequests"] = user["IncomingRequests"].filter(request => request.toString() != mentoreeId);
  user["Mentorees"].push(new ObjectId(mentoreeId));
  let updated = await userCollection.findOneAndReplace({_id: currUser._id}, user);
  if(!updated){
    return res.status(403).json({message: "Error updating collection"});
  }
  let mentoree = await userCollection.findOne({_id: new ObejctId(mentoreeId)});
  mentoree["OutgoingRequests"] = user["OutgoingRequests"].filter(request => request != currUser._id);
  mentoree["Mentors"].push(currUser._id);
  let updatedMentoree = await userCollection.findOneAndReplace({_id: new ObjectId(mentoreeId)}, mentoree);
  if(!updatedMentoree){
    return res.status(403).json({message: "Error updating collection"});
  }
  return res.json({message: "Update Ok"});
});

app.post("/api/rejectMentoree/:mentoreeId", authenticateToken, async (req, res) => {
  let currUser = req.user;
  const {mentoreeId} = req.params;
  let user = await userCollection.findOne({_id: currUser._id});
  user["IncomingRequests"] = user["IncomingRequests"].filter(request => request.toString() != mentoreeId);
  let updated = await userCollection.findOneAndReplace({_id: currUser._id}, user);
  if(!updated){
    return res.status(403).json({message: "Error updating collection"});
  }
  let mentoree = await userCollection.findOne({_id: new ObejctId(mentoreeId)});
  mentoree["OutgoingRequests"] = user["OutgoingRequests"].filter(request => request != currUser._id);
  let updatedMentoree = await userCollection.findOneAndReplace({_id: new ObjectId(mentoreeId)}, mentoree);
  if(!updatedMentoree){
    return res.status(403).json({message: "Error updating collection"});
  }
  return res.json({message: "Update Ok"});
});

app.get("/api/getCurrentMentors", authenticateToken, async (req, res) => {
  let currUser = req.user;
  let userObj = await userCollection.findOne({_id: currUser._id});
  let mentors = userObj["Mentors"];
  if(mentors.length < 1){
    return res.json({mentors: []});
  }
  let mentorObjs = await userCollection.find({_id: {$in: mentors}});
  return res.json({mentors: mentorObjs});
});

app.get("/api/getCurrentMentorees", authenticateToken, async (req, res) => {
  let currUser = req.user;
  let userObj = await userCollection.findOne({_id: currUser._id});
  let mentors = userObj["Mentorees"];
  if(mentors.length < 1){
    return res.json({mentors: []});
  }
  let mentorObjs = await userCollection.find({_id: {$in: mentors}});
  return res.json({mentors: mentorObjs});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
