'use strict';

const bcrypt = require('bcryptjs');
const db = require('../models');

// Hash password
const hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Tạo user mới
const createNewUser = async (email, password, username) => {
  try {
    const hashPassword = hashUserPassword(password);
    await db.User.create({
      email,
      password: hashPassword,
      username,
    });
    return { EC: 0, EM: 'Create user succeed' };
  } catch (err) {
    console.log('>>> check error:', err);
    return { EC: -1, EM: err.message };
  }
};

// Lấy danh sách user
const getUserList = async () => {
  try {
    const users = await db.User.findAll();
    return { EC: 0, DT: users };
  } catch (err) {
    return { EC: -1, EM: err.message };
  }
};

// Xóa user theo id
const deleteUser = async (id) => {
  try {
    await db.User.destroy({ where: { id } });
    return { EC: 0, EM: 'Delete user succeed' };
  } catch (err) {
    return { EC: -1, EM: err.message };
  }
};

// Lấy user theo id
const getUserById = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    return { EC: 0, DT: user ? user.get({ plain: true }) : null };
  } catch (err) {
    return { EC: -1, EM: err.message };
  }
};

// Cập nhật thông tin user
const updateUserInfor = async (email, username, id) => {
  try {
    await db.User.update(
      { email, username },
      { where: { id } }
    );
    return { EC: 0, EM: 'Update user succeed' };
  } catch (err) {
    return { EC: -1, EM: err.message };
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};