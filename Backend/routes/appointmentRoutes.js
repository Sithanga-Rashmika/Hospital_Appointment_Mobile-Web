import express from "express";
import { AddNew,retirveAll,deleteAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post('/add', AddNew);
router.post('/get', retirveAll);
router.post('/delete', deleteAppointment);



export default router