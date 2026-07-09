import express from "express";
import {
  createTicket,
  getMyTickets,
  updateTicket,
  deleteTicket, 
  getDashboardStats,
  getAllTickets,
  updateTicketStatus,
  
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create",protect, createTicket);
router.get("/mytickets/:userId",protect, getMyTickets);
router.put("/update/:id", protect ,updateTicket);
router.delete("/delete/:id", protect,deleteTicket);
router.get("/dashboard/:userId",protect, getDashboardStats);
router.get("/all",protect, getAllTickets);
router.put("/status/:id", updateTicketStatus);
export default router;