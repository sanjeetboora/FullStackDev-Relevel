const bookingController = require("../controllers/booking.controller");
const {validateBookingReqBody, isValidBookingId, isAdminOrBookingOwner} = require('../middlewares/booking/requestValidators')
const {verifyUserWithToken, isUserStatusApproved, isAdmin} = require('../middlewares/auth/authJwtToken');
const {isAdminOrTheatreOwner} = require('../middlewares/theatre/requestValidator');

module.exports = function(app){
    
    // create a booking (authenticated users)
    app.post('/mba/api/v1/book/', [verifyUserWithToken, isUserStatusApproved, validateBookingReqBody], bookingController.createBooking);

    // update a booking (authenticated users)
    app.put('/mba/api/v1/book/:id', [verifyUserWithToken, isUserStatusApproved, isValidBookingId, isAdminOrBookingOwner], bookingController.updateBooking);

    // get all bookings (only admin)
    app.get('/mba/api/v1/book/', [verifyUserWithToken, isUserStatusApproved, isAdmin], bookingController.getAllBookings);

    // get booking by booking id (only admin & user who made the booking)
    app.get('/mba/api/v1/book/:id', [verifyUserWithToken, isUserStatusApproved, isValidBookingId, isAdminOrBookingOwner], bookingController.getBookingByBookingId);

    // get booking by showroom id (only admin & user who made the booking)
    app.get('/mba/api/v1/bookByShowroom/:id', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwner], bookingController.getBookingByShowroomId);

}
