'use strict';

require('dotenv/config');
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Kiểm tra email đã tồn tại chưa
const checkEmailExist = async (email) => {
  const user = await db.Participant.findOne({ where: { email } });
  return !!user;
};

// Hash password
const hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Encode base64
const encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
};

// Decode base64
const decodeBase64 = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

// Tạo access_token và refresh_token
const generateToken = (email, role, id) => {
  return {
    access_token: jwt.sign(
      { email, role, id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRED }
    ),
    refresh_token: uuidv4(),
  };
};

module.exports = {
  checkEmailExist,
  hashUserPassword,
  encodeBase64,
  decodeBase64,
  generateToken,
};