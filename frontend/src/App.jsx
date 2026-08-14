import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCourse from './components/AddCourse'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import ShowCourse from './components/ShowCourse';
import EditCourse from './components/EditCourse';
const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCourse />} />
        <Route path="/show/:id" element={<ShowCourse />} />
        <Route path="/edit/:id" element={<EditCourse />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
