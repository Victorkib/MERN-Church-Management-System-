const Donation = require('../models/donationModel');

//memeber donations
module.exports.donate_post = async (req, res) => {
  const { donationType, amount } = req.body;
  const userId = req.user || null;
  try {
    if (!donationType || !amount) {
      throw new Error('Please fill all Fields');
    }
    const mydonation = await Donation.create({
      donationType,
      amount,
      userId,
    });
    res.status(200).json({ msg: 'Success Donation done', mydonation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.donator_get = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id).populate('userId');
    if (!donation) {
      throw new Error('No such donation found');
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
