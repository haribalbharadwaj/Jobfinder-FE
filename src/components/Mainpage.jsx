import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Notfound from './Notfound';
import Home from './Home';
import Mainpage_login from './Mainpage_login';
import Jobedit from './Jobedit';
import Viewdetails from './Viewdetails';
import Addjob from './Addjob';


function Mainpage() {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/' element={<Mainpage_login/>}/>
            <Route path="/jobedit/:id" element={<Jobedit />} /> 
            <Route path="/jobdetails/:id" element={<Viewdetails/>}/>
            <Route path="/addjob" element={<Addjob/>}/>
            <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Mainpage;
