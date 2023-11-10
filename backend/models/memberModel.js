const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail, isStrongPassword } = require('validator');
const memberSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: 254,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

//signup statics
memberSchema.statics.signup = async function (
  userName,
  phoneNumber,
  email,
  password
) {
  //validate all fields are filled
  if (!userName || !email || !password) {
    throw new Error('All fileds must be filled');
  }
  const exist = await this.findOne({ userName: userName });
  if (exist) {
    throw new Error('That userName is already in use');
  }

  //validate email
  if (!isEmail(email)) {
    throw new Error('That is an Invalid Email');
  }
  const match = await this.findOne({ email: email });
  if (match) {
    throw new Error('That email is already registered');
  }
  if (!isStrongPassword(password)) {
    throw new Error('That is not a strong Password');
  }

  //hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const member = await this.create({
    userName,
    phoneNumber,
    email,
    password: hashPass,
  });
  if (!member) {
    throw new Error('Error Creating member');
  }
  return member;
};

//login statics
memberSchema.statics.login = async function (email, password) {
  //validate all fileds are filled
  if (!email || !password) {
    throw new Error('All fileds must be filled');
  }
  if (!isEmail(email)) {
    throw new Error('Invalid Email format');
  }
  const member = await this.findOne({ email: email }).select('+password');
  if (!member) {
    throw new Error('Invalid login credentials email or Password');
  }
  const comparePass = await bcrypt.compare(password, member.password);
  if (!comparePass) {
    throw new Error('Invalid Login credentials email or Password');
  }
  return member;
};

const Member = mongoose.model('member', memberSchema);
module.exports = Member;
