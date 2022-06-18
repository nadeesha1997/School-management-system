import './App.css';
import ResponsiveAppBar from "./components/NavBar";
import React from 'react';
import Tasks from './components/Tasks';
import SignUp from './components/Signup';
import Login from './components/Login';
import ManageTeachers from './components/ManageTeachers';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

function App() {
  return (  
  <>
 <Router>
 <ResponsiveAppBar/>
 <Routes>
    <Route exact path='/' element={< Tasks />}></Route>
    <Route exact path='/login' element={<Login/>}></Route>
    <Route exact path='/signup' element={< SignUp />}></Route>
    <Route exact path='/teachers' element={<ManageTeachers/>}></Route>
    <Route exact path='/task/add' element={<AddTask/>}></Route>
    <Route exact path='/task/edit/:id' element={<EditTask/>}></Route>
  </Routes>
 </Router>
  </>)
}

export default App;
