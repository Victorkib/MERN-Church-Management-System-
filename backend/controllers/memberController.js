const Member = require('../models/memberModel');
const jwt = require('jsonwebtoken');

//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

// member signup
module.exports.signup_post = async (req, res) => {
  const { userName, phoneNumber, email, password } = req.body;
  try {
    const member = await Member.signup(userName, phoneNumber, email, password);
    const token = createToken(member.id);
    res
      .status(200)
      .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      .json({ msg: 'Success user Signup', member });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// member login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const member = await Member.login(email, password);
    const token = createToken(member.id);
    res
      .status(200)
      .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      .json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User Logout
module.exports.logout_get = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('jwt', '', { httpOnly: true, maxAge: new Date(0) })
      .send('Logged out successfully');
  } catch (error) {
    res.status(500).send('Error logging out'); // Handle the error appropriately
  }
};
