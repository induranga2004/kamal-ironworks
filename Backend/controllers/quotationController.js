const asyncHandler = require('express-async-handler');
const Quotation = require('../models/quotationModel');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');
const sendEmail = require('../utils/emailService');

// @desc    Create new quotation
// @route   POST /api/quotations
// @access  Private/Admin
const createQuotation = asyncHandler(async (req, res) => {
  const {
    appointment,
    client,
    validUntil,
    items,
    subtotal,
    taxRate,
    taxAmount,
    discountRate,
    discountAmount,
    totalAmount,
    notes,
    terms,
  } = req.body;

  // Check if appointment exists
  const appointmentExists = await Appointment.findById(appointment);
  if (!appointmentExists) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  let clientId = client;
  
  // If client is not provided, try to find or create a user based on appointment
  if (!clientId) {
    // Check if user exists with the appointment email
    let clientUser = await User.findOne({ email: appointmentExists.email });

    // If client user doesn't exist, create one
    if (!clientUser) {
      // Generate a random password (user will need to reset it)
      const tempPassword = Math.random().toString(36).slice(-8);
      
      clientUser = await User.create({
        name: appointmentExists.name,
        email: appointmentExists.email,
        phone: appointmentExists.phone,
        password: tempPassword,
      });
      
      // Send account creation email with password reset instructions
      const emailContent = `
        <h1>Account Created - Kamal Iron Works</h1>
        <p>Hello ${clientUser.name},</p>
        <p>An account has been created for you on Kamal Iron Works client portal.</p>
        <p>This will allow you to access your quotation and project details.</p>
        <p>Please use the following temporary credentials to log in:</p>
        <ul>
          <li><strong>Email:</strong> ${clientUser.email}</li>
          <li><strong>Temporary Password:</strong> ${tempPassword}</li>
        </ul>
        <p>For security reasons, we recommend changing your password after your first login.</p>
        <p><a href="${process.env.FRONTEND_URL}/login">Click here to login</a></p>
        <p>Best Regards,<br>Kamal Iron Works Team</p>
      `;
      
      try {
        await sendEmail({
          email: clientUser.email,
          subject: 'Your Kamal Iron Works Client Account',
          html: emailContent,
        });
      } catch (error) {
        console.error('Account creation email sending error:', error);
      }
    }
    
    clientId = clientUser._id;
    
    // Update appointment with user reference if not already set
    if (!appointmentExists.user) {
      appointmentExists.user = clientId;
      await appointmentExists.save();
    }
  }

  // Create quotation
  const quotation = await Quotation.create({
    appointment,
    client: clientId,
    validUntil,
    items,
    subtotal,
    taxRate: taxRate || 0,
    taxAmount: taxAmount || 0,
    discountRate: discountRate || 0,
    discountAmount: discountAmount || 0,
    totalAmount,
    notes: notes || '',
    terms: terms || '',
    status: 'draft',
    createdBy: req.user._id,
  });

  if (quotation) {
    // Update appointment with quotation reference
    appointmentExists.quotation = quotation._id;
    await appointmentExists.save();

    res.status(201).json(quotation);
  } else {
    res.status(400);
    throw new Error('Invalid quotation data');
  }
});

// @desc    Upload quotation file
// @route   PUT /api/quotations/:id/upload
// @access  Private/Admin
const uploadQuotationFile = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    res.status(404);
    throw new Error('Quotation not found');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Delete previous file if it exists
  if (quotation.filePublicId) {
    await deleteFile(quotation.filePublicId);
  }

  // Upload new file
  const uploadResult = await uploadFile(req.file, 'quotations');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Update quotation with file info
  quotation.fileUrl = uploadResult.url;
  quotation.filePublicId = uploadResult.public_id;
  
  // Update status if still in draft
  if (quotation.status === 'draft') {
    quotation.status = 'sent';
  }

  const updatedQuotation = await quotation.save();

  // Send notification to client
  const client = await User.findById(quotation.client);
  const appointment = await Appointment.findById(quotation.appointment);
  
  if (client && client.email) {
    const emailContent = `
      <h1>Quotation Ready</h1>
      <p>Hello ${client.name},</p>
      <p>We have prepared a quotation for your project at ${appointment.siteAddress}.</p>
      <p>You can now log in to your client dashboard to view and download your quotation.</p>
      <p><a href="${process.env.FRONTEND_URL}/login">Click here to login</a></p>
      <p>If you have any questions about the quotation, please feel free to contact us.</p>
      <p>Best Regards,<br>Kamal Iron Works Team</p>
    `;
    
    try {
      await sendEmail({
        email: client.email,
        subject: 'Your Quotation is Ready - Kamal Iron Works',
        html: emailContent,
      });
    } catch (error) {
      console.error('Quotation notification email sending error:', error);
    }
  }

  res.json(updatedQuotation);
});

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Private/Admin
const getQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({})
    .populate({
      path: 'appointment',
      select: 'siteAddress preferredDateTime status',
    })
    .populate({
      path: 'client',
      select: 'name email phone',
    })
    .populate({
      path: 'createdBy',
      select: 'name',
    })
    .sort({ createdAt: -1 });
    
  res.json(quotations);
});

// @desc    Get quotation by ID
// @route   GET /api/quotations/:id
// @access  Private
const getQuotationById = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id)
    .populate({
      path: 'appointment',
      select: 'siteAddress preferredDateTime status name email phone',
    })
    .populate({
      path: 'client',
      select: 'name email phone',
    })
    .populate({
      path: 'createdBy',
      select: 'name',
    });

  if (quotation) {
    // Check if user is admin or the client of this quotation
    if (req.user.isAdmin || quotation.client._id.toString() === req.user._id.toString()) {
      // If client is viewing, update clientViewed status
      if (!req.user.isAdmin && !quotation.clientViewed) {
        quotation.clientViewed = true;
        quotation.clientViewedAt = Date.now();
        await quotation.save();
      }
      
      res.json(quotation);
    } else {
      res.status(403);
      throw new Error('Not authorized to access this quotation');
    }
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});

// @desc    Update quotation
// @route   PUT /api/quotations/:id
// @access  Private/Admin
const updateQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    quotation.validUntil = req.body.validUntil || quotation.validUntil;
    quotation.items = req.body.items || quotation.items;
    quotation.subtotal = req.body.subtotal || quotation.subtotal;
    quotation.taxRate = req.body.taxRate !== undefined ? req.body.taxRate : quotation.taxRate;
    quotation.taxAmount = req.body.taxAmount !== undefined ? req.body.taxAmount : quotation.taxAmount;
    quotation.discountRate = req.body.discountRate !== undefined ? req.body.discountRate : quotation.discountRate;
    quotation.discountAmount = req.body.discountAmount !== undefined ? req.body.discountAmount : quotation.discountAmount;
    quotation.totalAmount = req.body.totalAmount || quotation.totalAmount;
    quotation.notes = req.body.notes !== undefined ? req.body.notes : quotation.notes;
    quotation.terms = req.body.terms !== undefined ? req.body.terms : quotation.terms;
    quotation.status = req.body.status || quotation.status;

    const updatedQuotation = await quotation.save();

    res.json(updatedQuotation);
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});

// @desc    Delete a quotation
// @route   DELETE /api/quotations/:id
// @access  Private/Admin
const deleteQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    // Delete file from cloud storage if it exists
    if (quotation.filePublicId) {
      await deleteFile(quotation.filePublicId);
    }
    
    // Remove quotation reference from appointment
    if (quotation.appointment) {
      const appointment = await Appointment.findById(quotation.appointment);
      if (appointment) {
        appointment.quotation = null;
        await appointment.save();
      }
    }
    
    await quotation.remove();
    res.json({ message: 'Quotation removed' });
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});

// @desc    Get user quotations
// @route   GET /api/quotations/my-quotations
// @access  Private
const getUserQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({ client: req.user._id })
    .populate({
      path: 'appointment',
      select: 'siteAddress preferredDateTime status',
    })
    .sort({ createdAt: -1 });
    
  res.json(quotations);
});

// @desc    Update quotation status
// @route   PUT /api/quotations/:id/status
// @access  Private
const updateQuotationStatus = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    res.status(404);
    throw new Error('Quotation not found');
  }

  // Check if the user is authorized (client or admin)
  if (!req.user.isAdmin && quotation.client.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this quotation');
  }

  const { status } = req.body;

  // Client can only change status to accepted or rejected
  if (!req.user.isAdmin && !['accepted', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status update');
  }

  quotation.status = status;
  const updatedQuotation = await quotation.save();

  // Send notification to admin if client accepts/rejects
  if (!req.user.isAdmin && ['accepted', 'rejected'].includes(status)) {
    const client = await User.findById(req.user._id);
    const appointment = await Appointment.findById(quotation.appointment);
    
    const emailContent = `
      <h1>Quotation ${status === 'accepted' ? 'Accepted' : 'Rejected'}</h1>
      <p>Client ${client.name} has ${status === 'accepted' ? 'accepted' : 'rejected'} the quotation for the project at ${appointment.siteAddress}.</p>
      <p>Quotation Number: ${quotation.quotationNumber}</p>
      <p>Total Amount: LKR ${quotation.totalAmount.toFixed(2)}</p>
      <p>Client Email: ${client.email}</p>
      <p>Client Phone: ${client.phone}</p>
      <p>Please log in to the admin dashboard for more details.</p>
    `;
    
    try {
      await sendEmail({
        email: process.env.EMAIL_FROM,
        subject: `Quotation ${status === 'accepted' ? 'Accepted' : 'Rejected'} - ${quotation.quotationNumber}`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Admin notification email sending error:', error);
    }
  }

  res.json(updatedQuotation);
});

module.exports = {
  createQuotation,
  uploadQuotationFile,
  getQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
  getUserQuotations,
  updateQuotationStatus,
};
