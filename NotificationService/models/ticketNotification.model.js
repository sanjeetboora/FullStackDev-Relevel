const mongoose = require('mongoose');

const ticketNotificationSchema = new mongoose.Schema({
    subject: {
        type:String,
        required: true,
        maxLength: 200,
        minLenghth: 3,
    },
    content:{
        type: String,
        required: true
    },
    recepientEmails:{
        type: [String],
        required: true
    },
    sentStatus:{
        type: String,
        required: true,
        default: "UNSENT"
    },
    requester: {
        type: String,
        required: true,
    },
    ticketId:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        immutable: true,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const ticketNotificationModel = mongoose.model('TicketNotification', ticketNotificationSchema);

module.exports = ticketNotificationModel;