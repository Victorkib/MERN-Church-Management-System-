const mongoose = require('mongoose');
const member = require('../models/memberModel');
const donationSchema = new mongoose.Schema(
  {
    donationType: {
      type: String,
    },
    amount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'member',
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model('donation', donationSchema);
module.exports = Donation;
