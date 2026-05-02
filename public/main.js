

/* ============================================================
   MENU DATA
   HOW TO ADD A NEW ITEM:
   { e: '🎂', n: 'Item Name', d: 'Description here', p: '₹000', c: 'Category' }
   HOW TO ADD A NEW TAB:
   1. Add a new key here e.g. "eggless: [ ... ]"
   2. Add a tab button in HTML: <button class="tab-btn" onclick="showTab('eggless', this)">Eggless</button>
   3. Add a div in HTML: <div id="tab-eggless" class="tab-content"></div>
============================================================ */
const menuData = {
  cakes: [
    { e: '<img src="images/hero_berry_cake_1775941360420.png" style="width:100%;height:100%;object-fit:cover">', n: 'Forest Berry Dream',     d: 'Vanilla sponge, mixed berry compote, whipped cream',      p: '₹680', w: 'per 500g', c: 'Signature' },
    { e: '<img src="images/chocolate_royale_1775941374669.png" style="width:100%;height:100%;object-fit:cover">', n: 'Dark Chocolate Royale',  d: 'Belgian chocolate ganache, salted caramel layers',         p: '₹720', w: 'per 500g', c: 'Premium'   },
    { e: '<img src="images/strawberry_bliss_1775941388376.png" style="width:100%;height:100%;object-fit:cover">', n: 'Strawberry Bliss',       d: 'Fresh strawberries, cream cheese frosting, sponge base',   p: '₹580', w: 'per 500g', c: 'Fresh'     },
    { e: '<img src="images/matcha_cake_1775941402073.png" style="width:100%;height:100%;object-fit:cover">', n: 'Matcha Cloud Cake',      d: 'Japanese matcha, white chocolate, light mousse',           p: '₹650', w: 'per 500g', c: 'Seasonal'  },
    { e: '<img src="images/lemon_tart_1775943651880.png" style="width:100%;height:100%;object-fit:cover">', n: 'Mango Tango',            d: 'Alphonso mango pulp, mascarpone, coconut crumble',         p: '₹620', w: 'per 500g', c: 'Seasonal'  },
    { e: '<img src="images/red_velvet_1775943608641.png" style="width:100%;height:100%;object-fit:cover">', n: 'Red Velvet Classic',     d: 'Classic cream cheese frosting, cocoa velvet layers',       p: '₹560', w: 'per 500g', c: 'Classic'   }
  ],
  pastries: [
    { e: '<img src="images/pastry_display_1775941433075.png" style="width:100%;height:100%;object-fit:cover">', n: 'Butter Croissant',       d: 'Flaky French-style, baked fresh every morning',            p: '₹80',  w: 'per pc', c: 'Morning'   },
    { e: '<img src="images/cupcake_1775943623320.png" style="width:100%;height:100%;object-fit:cover">', n: 'Rosette Cupcake',        d: 'Vanilla, chocolate, or red velvet with piped frosting',    p: '₹120', w: 'per pc', c: 'Favourites'},
    { e: '<img src="images/doughnut_1775943638050.png" style="width:100%;height:100%;object-fit:cover">', n: 'Glazed Doughnut',        d: 'Soft brioche dough, seasonal glazes',                      p: '₹90',  w: 'per pc', c: 'Daily'     },
    { e: '<img src="images/lemon_tart_1775943651880.png" style="width:100%;height:100%;object-fit:cover">', n: 'Lemon Tart',             d: 'Tangy lemon curd in a buttery pastry shell',               p: '₹160', w: 'per pc', c: 'Patisserie'},
    { e: '<img src="images/cupcake_1775943623320.png" style="width:100%;height:100%;object-fit:cover">', n: 'Creme Brulee',           d: 'Classic vanilla bean, torched sugar crust',                p: '₹180', w: 'per pc', c: 'Patisserie'},
    { e: '<img src="images/pastry_display_1775941433075.png" style="width:100%;height:100%;object-fit:cover">', n: 'Banana Walnut Bread',    d: 'Moist loaf, toasted walnuts, natural sweetness',           p: '₹200', w: 'per loaf (350g)', c: 'Bakes'     }
  ],
  drinks: [
    { e: '<img src="images/artisan_coffee_1775941417853.png" style="width:100%;height:100%;object-fit:cover">', n: 'Signature Latte',        d: 'Double espresso, steamed oat milk, hint of cinnamon',      p: '₹180', w: 'per 350ml cup', c: 'Coffee'    },
    { e: '<img src="images/matcha_cake_1775941402073.png" style="width:100%;height:100%;object-fit:cover">', n: 'Matcha Latte',           d: 'Ceremonial grade matcha, steamed milk, honey',             p: '₹200', w: 'per 350ml cup', c: 'Specialty' },
    { e: '<img src="images/boba_tea_1775943666969.png" style="width:100%;height:100%;object-fit:cover">', n: 'Brown Sugar Boba',       d: 'Milk tea with homemade brown sugar boba pearls',           p: '₹220', w: 'per 500ml cup', c: 'Trending'  },
    { e: '<img src="images/strawberry_bliss_1775941388376.png" style="width:100%;height:100%;object-fit:cover">', n: 'Berry Smoothie',         d: 'Mixed berries, banana, Greek yogurt, agave',               p: '₹190', w: 'per 400ml cup', c: 'Fresh'     },
    { e: '<img src="images/artisan_coffee_1775941417853.png" style="width:100%;height:100%;object-fit:cover">', n: 'Hot Chocolate',          d: 'Belgian cocoa, steamed milk, marshmallows',                p: '₹160', w: 'per 350ml cup', c: 'Comfort'   },
    { e: '<img src="images/artisan_coffee_1775941417853.png" style="width:100%;height:100%;object-fit:cover">', n: 'Herbal Brew',            d: 'Chamomile, lavender, honey — caffeine free',               p: '₹140', w: 'per 1L pot', c: 'Wellness'  }
  ],
  specials: [
    { e: '<img src="images/wedding_cake_1775943682261.png" style="width:100%;height:100%;object-fit:cover">', n: 'Celebration Bundle',     d: '6-inch cake + 6 cupcakes + 2 lattes',                      p: '₹1,200', w: 'per combo box', c: 'Bundle'  },
    { e: '<img src="images/wedding_cake_1775943682261.png" style="width:100%;height:100%;object-fit:cover">', n: 'Wedding Cake Tasting',   d: '5 flavour samples + consultation session',                  p: '₹500',   w: 'per session', c: 'Bridal'  },
    { e: '<img src="images/cupcake_1775943623320.png" style="width:100%;height:100%;object-fit:cover">', n: 'Kids Party Pack',        d: 'Funfetti cake + 12 cupcakes + juice boxes',                 p: '₹1,800', w: 'serves roughly 10', c: 'Party'   },
    { e: '<img src="images/lemon_tart_1775943651880.png" style="width:100%;height:100%;object-fit:cover">', n: 'Vegan Delight Box',      d: '4 vegan pastries + plant-based latte',                      p: '₹420',   w: 'serves 1-2', c: 'Vegan'   },
    { e: '<img src="images/chocolate_royale_1775941374669.png" style="width:100%;height:100%;object-fit:cover">', n: 'Festive Season Box',     d: 'Seasonal limited-edition bakes collection',                 p: '₹650',   w: 'per box', c: 'Seasonal'},
    { e: '<img src="images/hero_berry_cake_1775941360420.png" style="width:100%;height:100%;object-fit:cover">', n: 'Gift Hamper',            d: 'Assorted cakes, cookies, and a personalised card',          p: '₹980',   w: 'per 1 basket', c: 'Gift'    }
  ]
};

/* ============================================================
   CART SYSTEM LOGIC
============================================================ */
let cart = [];
const catalog = {};
let _uid = 0;

/* Build and inject menu cards */
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
  { e: '<img src="images/hero_berry_cake_1775941360420.png" style="width:100%;height:100%;object-fit:cover;border-radius:4px">', n: 'Forest Berry Dream',    s: 'Vanilla & mixed berry compote',   p: '₹680', w: 'per 500g', r: '★★★★★', d: 'Our absolute crowd-pleaser. A light vanilla sponge layered with house-made mixed berry compote and clouds of fresh whipped cream.' },
  { e: '<img src="images/chocolate_royale_1775941374669.png" style="width:100%;height:100%;object-fit:cover;border-radius:4px">', n: 'Dark Chocolate Royale', s: 'Belgian chocolate ganache',       p: '₹720', w: 'per 500g', r: '★★★★★', d: 'For the serious chocolate lover. Three layers of moist chocolate sponge, filled with silky Belgian ganache and a whisper of sea salt caramel.' },
  { e: '<img src="images/strawberry_bliss_1775941388376.png" style="width:100%;height:100%;object-fit:cover;border-radius:4px">', n: 'Strawberry Bliss',      s: 'Fresh strawberry cream cheese',   p: '₹580', w: 'per 500g', r: '★★★★☆', d: 'Summer in every slice. We use only in-season fresh strawberries with a smooth cream cheese frosting on a light sponge.' },
  { e: '<img src="images/matcha_cake_1775941402073.png" style="width:100%;height:100%;object-fit:cover;border-radius:4px">', n: 'Matcha Cloud Cake',     s: 'Japanese matcha mousse',          p: '₹650', w: 'per 500g', r: '★★★★★', d: 'A delicate balance of earthy and sweet. Ceremonial-grade matcha mousse layered with white chocolate cream on a feather-light genoise base.' }
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
    <div class="best-item${i === activeBest ? ' active' : ''}" onclick="selectBest(${i})">
      <div class="best-rank">0${i + 1}</div>
      <div>
        <div class="best-item-name">${b.n}</div>
        <div class="best-item-sub">${b.s}</div>
      </div>
      <div class="best-price">${b.p} <span style="font-size:0.75rem;color:var(--text-muted);font-weight:300;margin-left:4px">${b.w || ''}</span></div>
    </div>
  `;}).join('');

  const b = bestsData[activeBest];
  const activeId = 'best_' + activeBest;
  document.getElementById('bestFeature').innerHTML = `
    <div class="best-feature-image" style="height: 240px; margin-bottom: 1.2rem; display: block; overflow: hidden; border-radius: 4px;">${b.e}</div>
    <div class="best-feature-name">${b.n}</div>
    <div class="stars">${b.r}</div>
    <div class="best-feature-price">${b.p} <span style="font-size:0.8rem;color:var(--text-muted);font-weight:300">${b.w || ''}</span></div>
    <div class="best-feature-desc">${b.d}</div>
    <button class="btn-primary" style="margin-top:1.5rem" onclick="addToCart('${activeId}')">Add to Order</button>
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

function updateCartUI() {
    const itemsCont = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const fbtn = document.getElementById('cart-float');
    
    let subtotal = 0, count = 0;
    
    itemsCont.innerHTML = cart.map(c => {
        subtotal += (c.price * c.qty);
        count += c.qty;
        return `
        <div class="cart-item-ui">
            <div class="cart-item-img">${c.img}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${c.name}</div>
                <div class="cart-item-price">₹${c.price}</div>
            </div>
            <div class="cart-item-controls">
                <button class="cart-btn" onclick="updateQty('${c.id}', -1)">-</button>
                <span style="font-size:0.9rem;font-weight:600;min-width:14px;text-align:center">${c.qty}</span>
                <button class="cart-btn" onclick="updateQty('${c.id}', 1)">+</button>
            </div>
        </div>`;
    }).join('');
    
    if(count === 0) {
        fbtn.classList.add('hidden');
        itemsCont.innerHTML = '<div style="text-align:center; color:var(--text-muted); margin-top:2rem; font-size:1.1rem">Your cart is empty 🛒</div>';
    } else {
        fbtn.classList.remove('hidden');
    }
    
    badge.innerText = count;
    document.getElementById('cart-subtotal').innerText = '₹' + subtotal;
    const delivery = count > 0 ? 40 : 0;
    document.getElementById('cart-delivery').innerText = '₹' + delivery;
    document.getElementById('cart-total').innerText = '₹' + (subtotal + delivery);
    document.getElementById('chk-amount').value = '₹' + (subtotal + delivery);
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
    
    overlay.classList.remove('hidden');
    msg.innerHTML = document.getElementById('chk-method').value === 'COD' ? 'Validating Address...' : 'Securely Processing Payment...';
    
    // Simulate network delay for Swiggy-like feeling
    await new Promise(r => setTimeout(r, 2500));
    
    const orderData = {
        name: document.getElementById('chk-name').value,
        phone: document.getElementById('chk-phone').value,
        address: document.getElementById('chk-address').value,
        method: document.getElementById('chk-method').value,
        total: document.getElementById('chk-amount').value,
        items: cart,
        type: 'ECOMMERCE_ORDER'
    };
    
    try {
        const res = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (res.ok) {
            msg.innerHTML = '<span style="color:var(--sage)">✅ Payment Successful!</span>';
            
            // If this was a custom cake booking, securely forward the actual custom details to the Messages/Inquiries DB!
            if (window._pendingCustomCake) {
                await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(window._pendingCustomCake)
                });
                window._pendingCustomCake = null;
            }
            
            await new Promise(r => setTimeout(r, 1500));
            cart = []; updateCartUI();
            closeCheckout();
            showToast('Order confirmed! Check your phone for details.');
            document.getElementById('payment-form').reset();
        } else throw new Error();
    } catch (err) {
        msg.innerHTML = '<span style="color:red">❌ Error connecting to backend!</span>';
        await new Promise(r => setTimeout(r, 2000));
    }
    overlay.classList.add('hidden');
}

// Initialise Empty Cart
updateCartUI();

/* Form submission handler (Generic Contact) */
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
   REVIEWS & SUPABASE INTEGRATION
============================================================ */
async function fetchReviews() {
    try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        const reviewsContainer = document.getElementById('reviewsList');
        if (!reviewsContainer || !data.reviews) return;
        
        reviewsContainer.innerHTML = data.reviews.length ? data.reviews.map(r => `
            <div class="review-card" style="background: white; padding: 1.5rem; border-radius: 4px; border: 1px solid var(--beige-dark); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <div class="stars" style="color: #c9a84c; margin-bottom: 0.5rem; font-size: 1.2rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                <p style="font-size: 0.9rem; color: var(--text-muted); font-style: italic; margin-bottom: 1rem;">"${r.message}"</p>
                <div style="font-family: 'Playfair Display', serif; color: var(--brown); font-weight: bold;">- ${r.name}</div>
            </div>
        `).join('') : '<p style="text-align:center; color: var(--text-muted);">No reviews yet. Be the first!</p>';
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
            showToast('Failed to submit review. Database might not be configured.');
        }
    } catch (err) {
        showToast('Error connecting to server.');
    } finally {
        btn.innerText = oldText;
    }
}

/* Custom Cake WhatsApp Order Flow */
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
            showToast('Order received! Redirecting to WhatsApp...');
            
            const payload = Object.fromEntries(formData.entries());
            let msg = `*New Custom Cake Order*\n`;
            msg += `Name: ${payload.name}\n`;
            msg += `Phone: ${payload.phone}\n`;
            msg += `Occasion: ${payload.occasion}\n`;
            msg += `Flavour: ${payload.flavour}\n`;
            msg += `Weight: ${payload.weight}\n`;
            if (payload.eggless) msg += `Type: Eggless\n`;
            msg += `Date: ${payload.delivery_date} at ${payload.delivery_time}\n`;
            if (payload.urgent) msg += `*URGENT ORDER*\n`;
            msg += `Instructions: ${payload.message}\n`;
            
            setTimeout(() => {
                window.open(`https://wa.me/919384784409?text=${encodeURIComponent(msg)}`, '_blank');
                form.reset();
            }, 1000);
        } else {
            showToast('Failed to place order. Check Database connection.');
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
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* Order option selector */
function selectOrder(el) {
  document.querySelectorAll('.order-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

/* Smooth scroll helper */
function smoothScroll(id) {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
}

