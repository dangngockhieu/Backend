'use strict';

const apiService = require('../../service/apiService');

const postRegister= async(req, res) =>{
  try {
    const data = await apiService.postRegister(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postLogin= async(req, res) =>{
  try {
    const data = await apiService.postLogin(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postRefreshToken= async(req, res) =>{
  try {
    const data = await apiService.postRefreshToken(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postLogout= async(req, res) =>{
  try {
    const data = await apiService.postLogout(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postChangePassword= async(req, res) =>{
  try {
    const data = await apiService.postChangePassword(req.body, req.user);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postProfile= async(req, res) =>{
  try {
    const data = await apiService.postProfile(req.body, req.user);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getOverview= async(req, res) =>{
  try {
    const data = await apiService.getOverview();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getHistory= async(req, res) =>{
  try {
    const data = await apiService.getHistory(req.user);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  postRegister,
  postLogin,
  postRefreshToken,
  postLogout,
  postChangePassword,
  postProfile,
  getOverview,
  getHistory,
};