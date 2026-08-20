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
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MyCourses from "./components/MyCourses";
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
<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
<Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>
<Route
    path="/my-courses"
    element={
        <ProtectedRoute userOnly={true}>
            <MyCourses />
        </ProtectedRoute>
    }
/>
  </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
