const jwt = require('jsonwebtoken');
const Member = require('../models/memberModel');

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return sendUnauthorizedResponse(res, 'No Token Provided');
    }

    const verify = jwt.verify(token, process.env.SECRET);
    if (!verify) {
      return sendUnauthorizedResponse(res, 'Invalid Token');
    }

    const user = await Member.findById(verify._id);
    if (!user) {
      return sendUnauthorizedResponse(res, 'User not found');
    }

    req.user = verify._id;
    next();
  } catch (error) {
    return sendErrorResponse(res, 'Error during authentication');
  }
};

function sendUnauthorizedResponse(res, message) {
  return res.status(401).json({ auth: false, message });
}

function sendErrorResponse(res, message) {
  return res.status(500).json({ auth: false, message });
}

module.exports = auth;
