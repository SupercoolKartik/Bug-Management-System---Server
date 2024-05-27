import express, { Router } from "express";
import dotenv from "dotenv";
import Ticket from "../schema/tickets.js";
import mongoose from "mongoose";
const router = express.Router();

//ROUTE 1: Route to CREATE A TICKET
router.post("/createticket", async (req, res) => {
  try {
    await Ticket.create(req.body);
    res.json({ msg: "Ticket is probably created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2: Route to EDIT STATUS OF TICKET
router.put("/editstatus/:tId/:tStatus", async (req, res) => {
  try {
    const { tId, tStatus } = req.params;

    // // Validate tStatus
    // if (!["To Do", "In Progress", "Done"].includes(tStatus)) {
    //   return res.status(400).json({ error: "Invalid status value" });
    // }

    // Find the ticket by ID and update its status
    const updatedTicket = await Ticket.findByIdAndUpdate(
      tId,
      { $set: { status: tStatus } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
