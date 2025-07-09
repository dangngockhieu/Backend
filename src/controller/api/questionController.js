'use strict';

const apiService = require('../../service/apiService');

const getQuestion= async(req, res) =>{
  try {
    const data = await apiService.getQuestion(req.query.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const postQuestion= async(req, res) =>{
  try {
    const data = await apiService.postQuestion(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const putQuestion= async(req, res) =>{
  try {
    const data = await apiService.putQuestion(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const deleteQuestion= async(req, res) =>{
  try {
    const data = await apiService.deleteQuestion(req.body.id, req.body.quizId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getQuestionByQuiz= async(req, res) =>{
  try {
    const data = await apiService.getQuestionByQuiz(req.params.quiz_id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getQuestion,
  postQuestion,
  putQuestion,
  deleteQuestion,
  getQuestionByQuiz,
};