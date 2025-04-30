import express from "express";
import { Login,Signup, tokenRefresh } from "../controllers/userController.js";

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/token', tokenRefresh);



export default router