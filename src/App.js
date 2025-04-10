import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Directory from "./components/Directory";
import Home from "./components/Home";
import Mentorship from "./components/Mentorship";
import Prof from "./components/Prof";
import Messages from "./components/Messages";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import CreateAccount from './components/CreateAccount';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <>
                <NavBar/>
                <Home />
              </>
            }
          />

           <Route path="/mentorship" element={
            <>
              <NavBar/>
              <Mentorship />
            </>
          } />
          
          <Route path="/database" element={
            <>
              <NavBar/>
              <Directory />
            </>
          } />
          
          <Route path="/profile" element={
            <>
              <NavBar/>
              <Prof />
            </>
          } />

          <Route path="/messages" element={
            <>
              <NavBar/>
              <Messages />
            </>
          } />
          <Route path="/createaccount" element={<CreateAccount />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
