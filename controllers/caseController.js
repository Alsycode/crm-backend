const { body, validationResult } = require('express-validator');
const Case = require('../models/Case');

const getCases = async (req, res, next) => {
  try {
    const cases = await Case.find().populate('customer_id assigned_to');
    res.json(cases);
  } catch (error) {
    next(error);
  }
};

const getCaseById = async (req, res, next) => {
  try {
    const caseData = await Case.findById(req.params.id).populate('customer_id assigned_to');
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(caseData);
  } catch (error) {
    next(error);
  }
};

const createCase = [
  body('customer_id').notEmpty().withMessage('Customer ID is required'),
  body('assigned_to').notEmpty().withMessage('Assigned user ID is required'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').isIn(['open', 'in-progress', 'closed']).withMessage('Invalid status'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const caseData = new Case(req.body);
      await caseData.save();
      res.status(201).json(caseData);
    } catch (error) {
      next(error);
    }
  },
];

const updateCase = [
  body('customer_id').optional().notEmpty().withMessage('Customer ID is required'),
  body('assigned_to').optional().notEmpty().withMessage('Assigned user ID is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').optional().isIn(['open', 'in-progress', 'closed']).withMessage('Invalid status'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const caseData = await Case.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!caseData) {
        return res.status(404).json({ error: 'Case not found' });
      }
      res.json(caseData);
    } catch (error) {
      next(error);
    }
  },
];

const deleteCase = async (req, res, next) => {
  try {
    const caseData = await Case.findByIdAndDelete(req.params.id);
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCases, getCaseById, createCase, updateCase, deleteCase };