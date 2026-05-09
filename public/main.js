/* ============================================================
   MENU DATA
============================================================ */
const menuData = {
  cakes: [
    { e: '<img src="images/choco_truffle_cake_1777733985044.png" style="width:100%;height:100%;object-fit:cover">', n: 'Choco Truffle', d: 'Layers of soft Chocolate sponge filled with dark chocolate truffle and wrapped in a rich ganache', p: '₹700', w: 'per 1/2 kg', c: 'Premium' },
    { e: '<img src="images/lotus_biscoff_cake_1777734003522.png" style="width:100%;height:100%;object-fit:cover">', n: 'Lotus Biscoff', d: 'Vanilla sponge layered with creamy Lotus Biscoff buttercream frosting and rich caramelized biscuit flavour', p: '₹785', w: 'per 1/2 kg', c: 'Signature' },
    { e: '<img src="images/hero_berry_cake_1775941360420.png" style="width:100%;height:100%;object-fit:cover">', n: 'Black Forest', d: 'Chocolate sponge layered with Buttercream or Whipped cream, Cherries and Chocolate flakes', p: '₹460', w: 'per 1/2 kg', c: 'Classic' },
    { e: '<img src="images/strawberry_bliss_1775941388376.png" style="width:100%;height:100%;object-fit:cover">', n: 'White Forest', d: 'Vanilla sponge layered with Buttercream or Whipped Cream, Cherries and White chocolate shavings', p: '₹440', w: 'per 1/2 kg', c: 'Classic' }
  ],
  buttercream: [
    { e: '<img src="images/lotus_biscoff_cake_1777734003522.png" style="width:100%;height:100%;object-fit:cover">', n: 'Lotus Biscoff', d: 'Creamy Lotus Biscoff buttercream', p: '₹1053', w: 'per 1/2 kg', c: 'Premium' },
    { e: '<img src="images/chocolate_royale_1775941374669.png" style="width:100%;height:100%;object-fit:cover">', n: 'Salted Caramel', d: 'Vanilla sponge layered with buttery caramel cream and a hint of sea salt', p: '₹750', w: 'per 1/2 kg', c: 'Signature' },
    { e: '<img src="images/mango_cake_1777734028570.png" style="width:100%;height:100%;object-fit:cover">', n: 'Mango', d: 'Vanilla sponge layered with Fresh Mango cream and topped with fresh fruit', p: '₹590', w: 'per 1/2 kg', c: 'Seasonal' },
    { e: '<img src="images/hero_berry_cake_1775941360420.png" style="width:100%;height:100%;object-fit:cover">', n: 'Blueberry', d: 'Vanilla sponge filled with smooth blueberry compote and topped with fresh fruit', p: '₹595', w: 'per 1/2 kg', c: 'Seasonal' }
  ],
  brownies: [
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Fudgy Brownie', d: 'Classic rich and fudgy chocolate brownie', p: '₹260', w: '4 pcs', c: 'Classic' },
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Nutella Brownie', d: 'Fudgy brownie loaded with creamy Nutella', p: '₹340', w: '4 pcs', c: 'Premium' },
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Choco chip Brownie', d: 'Fudgy brownie loaded with chocolate chips', p: '₹320', w: '4 pcs', c: 'Favourites' },
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Double chocolate Brownie', d: 'Extra chocolatey fudgy brownie', p: '₹300', w: '4 pcs', c: 'Favourites' },
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Triple chocolate Brownie', d: 'The ultimate chocolate brownie experience', p: '₹320', w: '4 pcs', c: 'Premium' },
    { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover">', n: 'Lotus Biscoff Brownie', d: 'Fudgy brownie swirled with Lotus Biscoff spread', p: '₹340', w: '4 pcs', c: 'Signature' }
  ],
  bento: [
    { e: '<img src="images/bento_cake_1777734044368.png" style="width:100%;height:100%;object-fit:cover">', n: 'Choco truffle Bento', d: 'Cute little Choco truffle bento cake, customisation available', p: '₹230', w: 'per piece', c: 'Mini' },
    { e: '<img src="images/bento_cake_1777734044368.png" style="width:100%;height:100%;object-fit:cover">', n: 'Black forest Bento', d: 'Cute little Black forest bento cake, customisation available', p: '₹220', w: 'per piece', c: 'Mini' },
    { e: '<img src="images/bento_cake_1777734044368.png" style="width:100%;height:100%;object-fit:cover">', n: 'White forest Bento', d: 'Cute little White forest bento cake, customisation available', p: '₹5', w: 'per piece', c: 'Mini' }
  ]
};

/* ============================================================
   CART SYSTEM LOGIC
============================================================ */
let cart = [];
const catalog = {};
let _uid = 0;
let discountApplied = false;

function buildMenu() {
  Object.keys(menuData).forEach(cat => {
    const container = document.getElementById('tab-' + cat);
    if (!container) return;
    container.innerHTML = menuData[cat].map(i => {
      const id = 'menu_' + (_uid++);
      const numPrice = parseInt(i.p.replace(/[^\d]/g, ''), 10);
      catalog[id] = { id, name: i.n, price: numPrice, img: i.e };
      return `
      <div class="menu-card">
        <div class="menu-img">${i.e}</div>
        <div class="menu-info">
          <div class="menu-cat">${i.c}</div>
          <div class="menu-item-name">${i.n}</div>
          <div class="menu-item-desc">${i.d}</div>
          <div class="menu-footer">
            <span class="menu-price">${i.p} <span style="font-size:0.8rem;color:var(--text-muted);font-weight:300;margin-left:4px">${i.w || ''}</span></span>
            <button class="add-btn" onclick="addToCart('${id}')">+</button>
          </div>
        </div>
      </div>
    `;}).join('');
  });
}
buildMenu();

/* ============================================================
   BESTSELLERS DATA
============================================================ */
const bestsData = [
  { e: '<img src="images/choco_truffle_cake_1777733985044.png" style="width:100%;height:100%;object-fit:cover;border-radius:16px">', n: 'Choco Truffle',    s: 'Dark chocolate truffle & rich ganache',   p: '₹700', w: 'per 1/2 kg', r: '★★★★★', d: 'Our absolute crowd-pleaser. Layers of soft Chocolate sponge filled with dark chocolate truffle and wrapped in a rich ganache.' },
  { e: '<img src="images/lotus_biscoff_cake_1777734003522.png" style="width:100%;height:100%;object-fit:cover;border-radius:16px">', n: 'Lotus Biscoff', s: 'Creamy Lotus Biscoff buttercream',       p: '₹785', w: 'per 1/2 kg', r: '★★★★★', d: 'For the serious biscoff lover. Vanilla sponge layered with creamy Lotus Biscoff buttercream frosting and rich caramelized biscuit flavour.' },
  { e: '<img src="images/fudgy_brownie_1777733969773.png" style="width:100%;height:100%;object-fit:cover;border-radius:16px">', n: 'Fudgy Brownie',      s: 'Rich and fudgy chocolate brownie',   p: '₹260', w: '4 pcs', r: '★★★★☆', d: 'Classic rich and fudgy chocolate brownie, perfect for sharing.' },
  { e: '<img src="images/mango_cake_1777734028570.png" style="width:100%;height:100%;object-fit:cover;border-radius:16px">', n: 'Mango Cake',     s: 'Fresh Mango cream',          p: '₹590', w: 'per 1/2 kg', r: '★★★★★', d: 'A delicate balance of earthy and sweet. Vanilla sponge layered with Fresh Mango cream and topped with fresh fruit.' }
];

let activeBest = 0;

function renderBests() {
  const bestListEl = document.getElementById('bestList');
  if(!bestListEl) return;
  
  bestListEl.innerHTML = bestsData.map((b, i) => {
    const id = 'best_' + i;
    const numPrice = parseInt(b.p.replace(/[^\d]/g, ''), 10);
    catalog[id] = { id, name: b.n, price: numPrice, img: b.e };
    return `
    <div class="best-item${i === activeBest ? ' active' : ''}" onclick="selectBest(${i})" style="background:var(--cream); padding:1.5rem; border-radius:16px; display:flex; align-items:center; gap:1.2rem; cursor:pointer; transition:all 0.3s; box-shadow: ${i===activeBest ? '0 10px 30px rgba(139,69,19,0.1)' : '0 4px 10px rgba(0,0,0,0.03)'}; border: ${i===activeBest ? '2px solid var(--sage)' : '2px solid transparent'}">
      <div class="best-rank" style="font-size:1.5rem; font-weight:700; color: ${i===activeBest ? 'var(--sage)' : 'var(--beige-dark)'}">0${i + 1}</div>
      <div>
        <div class="best-item-name" style="font-size:1.1rem; font-weight:600; color:var(--brown)">${b.n}</div>
        <div class="best-item-sub" style="font-size:0.85rem; color:var(--text-muted)">${b.s}</div>
      </div>
      <div class="best-price" style="margin-left:auto; font-weight:600; color:var(--sage)">${b.p}</div>
    </div>
  `;}).join('<div style="height:1rem"></div>');

  const b = bestsData[activeBest];
  const activeId = 'best_' + activeBest;
  document.getElementById('bestFeature').innerHTML = `
    <div style="background:var(--cream); padding:2rem; border-radius:16px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
      <div class="best-feature-image" style="height: 240px; margin-bottom: 1.2rem; display: block; overflow: hidden; border-radius: 12px;">${b.e}</div>
      <div class="best-feature-name" style="font-size:1.6rem; font-weight:700; color:var(--brown); margin-bottom:0.5rem">${b.n}</div>
      <div class="stars" style="color: #FFC107; font-size:1.2rem; margin-bottom:0.5rem">${b.r}</div>
      <div class="best-feature-price" style="font-size:1.3rem; font-weight:600; color:var(--sage); margin-bottom:1rem">${b.p} <span style="font-size:0.8rem;color:var(--text-muted);font-weight:400">${b.w || ''}</span></div>
      <div class="best-feature-desc" style="color:var(--text-muted); font-size:0.95rem; line-height:1.6">${b.d}</div>
      <button class="btn-primary" style="margin-top:1.5rem; width:100%" onclick="addToCart('${activeId}')">Add to Order</button>
    </div>
  `;
}

function selectBest(i) { activeBest = i; renderBests(); }
renderBests();

/* ============================================================
   CART UI & PAYMENT FUNCTIONS
============================================================ */
function addToCart(id) {
    const item = catalog[id];
    if(!item) return;
    const existing = cart.find(c => c.id === id);
    if(existing) existing.qty++;
    else cart.push({ ...item, qty: 1 });
    updateCartUI();
    showToast(`${item.name} added to cart!`);
}

function updateQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) cart = cart.filter(c => c.id !== id);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('hidden');
}

function applyCoupon() {
    const code = document.getElementById('coupon-code').value.trim().toUpperCase();
    if (code === 'FIRST10') {
        discountApplied = true;
        showToast('Coupon applied: 10% OFF!');
        updateCartUI();
    } else {
        discountApplied = false;
        showToast('Invalid coupon code');
        updateCartUI();
    }
}

function updateCartUI() {
    const itemsCont = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const fbtn = document.getElementById('cart-float');
    
    let subtotal = 0, count = 0;
    
    if(itemsCont) {
      itemsCont.innerHTML = cart.map(c => {
          subtotal += (c.price * c.qty);
          count += c.qty;
          return `
          <div class="cart-item-ui">
              <div class="cart-item-img" style="width:70px; height:70px; border-radius:8px; overflow:hidden">${c.img}</div>
              <div class="cart-item-details">
                  <div class="cart-item-name">${c.name}</div>
                  <div class="cart-item-price">₹${c.price}</div>
              </div>
              <div class="cart-item-controls">
                  <button class="cart-btn" onclick="updateQty('${c.id}', -1)">-</button>
                  <span style="font-size:0.95rem;font-weight:600;min-width:20px;text-align:center">${c.qty}</span>
                  <button class="cart-btn" onclick="updateQty('${c.id}', 1)">+</button>
              </div>
          </div>`;
      }).join('');
      
      if(count === 0) {
          fbtn?.classList.add('hidden');
          itemsCont.innerHTML = '<div style="text-align:center; color:var(--text-muted); margin-top:3rem; font-size:1.1rem; font-weight:500;">Your cart is empty 🛒</div>';
          discountApplied = false; // reset discount if empty
      } else {
          fbtn?.classList.remove('hidden');
      }
    }
    
    if(badge) badge.innerText = count;
    
    let discount = discountApplied ? Math.round(subtotal * 0.10) : 0;
    const delivery = 0;
    const total = subtotal - discount + delivery;
    
    if(document.getElementById('cart-subtotal')) document.getElementById('cart-subtotal').innerText = '₹' + subtotal;
    if(document.getElementById('cart-delivery')) document.getElementById('cart-delivery').innerText = '₹' + delivery;
    if(document.getElementById('cart-discount')) document.getElementById('cart-discount').innerText = '-₹' + discount;
    if(document.getElementById('discount-row')) document.getElementById('discount-row').style.display = discountApplied ? 'flex' : 'none';
    if(document.getElementById('cart-total')) document.getElementById('cart-total').innerText = '₹' + total;
    if(document.getElementById('chk-amount')) document.getElementById('chk-amount').value = '₹' + total;
}

function openCheckout() {
    if(cart.length === 0) return showToast('Cart is empty!');
    toggleCart(); 
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() { document.getElementById('checkout-modal').classList.add('hidden'); }

async function processPayment(e) {
    if(e) e.preventDefault();
    const overlay = document.getElementById('processing-overlay');
    const msg = document.getElementById('processing-msg');
    
    const method = document.getElementById('chk-method').value;
    const totalText = document.getElementById('chk-amount').value;
    const totalAmt = parseInt(totalText.replace(/[^\d]/g, ''), 10);
    
    const orderData = {
        name: document.getElementById('chk-name').value,
        phone: document.getElementById('chk-phone').value,
        address: document.getElementById('chk-address').value,
        method: method,
        total: totalText,
        items: JSON.stringify(cart),
        paymentStatus: method === 'COD' ? 'Pending' : 'Paid'
    };

    // Helper to finalize order
    async function finalizeOrder(razorpayOrderId = null, razorpayPaymentId = null) {
        if(razorpayOrderId) orderData.razorpayOrderId = razorpayOrderId;
        if(razorpayPaymentId) orderData.razorpayPaymentId = razorpayPaymentId;
        
        overlay.classList.remove('hidden');
        msg.innerHTML = '<span style="color:var(--sage)">✅ Payment Successful! Saving Order...</span>';
        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const result = await res.json();
            if (res.ok) {
                cart = []; updateCartUI();
                closeCheckout();
                showToast('Order confirmed! Redirecting to tracking...');
                document.getElementById('payment-form').reset();
                
                setTimeout(() => {
                    window.location.href = '/track/' + result.order._id;
                }, 1500);
            } else throw new Error();
        } catch (err) {
            msg.innerHTML = '<span style="color:red">❌ Error connecting to backend!</span>';
            await new Promise(r => setTimeout(r, 2000));
        }
        overlay.classList.add('hidden');
    }

    if (method === 'UPI' || method === 'Card') {
        overlay.classList.remove('hidden');
        msg.innerHTML = 'Initializing Razorpay...';
        try {
            const res = await fetch('/api/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalAmt * 100 })
            });
            const rzpOrder = await res.json();
            overlay.classList.add('hidden');
            
            const options = {
                "key": rzpOrder.key_id || "rzp_test_dummykey", 
                "amount": rzpOrder.amount,
                "currency": "INR",
                "name": "Destin-Ate Cake Cafe",
                "description": "Bakery Order",
                "order_id": rzpOrder.id.startsWith('order_dummy_') ? '' : rzpOrder.id,
                "handler": async function (response) {
                    if (rzpOrder.id.startsWith('order_dummy_')) {
                        finalizeOrder('mock_order', 'mock_payment');
                    } else {
                        const verifyRes = await fetch('/api/verify-razorpay-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        const verifyResult = await verifyRes.json();
                        if (verifyResult.success) {
                            finalizeOrder(response.razorpay_order_id, response.razorpay_payment_id);
                        } else {
                            showToast('Payment verification failed!');
                        }
                    }
                },
                "prefill": { "name": orderData.name, "contact": orderData.phone },
                "theme": { "color": "#8B4513" }
            };
            
            if (rzpOrder.id.startsWith('order_dummy_')) {
                showToast('Mock Payment (No keys configured) - Proceeding');
                finalizeOrder('mock_order', 'mock_payment');
            } else {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
        } catch (err) {
            overlay.classList.add('hidden');
            showToast('Payment initialization failed. Try COD.');
        }
    } else {
        overlay.classList.remove('hidden');
        msg.innerHTML = 'Validating Address...';
        await new Promise(r => setTimeout(r, 1500));
        finalizeOrder();
    }
}

updateCartUI();

/* Form submission handler */
async function handleFormSubmit(event, endpoint, successMessage) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      showToast(successMessage);
      form.reset();
    } else { showToast('Something went wrong. Please try again.'); }
  } catch (error) {
    showToast('Error! Make sure your local server is running.');
  }
}

/* ============================================================
   REVIEWS INTEGRATION
============================================================ */
async function fetchReviews() {
    try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        const reviewsContainer = document.getElementById('reviewsList');
        if (!reviewsContainer || !data.reviews) return;
        
        reviewsContainer.innerHTML = data.reviews.length ? data.reviews.map(r => `
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
                <div class="stars" style="color: #FFC107; margin-bottom: 1rem; font-size: 1.2rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                <p style="font-size: 0.95rem; color: var(--text); font-style: italic; margin-bottom: 1.5rem; line-height: 1.6;">"${r.message}"</p>
                <div style="font-family: 'Playfair Display', serif; color: var(--brown); font-weight: 600;">- ${r.name}</div>
            </div>
        `).join('') : '<p style="text-align:center; color: var(--text-muted); width: 100%;">No reviews yet. Be the first!</p>';
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', fetchReviews);

async function handleReviewSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const btn = e.target.querySelector('button');
    const oldText = btn.innerText;
    btn.innerText = 'Submitting...';
    try {
        const res = await fetch('/api/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            showToast('Review submitted successfully!');
            e.target.reset();
            fetchReviews();
        } else {
            showToast('Failed to submit review.');
        }
    } catch (err) {
        showToast('Error connecting to server.');
    } finally {
        btn.innerText = oldText;
    }
}

/* Custom Cake Order Flow */
async function handleCustomCakeSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const btn = document.getElementById('submitOrderBtn') || form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Processing...';

    try {
        const res = await fetch('/api/order', {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        
        if (res.ok && result.success) {
            showToast('Order received! Redirecting to tracking...');
            setTimeout(() => {
                window.location.href = '/track/' + result.order._id;
            }, 1500);
        } else {
            showToast('Failed to place order.');
        }
    } catch (err) {
        console.error(err);
        showToast('Error connecting to server.');
    } finally {
        btn.innerText = originalText;
    }
}

/* Tab switching */
function showTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  btn.classList.add('active');
}

/* Toast notification */
function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* Smooth scroll helper */
function smoothScroll(id) {
  const el = document.querySelector(id);
  if(el) el.scrollIntoView({ behavior: 'smooth' });
}
