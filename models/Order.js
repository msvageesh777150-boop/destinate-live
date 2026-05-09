const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: 'N/A' },
    method: { type: String, default: 'Website' },
    total: { type: String, default: '0' },
    items: { type: Array, default: [] },
    status: { type: String, default: 'Pending' }, // Pending, Preparing, Completed
    paymentStatus: { type: String, default: 'Pending' },
    message: { type: String, default: '' },
    occasion: { type: String },
    flavour: { type: String },
    weight: { type: String },
    eggless: { type: Boolean, default: false },
    urgent: { type: Boolean, default: false },
    delivery_date: { type: String },
    delivery_time: { type: String },
    image_url: { type: String },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
