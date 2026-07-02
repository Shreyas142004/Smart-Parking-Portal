import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getRevenue } from "../controllers/adminRevenueController.js";

const router = express.Router();

router.get("/", protect, getRevenue);

export default router;