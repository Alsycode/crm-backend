const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
  phone: {
    type: String,
    required: true,
    match: /^\d{3}-\d{3}-\d{4}$/,
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = mongoose.model('Customer', customerSchema);