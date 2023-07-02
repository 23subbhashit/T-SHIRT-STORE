import React from "react";
import { Routes, Navigate, Outlet, Component } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoutes = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;