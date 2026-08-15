import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddCourse from './components/AddCourse'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import ShowCourse from './components/ShowCourse';
import EditCourse from './components/EditCourse';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from "./Components/ProtectedRoute";
const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>

    <Route path="/" element={<Home />} />

    <Route
        path="/register"
        element={<Register />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/show/:id"
        element={<ShowCourse />}
    />

    <Route
        path="/add"
        element={
            <ProtectedRoute adminOnly={true}>
                <AddCourse />
            </ProtectedRoute>
        }
    />

    <Route
        path="/edit/:id"
        element={
            <ProtectedRoute adminOnly={true}>
                <EditCourse />
            </ProtectedRoute>
        }
    />
  <Route
    path="/edit"
    element={<Navigate to="/" />}
/>  
</Routes>
      </BrowserRouter>
    </>
  )
}

export default App
