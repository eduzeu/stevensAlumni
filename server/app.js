import express from "express";
import dotenv from "dotenv";
import { users } from "./config/mongoCollections";
import bcrypt from "bcrypt";
let userCollection = await users();
let saltrounds = 10;

const app = express();

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  let user = userCollection.findOne({email: email});
  let compare = await bcrypt.compare(password, user.password);
  if(!user || compare) {
    return res.status(401).json({message: 'Invalid Login'});
  }
  const token = jwt.sign({ id: user.id, name: user.name }, 'secret_key');
  return res.json({ token });
});

app.post("/api/createAccount", async (req, res) => {
  const {email, password} = req.body;
  let alreadyExists = userCollection.findOne({email: email});
  if(alreadyExists){
    return res.status(400).json({message: 'User with this email already exists'});
  }
  let hashedPass = await bcrypt.hash(password);
  let inserted = userCollection.insertOne({email: email, password: hashedPass});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
