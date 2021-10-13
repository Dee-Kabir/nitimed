const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require('mongoose')
const cors = require("cors");
const path = require("path");
// const { authJwt } = require('./helpers/jwt');
const { errorHandler } = require('./helpers/errorHandler');
const usersRoutes = require('./routes/user')
const appointmentsRoutes = require('./routes/appointment')
const doctorsRoutes = require('./routes/doctor')
const emailRoutes = require('./routes/emailRoute')
const razorpayRoutes = require('./routes/razorpay')
const hospitalRoutes = require('./routes/hospital')
const animalRoutes = require('./routes/animal')
const queryRoutes = require('./routes/queries')
// middlewares
app.use(cors());
app.options('*',cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use('/public/upload/', express.static(__dirname + '/public/upload/' ))

// app.use(authJwt())
app.use(errorHandler)

// database
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("connected to database")
}).catch(err => {
  console.log(err)
})

const api = process.env.API_URL

// routes 
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/doctors`,doctorsRoutes)
app.use(`${api}/appointments`,appointmentsRoutes)
app.use(`${api}/email`,emailRoutes)
app.use(`${api}/razorpay`,razorpayRoutes)
app.use(`${api}/hospitals`,hospitalRoutes)
app.use(`${api}/animals`,animalRoutes)
app.use(`${api}/queries`,queryRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}


const PORT = process.env.PORT
app.listen(PORT || 8000, () => {
  console.log("connected");
});
