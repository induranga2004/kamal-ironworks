const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add task title'],
    },
    description: {
      type: String,
      required: [true, 'Please add task description'],
    },
    siteName: {
      type: String,
      required: [true, 'Please add the site name'],
    },
    siteAddress: {
      type: String,
      required: [true, 'Please add the site address'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please add a start time'],
    },
    endDate: {
      type: Date,
    },
    endTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
    },
    smsSent: {
      type: Boolean,
      default: false,
    },
    smsTimestamp: {
      type: Date,
    },
    smsStatus: {
      type: String,
    },
    notes: {
      type: String,
    },
    attachments: [
      {
        url: String,
        publicId: String,
        name: String,
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
