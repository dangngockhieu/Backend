'use strict';

const apiService = require('../../service/apiService');

const getParticipant= async(req, res) =>{
  try {
    const data = await apiService.getParticipant(req.query.page, req.query.limit);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getAllParticipant= async(req, res) =>{
  try {
    const data = await apiService.getAllParticipant();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postParticipant= async(req, res) =>{
  try {
    const data = await apiService.postParticipant(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const putParticipant= async(req, res) =>{
  try {
    const data = await apiService.putParticipant(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const deleteParticipant= async(req, res) =>{
  try {
    const data = await apiService.deleteParticipant(req.body.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getParticipant,
  getAllParticipant,
  postParticipant,
  putParticipant,
  deleteParticipant,
};