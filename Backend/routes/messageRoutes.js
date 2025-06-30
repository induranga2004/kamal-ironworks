const express = require('express');
const router = express.Router();
const {
  getUserMessages,
  getMessageById,
  createMessage,
  deleteMessage,
  uploadMessageAttachment,
  getUnreadMessagesCount,
  storeChatbotMessage,
  storeWhatsAppMessage
} = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

// Base routes
router.route('/')
  .get(protect, getUserMessages)
  .post(protect, createMessage);

// Message count
router.get('/unread/count', protect, getUnreadMessagesCount);

// Integration routes
router.post('/chatbot', storeChatbotMessage);
router.post('/whatsapp', storeWhatsAppMessage);

// Message by ID routes - must come after other specific routes
router.route('/:id')
  .get(protect, getMessageById)
  .delete(protect, deleteMessage);

// File attachment for messages
router.post(
  '/attachment',
  protect,
  upload.single('attachment'),
  uploadMessageAttachment
);

module.exports = router;
