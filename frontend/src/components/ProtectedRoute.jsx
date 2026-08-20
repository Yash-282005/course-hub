import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    if (userOnly && user.role === "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;