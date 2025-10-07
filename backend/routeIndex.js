// const express = require("express");
import express from "express";
// const authRoute= require("./routers/authoRoutes");
import authRoute from "./routers/authoRoutes.js";
import applicationRoutes from "./routers/applicationRoutes.js";
import servicesRoutes from './routers/clearanceServiceRoute.js'
const index = express();
index.use("/auth", authRoute);
index.use("/clearance", applicationRoutes);
index.use("/services", servicesRoutes);

export default  index;