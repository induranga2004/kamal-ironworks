const express = require('express');
const router = express.Router();
const {
  createQuotation,
  uploadQuotationFile,
  getQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
  getUserQuotations,
  updateQuotationStatus,
} = require('../controllers/quotationController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

router.post('/', protect, admin, createQuotation);
router.put('/:id/upload', protect, admin, upload.single('file'), uploadQuotationFile);
router.get('/', protect, admin, getQuotations);
router.get('/my-quotations', protect, getUserQuotations);
router.get('/:id', protect, getQuotationById);
router.put('/:id', protect, admin, updateQuotation);
router.put('/:id/status', protect, updateQuotationStatus);
router.delete('/:id', protect, admin, deleteQuotation);

module.exports = router;
