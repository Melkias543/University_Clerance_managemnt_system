import express from 'express'
const router = express.Router();
import cleranceServiceControllers from '../controllers/cleranceServiceControllers.js';

router.post("/addService", cleranceServiceControllers.addNewService);
router.get("/getAllservices", cleranceServiceControllers.getAllService)
router.get("/getSingleService/:id", cleranceServiceControllers.getSingleService);

router.delete("/deleteService/:id", cleranceServiceControllers.deleteService);

router.put('/updateService/:id',cleranceServiceControllers.updateService)
export default router