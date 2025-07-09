'use strict';

const express = require('express');
const { checkUserJWT, checkUserPermission, addDelay } = require('../middleware/JWTAction');
const loginRegisterController = require('../controller/api/loginRegisterController');
const quizController = require('../controller/api/quizController');
const answerController = require('../controller/api/answerController');
const questionController = require('../controller/api/questionController');
const participantController = require('../controller/api/participantController');

const router = express.Router();

const initAPIRoutes = (app) => {
  // Middleware kiểm tra JWT và phân quyền cho tất cả các route
  router.all('*', checkUserJWT, checkUserPermission);

  // Auth
  router.post('/register', loginRegisterController.postRegister);
  router.post('/login', loginRegisterController.postLogin);
  router.post('/refresh-token', loginRegisterController.postRefreshToken);
  router.post('/logout', loginRegisterController.postLogout);
  router.post('/change-password', loginRegisterController.postChangePassword);
  router.post('/profile', loginRegisterController.postProfile);
  router.get('/overview', loginRegisterController.getOverview);
  router.get('/history', loginRegisterController.getHistory);

  // Participant
  router.get('/participant', participantController.getParticipant);
  router.get('/participant/all', participantController.getAllParticipant);
  router.post('/participant', participantController.postParticipant);
  router.put('/participant', participantController.putParticipant);
  router.delete('/participant', participantController.deleteParticipant);

  // Quiz
  router.get('/quiz', quizController.getQuiz);
  router.post('/quiz', quizController.postQuiz);
  router.put('/quiz', quizController.putQuiz);
  router.delete('/quiz/:id', quizController.deleteQuiz);
  router.get('/quiz-by-participant', quizController.getQuizByParticipant);

  // Question
  router.get('/question/:id', questionController.getQuestion);
  router.post('/question', questionController.postQuestion);
  router.put('/question', questionController.putQuestion);
  router.delete('/question', questionController.deleteQuestion);
  router.get('/questions-by-quiz/:quiz_id', questionController.getQuestionByQuiz);

  // Answer
  router.post('/answer', answerController.postAnswer);
  router.put('/answer', answerController.putAnswer);
  router.delete('/answer/:id', answerController.deleteAnswer);

  // Quiz submit & assign
  router.post('/quiz-submit', quizController.postQuizSubmit);
  router.post('/quiz-assign-to-user', quizController.postQuizAssign);

  // Quiz with Q&A
  router.get('/quiz-with-qa/:quizId', quizController.getQuizWithQA);
  router.post('/quiz-upsert-qa', quizController.postQuizWithQA);

  app.use('/api/v1/', router);
};

module.exports = initAPIRoutes;