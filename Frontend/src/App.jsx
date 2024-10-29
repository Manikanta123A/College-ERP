import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FEE from './pages/FEE'
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Signup from './pages/Signup';
import List from './pages/List';
import Show from './pages/show';
import StudentCard from './pages/StudentCard';
import SelectionPage from './pages/SelectionPage';
import ShowAttendance from './Student/ShowAttendance';
import ShowFee from './Student/ShowFee';
import ShowLibrary from './Student/ShowLibrary';
import Book from './pages/Book';
import ShowBook from './pages/showBook';
import Attendance from './pages/Attendance';
import ADD from './pages/ADD'
import NOt from './pages/NOT'
function App() {
  let navbar = ['/Signup',"/student/:Roll","/teacher/selection",'/student/Attendance/:Roll','/student/Library/:Roll',  '/Student/Fee/:Roll', '/Books' ,'/ShowBook/:id']
  function NavaBar(){
    const location = useLocation();
    const shownav = navbar.some(path => {
      const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
      return regex.test(location.pathname);
    });
    return(<>
    {shownav?   <></>:  <NavBar/>}
    </>)
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Home' element = {<List/>}/>
      <Route path='/show/:Roll' element={<Show/>}/>
      <Route path='/student/:Roll' element={<StudentCard/>}/>
      <Route path='/teacher/selection' element={<SelectionPage/>}/>
      <Route path='/student/Library/:Roll' element={<ShowLibrary/>}/>
      <Route path='/student/Attendance/:Roll' element={<ShowAttendance/>}/>
      <Route path='/student/Fee/:Roll' element={<ShowFee/>}/>
      <Route path='/Books' element={<Book/>}/>
      <Route path='/ShowBook/:id' element={<ShowBook/>}/>
      <Route path='/Attendance' element={<Attendance/>}/>
      <Route path='/Fee' element={<FEE/>}/>
      <Route path='/Addpage' element={<ADD/>}/>
      <Route path="/Not" element={<NOt/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App






























