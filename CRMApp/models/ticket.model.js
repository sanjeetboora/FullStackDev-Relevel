const mongoose = require("mongoose");
const {Schema} = mongoose;

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    ticketPriority:{
        type: Number,
        require: true,
        default: 4
    },
    status:{
        type: String,
        required: true,
        default: "open",
        enum: ["open", "inProgress", "resolved", "onHold", "cancelled"],
    },
    assignee:{ //email of the user who is assigning the ticket
        type: String,
    },
    assignedTo:{//email of the user to whom the ticket is assigned
        type: String,
    },
    clientName:{ //company's name by/for which this ticket is created
        type: String,
        required: true
    },
    createdBy:{ //email of the user who created this ticket
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        immutable: true,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default:Date.now,
   },
})

module.exports = mongoose.model("Ticket", ticketSchema);