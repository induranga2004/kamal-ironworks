const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');
const sendEmail = require('../utils/emailService');

// @desc    Create new message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const { recipient, content, subject, appointment, quotation, task } = req.body;

  // Validate recipient
  if (!recipient) {
    res.status(400);
    throw new Error('Recipient is required');
  }

  const recipientUser = await User.findById(recipient);
  if (!recipientUser) {
    res.status(404);
    throw new Error('Recipient not found');
  }

  const message = await Message.create({
    sender: req.user._id,
    recipient,
    content,
    subject: subject || '',
    appointment,
    quotation,
    task,
  });

  if (message) {
    // Populate sender and recipient details for response
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email')
      .populate('recipient', 'name email');
    
    // Send email notification
    try {
      const emailContent = `
        <h1>New Message from Kamal Iron Works</h1>
        <p>Hello ${recipientUser.name},</p>
        <p>You have received a new message from ${req.user.name}.</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <div>${content}</div>
        <p>Please log in to your account to reply.</p>
        <p><a href="${process.env.FRONTEND_URL}/messages">View Messages</a></p>
        <p>Best Regards,<br>Kamal Iron Works Team</p>
      `;
      
      await sendEmail({
        email: recipientUser.email,
        subject: `New Message: ${subject || 'No subject'} - Kamal Iron Works`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Message notification email sending error:', error);
    }

    res.status(201).json(populatedMessage);
  } else {
    res.status(400);
    throw new Error('Invalid message data');
  }
});

// @desc    Upload message attachment
// @route   PUT /api/messages/:id/attachments
// @access  Private
const uploadMessageAttachment = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Check if user is the sender
  if (message.sender.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to modify this message');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Upload file
  const uploadResult = await uploadFile(req.file, 'messages/attachments');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Add attachment to message
  const attachment = {
    url: uploadResult.url,
    publicId: uploadResult.public_id,
    name: req.file.originalname,
    type: req.file.mimetype,
  };

  if (!message.attachments) {
    message.attachments = [];
  }
  
  message.attachments.push(attachment);
  const updatedMessage = await message.save();

  res.json(updatedMessage);
});

// @desc    Get all messages for a user
// @route   GET /api/messages
// @access  Private
const getUserMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id },
      { recipient: req.user._id },
    ],
  })
    .populate('sender', 'name email')
    .populate('recipient', 'name email')
    .populate('appointment', 'preferredDateTime status')
    .populate('quotation', 'quotationNumber')
    .populate('task', 'title')
    .sort({ createdAt: -1 });

  res.json(messages);
});

// @desc    Get unread messages count
// @route   GET /api/messages/unread-count
// @access  Private
const getUnreadMessagesCount = asyncHandler(async (req, res) => {
  const count = await Message.countDocuments({
    recipient: req.user._id,
    read: false,
  });

  res.json({ unreadCount: count });
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)
    .populate('sender', 'name email')
    .populate('recipient', 'name email')
    .populate('appointment', 'preferredDateTime status siteAddress')
    .populate('quotation', 'quotationNumber totalAmount')
    .populate('task', 'title description siteName');

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Check if user is sender or recipient
  if (
    message.sender._id.toString() !== req.user._id.toString() &&
    message.recipient._id.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(403);
    throw new Error('Not authorized to access this message');
  }

  // Mark as read if user is recipient and message is unread
  if (
    message.recipient._id.toString() === req.user._id.toString() &&
    !message.read
  ) {
    message.read = true;
    message.readAt = Date.now();
    await message.save();
  }

  res.json(message);
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Check if user is sender or recipient
  if (
    message.sender.toString() !== req.user._id.toString() &&
    message.recipient.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(403);
    throw new Error('Not authorized to delete this message');
  }

  // Delete all attachments
  if (message.attachments && message.attachments.length > 0) {
    for (const attachment of message.attachments) {
      if (attachment.publicId) {
        await deleteFile(attachment.publicId);
      }
    }
  }

  await message.remove();
  res.json({ message: 'Message removed' });
});

// @desc    Store chatbot message
// @route   POST /api/messages/chatbot
// @access  Public
const storeChatbotMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Message content is required');
  }

  // Find admin users to set as recipients
  const adminUsers = await User.find({ isAdmin: true });
  if (!adminUsers || adminUsers.length === 0) {
    res.status(500);
    throw new Error('No admin recipients found');
  }

  const primaryAdmin = adminUsers[0]; // Use first admin as recipient

  // See if user exists
  let sender = null;
  if (email) {
    sender = await User.findOne({ email });
  }

  const message = await Message.create({
    sender: sender ? sender._id : null,
    recipient: primaryAdmin._id,
    content,
    subject: 'Chatbot Message',
    isFromChatbot: true,
  });

  if (message) {
    // Send email notification to admin
    try {
      const emailContent = `
        <h1>New Chatbot Message</h1>
        <p>A new message has been received through the chatbot:</p>
        <ul>
          <li><strong>Name:</strong> ${name || 'Not provided'}</li>
          <li><strong>Email:</strong> ${email || 'Not provided'}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <div>${content}</div>
        <p>Please log in to your admin dashboard to respond.</p>
      `;
      
      await sendEmail({
        email: primaryAdmin.email,
        subject: 'New Chatbot Message - Kamal Iron Works',
        html: emailContent,
      });
    } catch (error) {
      console.error('Admin notification email sending error:', error);
    }

    res.status(201).json({
      success: true,
      message: 'Message stored successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid message data');
  }
});

// @desc    Store WhatsApp message
// @route   POST /api/messages/whatsapp
// @access  Public
const storeWhatsAppMessage = asyncHandler(async (req, res) => {
  // This endpoint would be called by WhatsApp webhook
  // Verify the request is coming from WhatsApp with proper authentication

  const { from, to, content, messageId } = req.body;

  if (!from || !content || !messageId) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  // Find admin users to set as recipients
  const adminUsers = await User.find({ isAdmin: true });
  if (!adminUsers || adminUsers.length === 0) {
    res.status(500);
    throw new Error('No admin recipients found');
  }

  const primaryAdmin = adminUsers[0]; // Use first admin as recipient

  // Try to find user by phone number
  const phone = from.replace('whatsapp:', '');
  let sender = await User.findOne({ phone });

  const message = await Message.create({
    sender: sender ? sender._id : null,
    recipient: primaryAdmin._id,
    content,
    subject: 'WhatsApp Message',
    relatedToWhatsApp: true,
    whatsAppMessageId: messageId,
  });

  if (message) {
    // Send email notification to admin
    try {
      const emailContent = `
        <h1>New WhatsApp Message</h1>
        <p>A new message has been received through WhatsApp:</p>
        <ul>
          <li><strong>From:</strong> ${phone}</li>
          ${sender ? `<li><strong>User:</strong> ${sender.name} (${sender.email})</li>` : ''}
        </ul>
        <p><strong>Message:</strong></p>
        <div>${content}</div>
        <p>Please log in to your admin dashboard to respond.</p>
      `;
      
      await sendEmail({
        email: primaryAdmin.email,
        subject: 'New WhatsApp Message - Kamal Iron Works',
        html: emailContent,
      });
    } catch (error) {
      console.error('Admin notification email sending error:', error);
    }

    res.status(201).json({
      success: true,
      message: 'WhatsApp message stored successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid message data');
  }
});

module.exports = {
  createMessage,
  uploadMessageAttachment,
  getUserMessages,
  getUnreadMessagesCount,
  getMessageById,
  deleteMessage,
  storeChatbotMessage,
  storeWhatsAppMessage,
};
