const paymentController = require("../controllers/payment.controller");
const {verifyUserWithToken, isUserStatusApproved, isAdmin} = require('../middlewares/auth/authJwtToken');
const {validatePaymentReqBody, isAdminOrBookingOwner, isValidPaymentId} = require('../middlewares/payment/requestValidator');
const bookingMiddlewares = require('../middlewares/booking/requestValidators');

module.exports = function(app){
    //to get all the payments
    app.get('/mba/api/v1/payments', [verifyUserWithToken, isUserStatusApproved, isAdmin], paymentController.getAllPayments);
    
    //to create a payment
    app.post('/mba/api/v1/payments', [validatePaymentReqBody, verifyUserWithToken, isUserStatusApproved, isAdminOrBookingOwner], paymentController.createPayment);

    //to update a payment status
    app.put('/mba/api/v1/payment/:id', [verifyUserWithToken, isUserStatusApproved, isValidPaymentId, isAdminOrBookingOwner], paymentController.updatePayment);

    //to get payment using booking id
    app.get('/mba/api/v1/paymentByBookingId/:id', [verifyUserWithToken, isUserStatusApproved, bookingMiddlewares.isValidBookingId, bookingMiddlewares.isAdminOrBookingOwner], paymentController.getPaymentByBookingId);
    
    //to get payment using payment id
    app.get('/mba/api/v1/payments/:id', [verifyUserWithToken, isUserStatusApproved, isValidPaymentId], paymentController.getPaymentByPaymentId);
    
}