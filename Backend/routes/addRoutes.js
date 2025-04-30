import express from "express";
import { AddNew,getAllAdds } from "../controllers/addController.js";

const router = express.Router();

router.post('/add', AddNew);
router.get('/get', getAllAdds);



export default router