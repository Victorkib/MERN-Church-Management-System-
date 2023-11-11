const mongoose = require('mongoose');
const Member = require('../models/memberModel');
const jwt = require('jsonwebtoken');

//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
//get user
module.exports.user_get = async (req, res) => {
  const id = req.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Id' });
  }
  try {
    const member = await Member.findById({ _id: id });
    if (!member) {
      throw new Error('No such Member Found');
    }
    res.status(200).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//member patch
module.exports.user_patch = async (req, res) => {
  const { userName, phoneNumber } = req.body;
  const id = req.user;
  try {
    const member = await Member.findByIdAndUpdate(
      id,
      {
        userName,
        phoneNumber,
      },
      { new: true }
    );
    if (!member) {
      throw new Error('No such member to Update');
    }
    res.status(200).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// member signup
module.exports.signup_post = async (req, res) => {
  const { userName, phoneNumber, email, password } = req.body;
  try {
    const member = await Member.signup(userName, phoneNumber, email, password);
    const token = createToken(member.id);
    res
      .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      .status(200)
      .json({ value: true, userName: member.userName });
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
      .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      .status(200)
      .json({ value: true, userName: member.userName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//isLoggedIn
module.exports.isLoggedIn_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ msg: 'not authorized 1', value: false });
  }
  // Verify token
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET);
    // Find user by ID
    const user = await Member.findById(verifyToken._id);
    if (!user) {
      return res.status(401).json({ msg: 'not authorized 2', value: false });
    } else {
      return res.status(200).json({ userName: user.userName, value: true });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ msg: 'not authorized 3', value: false });
  }
};

// User Logout
module.exports.logout_get = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('jwt', '', { maxAge: new Date(0) })
      .json(false);
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' }); // Handle the error appropriately
  }
};
