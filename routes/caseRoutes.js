const express = require('express');
const { getCases, getCaseById, createCase, updateCase, deleteCase } = require('../controllers/caseController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', getCases);
router.get('/:id', getCaseById);
router.post('/', createCase);
router.patch('/:id', updateCase);
router.delete('/:id', deleteCase);

module.exports = router;