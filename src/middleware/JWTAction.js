'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const nonSecurePaths = [
  '/login',
  '/register',
  '/refresh-token',
  '/logout',
  '/participant',
  '/participant/all',
  '/account'
];

const verifyToken = (token) =>{
  try {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') return 'TokenExpiredError';
    return null;
  }
}

const extractToken = (req) => {
  // Ưu tiên lấy từ header Authorization: Bearer <token>
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  // Nếu không có thì thử lấy từ cookie access_token
  if (req.cookies && req.cookies.access_token) {
    return req.cookies.access_token;
  }
  return null;
}

const checkUserJWT=(req, res, next)=> {
  if (nonSecurePaths.includes(req.path)) return next();

  const token = extractToken(req);

  if (token) {
    const decoded = verifyToken(token);
    if (decoded && decoded !== 'TokenExpiredError') {
      req.user = decoded;
      return next();
    } else if (decoded === 'TokenExpiredError') {
      return res.status(405).json({
        EC: -999,
        DT: '',
        EM: 'Token Expired Error. You need to use Refresh_Token'
      });
    }
  }

  return res.status(401).json({
    EC: -1,
    DT: '',
    EM: 'Not authenticated the user'
  });
}

const checkUserPermission=(req, res, next) =>{
  if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

  if (req.user) {
    const roles = req.user.Roles || [];
    const hasPermission = roles.some(role => role.url === req.path || req.path.includes(role.url));
    if (!roles.length || !hasPermission) {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: "you don't permission to access this resource..."
      });
    }
    return next();
  }

  return res.status(401).json({
    EC: -1,
    DT: '',
    EM: 'Not authenticated the user'
  });
}

// Middleware thêm delay nếu cần (dùng cho test)
const addDelay=(req, res, next) =>{
  if (req.body && req.body.delay) {
    setTimeout(() => next(), +req.body.delay);
  } else {
    next();
  }
}

module.exports = {
  checkUserJWT,
  checkUserPermission,
  addDelay
};