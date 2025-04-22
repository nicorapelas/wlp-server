const express = require('express')
const mongoose = require('mongoose')
const Staff = mongoose.model('Staff')
const requireAuth = require('../../middlewares/requireAuth')
const router = express.Router()

router.post('/create-staff', requireAuth, async (req, res) => {
  const { storeId, firstName, lastName, email, phone, position, startDate, paymentTerms, paymentMethod, paymentValue, username, pin } = req.body
  const staff = new Staff({ _user: req.user._id, storeId, firstName, lastName, email, phone, position, startDate, paymentTerms, paymentMethod, paymentValue, username, pin })
  await staff.save()
  const staffs = await Staff.find({ storeId })
  res.json(staffs)
})

router.post('/fetch-store-staff', requireAuth, async (req, res) => {
  const { storeId } = req.body
  const staffs = await Staff.find({ storeId })
  console.log('staffs', staffs)
  res.json(staffs)
})

module.exports = router
