const express = require("express");
const bodyParser = require("body-parser");
const serverConfig = require("./Configs/server.config");
const dbConfig = require("./Configs/db.config");
const mongoose = require("mongoose");
const Movies = require("./Models/Movies");
const Users = require("./Models/Users");
const bcrypt = require("bcryptjs");
const Theatre = require("./Models/Theatre");
const Bookings = require("./Models/Bookings");


const expressApp = express();

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});
db.once("open", () => {
  console.log("Successfully Connected to mongo DB");
  init();
});

// This function will initilize the state of thr

async function init() {
  await Users.collection.drop();
  const user1 = await Users.create({
    name: "Ashok",
    userId: "admin",
    email: "as6728825@gmail.com",
    userType: "ADMIN",
    password: bcrypt.hashSync("Welcome", 8),
  });
  const user2 = await Users.create({
    name: "rahul",
    userId: "customer",
    email: "as6728825@gmail.com",
    userType: "CUSTOMER",
    password: bcrypt.hashSync("Welcome", 8),
  });

  await Movies.collection.drop();
  const movie = await Movies.create({
    name: "Radhe Shyam",
    description: "Comedy Drama Movie",
    casts: ["Prabhas", "Pooja Hegde"],
    director: "Radha Krishna Kumar",
    trailerUrl: "http://RadhaShyam/trailers/1",
    posterUrl: "http://radhaShyam/posters/1",
    language: "Hindi",
    releaseDate: "11-02-2022",
    releaseStatus: "RELEASED",
  });
  console.log("Two users created successfully");

  const client = await Users.create({
    name: "Client1",
    userId: "client",
    email: "as6728825@gmail.com",
    userType: "CLIENT",
    password: bcrypt.hashSync("Welcome", 8),
  });

  await Theatre.collection.drop();

  const theatre = await Theatre.create({
    name: "FunCinema",
    city: "Bangalore",
    description: "Top Class Theatre",
    pinCode: 560052,
    movies: [movie._id],
    ownerId: [client._id],
  });

  console.log("A movie and a Theatre created successfully");

  await Bookings.collection.drop();
  const booking = await Bookings.create({
    theatreId: theatre._id,
    userId: user2._id,
    movieId: movie._id,
    timing: "9 pm - 12 pm",
    noOfSeats: 5,
  });


  console.log("Booking created");
}

require("./Routers/Movie.route")(expressApp);
require("./Routers/Theatre.route")(expressApp);
require("./Routers/Auth.route")(expressApp);
require("./Routers/User.route")(expressApp);
require("./Routers/Booking.route")(expressApp);
require("./Routers/Payment.route")(expressApp);

expressApp.listen(serverConfig.PORT, () => {
  console.log(`Application started on port ${serverConfig.PORT}`);
});
