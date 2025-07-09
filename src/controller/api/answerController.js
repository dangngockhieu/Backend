'use strict';

const apiService = require('../../service/apiService');

const getAnswer= async(req, res) =>{
  try {
    const data = await apiService.getAnswer(req.params.questionId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postAnswer= async(req, res) =>{
  try {
    const data = await apiService.postAnswer(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const putAnswer= async(req, res) =>{
  try {
    const data = await apiService.putAnswer(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const deleteAnswer= async(req, res) =>{
  try {
    const data = await apiService.deleteAnswer(req.body.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAnswer,
  postAnswer,
  putAnswer,
  deleteAnswer,
};