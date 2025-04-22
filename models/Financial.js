const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a sub-schema for game finances
const GameFinanceSchema = new Schema({
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  moneyIn: {
    type: Number,
    required: true,
  },
  moneyOut: {
    type: Number,
    required: true,
  },
})

// Create a sub-schema for expenses
const ExpenseSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Utilities', 'Maintenance', 'Supplies', 'Payroll', 'Other'],
    default: 'Other',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const FinancialSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  gameFinances: [GameFinanceSchema],
  totalMoneyIn: {
    type: Number,
    required: true,
  },
  totalMoneyOut: {
    type: Number,
    required: true,
  },
  moneyBalance: {
    type: Number,
    required: true,
  },
  expenses: [ExpenseSchema],
  dailyProfit: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add pre-save middleware to calculate totals
FinancialSchema.pre('save', function (next) {
  // Calculate total money in and out from game finances
  this.totalMoneyIn = this.gameFinances.reduce(
    (total, game) => total + game.moneyIn,
    0
  )
  this.totalMoneyOut = this.gameFinances.reduce(
    (total, game) => total + game.moneyOut,
    0
  )

  // Add expenses to total money out
  const expensesTotal = this.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )
  this.totalMoneyOut += expensesTotal

  // Calculate daily profit and money balance
  this.dailyProfit = this.totalMoneyIn - this.totalMoneyOut
  this.moneyBalance = this.dailyProfit - expensesTotal

  next()
})

module.exports = mongoose.model('Financial', FinancialSchema)
