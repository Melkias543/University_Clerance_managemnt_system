// const express = require("express");
import express from "express";
// const authRoute= require("./routers/authoRoutes");
import authRoute from "./routers/authoRoutes.js";
import applicationRoutes from "./routers/applicationRoutes.js";
import servicesRoutes from './routers/clearanceServiceRoute.js'
import adminRoutes from './routers/adminRoutes.js'
import issuedRouter from "./routers/issuedRouter.js";
const index = express();
index.use("/auth", authRoute);
index.use("/clearance", applicationRoutes);
index.use("/services", servicesRoutes);
index.use("/admin", adminRoutes);
index.use("/issudeStudent", issuedRouter);
export default  index;