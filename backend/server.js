const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);
validator;
//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Success Db connection');
    app.listen(port, () => {
      console.log(`Server listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to Db ' + err);
  });
//routes

const memberRouter = require('./routes/memberRoutes');
const donationRouter = require('./routes/donationRouter');

app.use('/api/members', memberRouter);
app.use('/api/donations', donationRouter);
