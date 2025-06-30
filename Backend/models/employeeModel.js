const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add employee name'],
    },
    role: {
      type: String,
      enum: ['Supervisor', 'Constructor', 'Assistant Constructor', 'Driver'],
      required: [true, 'Please select a role'],
    },
    phone: {
      type: String,
      required: [true, 'Please add phone number'],
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
    },
    nic: {
      type: String,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ['active', 'on-leave', 'terminated'],
      default: 'active',
    },
    skills: [{
      type: String
    }],
    avatar: {
      url: String,
      publicId: String
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
