const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');

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
    return payment;
}

const updatePayment = async(paymentId, data) =>{
    const pay = await Payment.findOne({_id: paymentId});

    pay.status = data.status || pay.status;
    pay.amount = data.amount || pay.amount;
    const updatedPayment = await Payment.findOneAndUpdate({_id: paymentId}, pay, {new: true});
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