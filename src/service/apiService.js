'use strict';

const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const { ROLE_ADMIN, ROLE_USER } = require('../config/constant');

// Ví dụ: Hàm đăng ký tài khoản
const register=async(email, username, password)=> {
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await db.Participant.create({
      email,
      username,
      password: hashPassword,
      role: ROLE_USER,
    });
    return { EC: 0, EM: 'Register succeed', DT: user };
  } catch (err) {
    return { EC: -1, EM: err.message, DT: '' };
  }
}

// Ví dụ: Hàm đăng nhập
const login = async(email, password)=> {
  try {
    const user = await db.Participant.findOne({ where: { email } });
    if (!user) return { EC: -1, EM: 'User not found', DT: '' };
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return { EC: -1, EM: 'Incorrect password', DT: '' };
    // Tạo token
    const access_token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { EC: 0, EM: 'Login succeed', DT: { access_token, user } };
  } catch (err) {
    return { EC: -1, EM: err.message, DT: '' };
  }
}

// Các hàm khác bạn tự bổ sung theo logic dự án của mình
// Ví dụ: getQuiz, postQuiz, putQuiz, deleteQuiz, getParticipant, postParticipant, v.v.

module.exports = {
  register,
  login,
  // ...thêm các hàm khác ở đây
};