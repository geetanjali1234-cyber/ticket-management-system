import Ticket from "../models/Ticket.js";

// Create Ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description, category, createdBy } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      createdBy,
    });

    res.status(201).json({
      message: "Ticket Created Successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Tickets of Logged-in User
export const getMyTickets = async (req, res) => {
  try {
    const { userId } = req.params;

    const tickets = await Ticket.find({ createdBy: userId });

    res.status(200).json({
      tickets,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Ticket Updated Successfully",
      ticket: updatedTicket,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({
      message: "Ticket Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Dashboard Analytics
export const getDashboardStats = async (req, res) => {
  try {

    const { userId } = req.params;

    const totalTickets = await Ticket.countDocuments({
      createdBy: userId,
    });

    const openTickets = await Ticket.countDocuments({
      createdBy: userId,
      status: "Open",
    });

    const progressTickets = await Ticket.countDocuments({
      createdBy: userId,
      status: "In Progress",
    });

    const closedTickets = await Ticket.countDocuments({
      createdBy: userId,
      status: "Closed",
    });

    res.status(200).json({
      totalTickets,
      openTickets,
      progressTickets,
      closedTickets,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Get All Tickets (Admin)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "fullName email");

    res.status(200).json({
      tickets,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Admin Update Ticket Status
export const updateTicketStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Status Updated Successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};