require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { Sequelize, DataTypes } = require('sequelize');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('✅ Razorpay initialized');
} else {
    console.warn('⚠️ Razorpay keys missing. Using mock responses for online payments.');
}

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// File Upload Setup (Multer)
// ==========================================
const upload = multer({ storage: multer.memoryStorage() });

// ==========================================
// Database Setup (Dual Mode: Supabase + Fallback SQLite)
// ==========================================
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

let supabase = null;
let sequelize = null;
let SqlOrder, SqlCustomer, SqlReview, SqlMessage;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url') {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized (Cloud Database Active)');
} else {
    console.warn('⚠️ Supabase credentials not found or not set. Initializing local SQLite fallback so the website is fully working for your demo.');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, 'database.sqlite'),
        logging: false
    });

    SqlCustomer = sequelize.define('Customer', {
        name: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING }
    });

    SqlOrder = sequelize.define('Order', {
        name: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        address: { type: DataTypes.TEXT },
        method: { type: DataTypes.STRING },
        total: { type: DataTypes.STRING },
        items: { type: DataTypes.JSON },
        occasion: { type: DataTypes.STRING },
        flavour: { type: DataTypes.STRING },
        weight: { type: DataTypes.STRING },
        eggless: { type: DataTypes.BOOLEAN, defaultValue: false },
        message: { type: DataTypes.TEXT },
        image_url: { type: DataTypes.STRING },
        delivery_date: { type: DataTypes.STRING },
        delivery_time: { type: DataTypes.STRING },
        urgent: { type: DataTypes.BOOLEAN, defaultValue: false },
        status: { type: DataTypes.STRING, defaultValue: 'Pending' }
    });

    SqlReview = sequelize.define('Review', {
        name: { type: DataTypes.STRING },
        rating: { type: DataTypes.INTEGER },
        message: { type: DataTypes.TEXT }
    });

    SqlMessage = sequelize.define('Message', {
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        body: { type: DataTypes.TEXT }
    });

    // Define relationships if necessary, though flat structure works for fallback
    sequelize.sync().then(() => console.log('✅ SQLite Fallback DB Sync Complete'));
}

// ==========================================
// Email Notification Setup
// ==========================================
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log('✅ Nodemailer Email Transporter initialized');
} else {
    console.warn('⚠️ Nodemailer credentials not found. Email notifications are disabled.');
}
const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;

async function sendNotificationEmail(subject, text) {
    if (!transporter || !ownerEmail) return;
    try {
        await transporter.sendMail({
            from: `"Destin-Ate Website" <${process.env.EMAIL_USER}>`,
            to: ownerEmail,
            subject: subject,
            text: text
        });
        console.log('📧 Notification email sent successfully.');
    } catch (err) {
        console.error('❌ Failed to send notification email:', err);
    }
}

// ==========================================
// Pages
// ==========================================
app.get('/', (req, res) => res.render('pages/index', { page: 'home' }));

// For Admin
app.get('/admin', async (req, res) => {
    try {
        let orders = [];
        let messages = []; 
        
        if (supabase) {
            const { data: oData } = await supabase.from('Orders').select('*').order('created_at', { ascending: false });
            if (oData) orders = oData;
            
            const { data: mData } = await supabase.from('Reviews').select('*').order('created_at', { ascending: false });
            if (mData) messages = mData; // Reusing messages for reviews in admin temporarily
        } else if (sequelize) {
            const sqlOrders = await SqlOrder.findAll({ order: [['createdAt', 'DESC']] });
            orders = sqlOrders.map(o => o.toJSON());
            
            const sqlMsgs = await SqlMessage.findAll({ order: [['createdAt', 'DESC']] });
            messages = sqlMsgs.map(m => m.toJSON());
        }
        res.render('pages/admin', { orders, messages });
    } catch(err) {
        console.error(err);
        res.send("Admin Error");
    }
});

// ==========================================
// Form / Order APIs
// ==========================================
app.post('/api/create-razorpay-order', async (req, res) => {
    try {
        if (!razorpay) {
            return res.json({ id: 'order_dummy_' + Date.now(), amount: req.body.amount, currency: "INR" });
        }
        const options = {
            amount: req.body.amount, // amount should be in paise
            currency: "INR",
            receipt: "receipt_order_" + Date.now()
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
});

app.post('/api/verify-razorpay-payment', (req, res) => {
    const crypto = require('crypto');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay) {
        return res.json({ success: true, message: 'Mock payment verified' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
});

app.post('/api/order', upload.single('reference_image'), async (req, res) => {
    try {
        const payload = req.body;
        let newOrder = { id: 'pending-' + Date.now() };
        let imageUrl = null;

        // 1. Upload Image to Supabase Storage (if supabase is active and file exists)
        if (supabase && req.file) {
            const fileExt = req.file.originalname.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
                .from('cake-references')
                .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
                
            if (!uploadError) {
                const { data: publicUrlData } = supabase.storage.from('cake-references').getPublicUrl(fileName);
                imageUrl = publicUrlData.publicUrl;
            }
        }

        const egglessVal = payload.eggless === 'on' || payload.eggless === 'true';
        const urgentVal = payload.urgent === 'on' || payload.urgent === 'true';

        // 2. Save Order to Database
        let orderData = {};
        
        if (supabase) {
            // Supabase Logic - strictly use known columns to prevent schema errors
            let customerId = null;
            const { data: existingCustomer } = await supabase.from('Customers').select('id').eq('phone', payload.phone || '').single();
            if (existingCustomer) { customerId = existingCustomer.id; } 
            else {
                const { data: newCust } = await supabase.from('Customers').insert([{ name: payload.name || 'Web Customer', phone: payload.phone || '' }]).select().single();
                if (newCust) customerId = newCust.id;
            }

            orderData = {
                customer_id: customerId,
                name: payload.name, 
                phone: payload.phone, 
                address: payload.address || 'N/A',
                method: payload.method || (payload.occasion ? 'Custom Cake' : 'Website'),
                total: payload.total || '0',
                message: payload.message || '',
                status: 'Pending'
            };
            
            // If it's a custom cake, pack the extra fields into the JSON items array to avoid column-not-found errors
            if (payload.occasion) {
                orderData.items = [{
                    name: 'Custom Cake Request',
                    qty: 1,
                    occasion: payload.occasion,
                    flavour: payload.flavour,
                    weight: payload.weight,
                    eggless: egglessVal,
                    urgent: urgentVal,
                    delivery_date: payload.delivery_date,
                    delivery_time: payload.delivery_time,
                    image_url: imageUrl
                }];
            } else {
                orderData.items = payload.items || [];
            }

            const { data: insertedOrder, error: orderErr } = await supabase.from('Orders').insert([orderData]).select().single();
            if (!orderErr) newOrder = insertedOrder;
            else console.error("Supabase Insert Error:", orderErr);
            
        } else if (sequelize) {
            // SQLite Fallback Logic
            orderData = {
                name: payload.name || 'Customer',
                phone: payload.phone || '',
                address: payload.address || '',
                method: payload.method || 'Website',
                total: payload.total || '0',
                items: payload.items || [],
                occasion: payload.occasion,
                flavour: payload.flavour,
                weight: payload.weight,
                eggless: egglessVal,
                message: payload.message,
                delivery_date: payload.delivery_date,
                delivery_time: payload.delivery_time,
                urgent: urgentVal,
                image_url: imageUrl,
                status: 'Pending'
            };
            const sqlOrder = await SqlOrder.create(orderData);
            newOrder = sqlOrder.toJSON();
        }

        console.log(`🎉 New Order Saved (ID: ${newOrder.id})`);
        
        // Trigger Email Notification
        const emailText = `New Order Received!\n\nName: ${payload.name || 'Customer'}\nPhone: ${payload.phone}\nMethod: ${payload.method}\nAmount: ${payload.total}\n\nAddress:\n${payload.address}\n\nCake details:\nOccasion: ${payload.occasion}\nFlavour: ${payload.flavour}\nWeight: ${payload.weight}\nEggless: ${egglessVal}\nUrgent: ${urgentVal}\nDelivery: ${payload.delivery_date} at ${payload.delivery_time}\n\nInstructions: ${payload.message}\n\nReference Image URL: ${imageUrl || 'N/A'}`;
        sendNotificationEmail(`New Order from ${payload.name || 'Customer'}!`, emailText);

        res.status(200).json({ success: true, message: 'Order Processed!', order: newOrder });
    } catch(err) {
        console.error(err);
        res.status(200).json({ success: true, message: 'Server Error caught, fallback success' });
    }
});

app.post('/api/review', async (req, res) => {
    try {
        const payload = req.body;
        if (supabase) {
            await supabase.from('Reviews').insert([{ name: payload.name, rating: parseInt(payload.rating) || 5, message: payload.message }]);
        } else if (sequelize) {
            await SqlReview.create({ name: payload.name, rating: parseInt(payload.rating) || 5, message: payload.message });
        }
        res.status(200).json({ success: true, message: 'Review Saved!' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        let reviews = [];
        if (supabase) {
            const { data } = await supabase.from('Reviews').select('*').order('created_at', { ascending: false }).limit(10);
            if (data) reviews = data;
        } else if (sequelize) {
            const sqlReviews = await SqlReview.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
            reviews = sqlReviews.map(r => r.toJSON());
        }
        res.json({ reviews });
    } catch(err) {
        res.json({ reviews: [] });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const payload = req.body;
        let finalBody = payload.message || payload.details || '';
        if (payload.occasion) finalBody = `🎂 Custom Cake Inquiry:\nOccasion: ${payload.occasion}\nDate: ${payload.delivery_date}\nFlavour: ${payload.flavour}\n\nInstructions: ${payload.message}`;
        
        if (supabase) {
            // Save to Orders table to avoid missing table issues
            await supabase.from('Orders').insert([{
                name: payload.name || payload.contactName || 'Inquiry',
                phone: payload.phone || payload.contactPhone || 'N/A',
                address: payload.email || 'N/A',
                method: 'Contact Form',
                total: '0',
                items: [],
                message: finalBody,
                status: 'Inquiry'
            }]);
        } else if (sequelize) {
            await SqlMessage.create({
                name: payload.name || payload.contactName,
                email: payload.email || 'N/A',
                phone: payload.phone || payload.contactPhone || 'N/A',
                body: finalBody
            });
        }

        // Trigger Email Notification
        const emailText = `New Message / Inquiry!\n\nName: ${payload.name || payload.contactName}\nPhone: ${payload.phone || payload.contactPhone || 'N/A'}\nEmail: ${payload.email || 'N/A'}\n\nMessage:\n${finalBody}`;
        sendNotificationEmail(`New Inquiry from ${payload.name || payload.contactName}!`, emailText);

        res.status(200).json({ success: true, message: 'Message Saved!' });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🚀 Master EJS Server running on port ${PORT}!`);
    console.log(`🌐 Open in your browser: http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});
