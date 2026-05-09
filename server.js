require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const Razorpay = require('razorpay');

const Order = require('./models/Order');
const Review = require('./models/Review');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session for Admin Auth
app.use(session({
    secret: process.env.SESSION_SECRET || 'destinate_secret',
    resave: false,
    saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/destinate')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('✅ Razorpay initialized');
} else {
    console.warn('⚠️ Razorpay keys missing. Mock payment will be used.');
}

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer for uploads
const upload = multer({ dest: 'public/uploads/' });

// Email & WhatsApp Notifications
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmailNotification(to, subject, text) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
    try {
        await transporter.sendMail({
            from: `"Destin-Ate Cake Cafe" <${process.env.EMAIL_USER}>`,
            to, subject, text
        });
        console.log('✅ Email notification sent to', to);
    } catch(err) {
        console.error("❌ Email failed:", err.message);
    }
}

async function notifyCustomer(order, action) {
    let subject = "";
    let text = "";
    if (action === 'new') {
        subject = "Order Confirmed - Destin-Ate Cake Cafe";
        text = `Hi ${order.name},\n\nThank you for your order! Your order has been placed successfully.\nTotal: Rs. ${order.total}\nWe will notify you when it's preparing.\n\nThanks,\nDestin-Ate Cake Cafe`;
    } else {
        subject = `Order Update: ${order.status} - Destin-Ate`;
        text = `Hi ${order.name},\n\nYour order status has been updated to: ${order.status}.\n\nThanks,\nDestin-Ate Cake Cafe`;
    }
    
    // Email Notification
    if (order.email) {
        await sendEmailNotification(order.email, subject, text);
    }
    
    // WhatsApp Customer Notification Note
    // Free CallMeBot only works for the owner's registered number.
    // Sending to customers requires a paid Twilio or Meta Business API.
}

async function sendWhatsAppNotification(text) {
    const phone = process.env.CALLMEBOT_PHONE;
    const apikey = process.env.CALLMEBOT_APIKEY;
    if (!phone || !apikey) return;
    try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apikey}`;
        await fetch(url);
        console.log('✅ WhatsApp notification sent');
    } catch(err) {
        console.error('❌ Failed to send WhatsApp notification:', err);
    }
}

// Routes
app.get('/', (req, res) => res.render('pages/index', { page: 'home' }));

// Admin Login
app.get('/login', (req, res) => {
    if (req.session.isAdmin) return res.redirect('/admin');
    res.render('pages/login', { error: null });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'password';
    if (username === adminUser && password === adminPass) {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        res.render('pages/login', { error: 'Invalid credentials' });
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Admin Dashboard
app.get('/admin', async (req, res) => {
    if (!req.session.isAdmin) return res.redirect('/login');
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        const messages = await Message.find().sort({ createdAt: -1 });
        res.render('pages/admin', { orders, messages });
    } catch(err) {
        console.error(err);
        res.send("Admin Error");
    }
});

// Track Order
app.get('/track/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.render('pages/track', { order: null, error: 'Order not found' });
        res.render('pages/track', { order, error: null });
    } catch(err) {
        res.render('pages/track', { order: null, error: 'Invalid Order ID' });
    }
});

// API Routes
app.post('/api/create-razorpay-order', async (req, res) => {
    try {
        if (!razorpay) return res.json({ id: 'order_dummy_' + Date.now(), amount: req.body.amount, currency: "INR" });
        const options = { amount: req.body.amount, currency: "INR", receipt: "receipt_" + Date.now() };
        const order = await razorpay.orders.create(options);
        res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
});

app.post('/api/verify-razorpay-payment', (req, res) => {
    const crypto = require('crypto');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay) return res.json({ success: true, message: 'Mock payment verified' });

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) res.json({ success: true });
    else res.status(400).json({ success: false, message: 'Invalid signature' });
});

app.post('/api/order', upload.single('reference_image'), async (req, res) => {
    try {
        const payload = req.body;
        const egglessVal = payload.eggless === 'on' || payload.eggless === 'true';
        const urgentVal = payload.urgent === 'on' || payload.urgent === 'true';
        
        let items = [];
        if (payload.occasion) {
            items = [{
                name: 'Custom Cake',
                qty: 1,
                occasion: payload.occasion,
                flavour: payload.flavour,
                weight: payload.weight,
                eggless: egglessVal,
                urgent: urgentVal,
                delivery_date: payload.delivery_date,
                delivery_time: payload.delivery_time
            }];
        } else {
            try { items = typeof payload.items === 'string' ? JSON.parse(payload.items) : payload.items || []; } catch(e){}
        }

        const newOrder = new Order({
            name: payload.name || 'Customer',
            email: payload.email || '',
            phone: payload.phone || '',
            address: payload.address || 'N/A',
            method: payload.method || (payload.occasion ? 'Custom Cake' : 'Website'),
            total: payload.total || '0',
            message: payload.message || '',
            occasion: payload.occasion,
            flavour: payload.flavour,
            weight: payload.weight,
            eggless: egglessVal,
            urgent: urgentVal,
            delivery_date: payload.delivery_date,
            delivery_time: payload.delivery_time,
            items: items,
            status: 'Pending',
            paymentStatus: payload.paymentStatus || 'Pending',
            razorpayOrderId: payload.razorpayOrderId,
            razorpayPaymentId: payload.razorpayPaymentId
        });

        if (req.file) newOrder.image_url = '/uploads/' + req.file.filename;

        await newOrder.save();

        const msg = `*New Order Alert!*\nName: ${newOrder.name}\nPhone: ${newOrder.phone}\nTotal: Rs. ${newOrder.total}\nItems: ${items.map(i=>i.name).join(', ')}`;
        sendWhatsAppNotification(msg); // To Owner
        
        if (process.env.EMAIL_USER) {
            sendEmailNotification(process.env.EMAIL_USER, "New Order Received!", `You have a new order from ${newOrder.name} for Rs. ${newOrder.total}.`);
        }
        
        notifyCustomer(newOrder, 'new'); // To Customer

        res.status(200).json({ success: true, message: 'Order Processed!', order: newOrder });
    } catch(err) {
        console.error(err);
        require('fs').writeFileSync('error.log', err.stack || err.toString());
        res.status(500).json({ success: false, message: 'Server Error', details: err.message });
    }
});

app.post('/api/review', async (req, res) => {
    try {
        const { name, rating, message } = req.body;
        await Review.create({ name, rating: parseInt(rating) || 5, message });
        res.status(200).json({ success: true, message: 'Review Saved!' });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
        res.json({ reviews });
    } catch(err) {
        res.json({ reviews: [] });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const payload = req.body;
        await Message.create({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            body: payload.message || payload.details || ''
        });
        res.status(200).json({ success: true, message: 'Message Saved!' });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

// Admin update status
app.post('/api/admin/order/:id/status', async (req, res) => {
    if (!req.session.isAdmin) return res.status(401).json({ success: false });
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (order) {
            notifyCustomer(order, 'update');
            const ownerMsg = `Order Update: ${order.name}'s order is now ${order.status}.`;
            sendWhatsAppNotification(ownerMsg);
            if (process.env.EMAIL_USER) {
                sendEmailNotification(process.env.EMAIL_USER, "Order Status Updated", ownerMsg);
            }
        }
        res.json({ success: true });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
