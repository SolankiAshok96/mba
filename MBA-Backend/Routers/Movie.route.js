const authJwt = require("../Middlewares/authJwt");

const movieController = require("./../Controllers/Movie.controller");
module.exports = function (app) {
    app.get("/movieBooking/api/v1/movies",[authJwt.verifyToken], movieController.getAllMovies);
    app.get("/movieBooking/api/v1/movies/:movieId",[authJwt.verifyToken], movieController.getMovieById);
    app.post("/movieBooking/api/v1/movies",[authJwt.verifyToken ], movieController.createMovie);
    app.put("/movieBooking/api/v1/movies/:id",[authJwt.verifyToken,], movieController.updateMovie);
}