'use strict';

const apiService = require('../../service/apiService');

const getQuiz= async(req, res) =>{
  try {
    const data = await apiService.getQuiz(req.query);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postQuiz= async(req, res) =>{
  try {
    const data = await apiService.postQuiz(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const putQuiz= async(req, res) =>{
  try {
    const data = await apiService.putQuiz(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const deleteQuiz= async(req, res) =>{
  try {
    const data = await apiService.deleteQuiz(req.body.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getQuizByParticipant= async(req, res) =>{
  try {
    const data = await apiService.getQuizByParticipant(req.params.participantId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postQuizSubmit= async(req, res) =>{
  try {
    const data = await apiService.postQuizSubmit(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postQuizAssign= async(req, res) =>{
  try {
    const data = await apiService.postQuizAssign(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getQuizWithQA= async(req, res) =>{
  try {
    const data = await apiService.getQuizWithQA(req.params.quizId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postQuizWithQA= async(req, res) =>{
  try {
    const data = await apiService.postQuizWithQA(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getQuiz,
  postQuiz,
  putQuiz,
  deleteQuiz,
  getQuizByParticipant,
  postQuizSubmit,
  postQuizAssign,
  getQuizWithQA,
  postQuizWithQA,
};