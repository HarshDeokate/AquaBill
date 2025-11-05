// backend/routes/deliveries.js
import express from "express";

import { getDeliveries,createDelivery } from "../controller/DeliveryController.js";


const router = express.Router();
// GET all deliveries
router.get("/get", getDeliveries);
router.post("/create", createDelivery);



export default router;
