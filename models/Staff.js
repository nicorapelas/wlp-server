const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StaffSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeId: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  position: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  paymentTerms: {
    type: String,
  },
  paymentValue: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Staff', StaffSchema)
