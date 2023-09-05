


const bookingController = require("../Controllers/Booking.controller");
const authjwt = require("./../Middlewares/authJwt")
const verifyBookingReqBody = require("../Middlewares/VerifyBookingReqBody")

module.exports = function (app) {
    app.get("/MovieBooking/api/v1/bookings", [authjwt.verifyToken ], bookingController.getAllBookings); 
    app.get("/MovieBooking/api/v1/bookings/:id", [authjwt.verifyToken], bookingController.getBookingById);  
    app.post("/MovieBooking/api/v1/bookings", [authjwt.verifyToken , verifyBookingReqBody.validateBookingRequestBody], bookingController.createBooking);
    app.put("/MovieBooking/api/v1/bookings/:id", [authjwt.verifyToken ], bookingController.updateBooking);
}