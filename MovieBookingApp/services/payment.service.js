const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const {sendEmail} = require('../utils/notificationClient');
const {mailTemplate} = require('../utils/notificationMailTemplate');

const getAllPayments = async()=>{
    const payments = Payment.find();
    return payments;
}

const createPayment = async(data) =>{
    const paymentObj = {
        bookingId: data.bookingId,
        amount: data.amount,
        status: data.status,
    }

    const payment = await Payment.create(paymentObj);
    const booking = await Booking.findOne({_id: data.bookingId});
    booking.paymentId = payment._id;
    await Booking.findOneAndUpdate({_id: data.bookingId}, booking);
    const user = await User.findOne({_id: booking.userId});
    const emailContent = mailTemplate(user.name, `your payment is done successfully.`, `Payment Information: ${payment}`);
    
    sendEmail(
        "Payment is done successfully", 
        emailContent, 
        user.email,
        user.email,
        payment._id.toString()
    );
    return payment;
}

const updatePayment = async(paymentId, data) =>{
    const pay = await Payment.findOne({_id: paymentId});

    pay.status = data.status || pay.status;
    pay.amount = data.amount || pay.amount;
    const updatedPayment = await Payment.findOneAndUpdate({_id: paymentId}, pay, {new: true});
    const booking = await Booking.findOne({_id: updatedPayment.bookingId});
    const user = await User.findOne({_id: booking.userId});
    const emailContent = mailTemplate(user.name, `your payment is updated successfully.`, `Payment Information: ${updatedPayment}`);
    sendEmail(
        "Payment is updated successfully", 
        emailContent, 
        user.email,
        user.email,
        updatedPayment._id.toString()
    );
    return updatedPayment;
}

const getPaymentByPaymentId = async(paymentId) =>{
    const pay = await Payment.findOne({_id: paymentId});
    return pay;
}
const getPaymentByBookingId = async(bookingId) =>{
    const booking = await Booking.findOne({_id: bookingId});
    const pay = await Payment.findOne({_id: booking.paymentId});
    return pay;
}
module.exports = {getAllPayments, createPayment, updatePayment, getPaymentByPaymentId, getPaymentByBookingId};