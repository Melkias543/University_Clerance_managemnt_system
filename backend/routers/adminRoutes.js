import express, { Router } from "express";
import adminControllers from "../controllers/adminController/adminControllers.js";
const router = express.Router();
///STAFF
router.post("/newStaff", adminControllers.newStaff);
router.put("/editStaff/:id", adminControllers.editStaff);
router.delete("/deleteStaff/:id", adminControllers.deleteStaff);
router.get("/allStaff", adminControllers.Staffs);
router.get("/singleStaff/:id", adminControllers.Staff);

// ROLE

router.post("/createRole", adminControllers.createRole);
router.put("/editRole/:id", adminControllers.editRole);
router.delete("/deleteRole/:id", adminControllers.deleteRole);
router.get("/getAllRole", adminControllers.getAllRole);
router.get("/getSingleRole/:id", adminControllers.getSIngleRole);

export default router;
