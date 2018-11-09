const mongoose = require('mongoose');
const { type } = require('./trade-config');

const { Schema } = mongoose;

const tradeSchema = new Schema({
  stock: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: type },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 1 },
});
module.exports = mongoose.model('trade', tradeSchema);
