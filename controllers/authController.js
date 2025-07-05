const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../services/authService');

const register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password, role } = req.body;
      const user = new User({ username, password_hash: password, role });
      await user.save();
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },
];

const login = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = { register, login };