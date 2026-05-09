const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
