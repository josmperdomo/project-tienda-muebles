/**
 * Tienda Muebles - Luxury Studio & Scandinavian/Japandi Interactive Controller
 * Author: Jose Manuel Perdomo
 * Version: 3.0.0
 */

// Product Database with Authentic Dimensions & Finishes
const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Credenza Nórdica Kyoto',
    category: 'salon',
    categoryName: 'Salón & Estar',
    priceCLP: 480000,
    priceUSD: 520,
    img: 'assets/img/producto1.jpg',
    badge: 'Diseño Exclusivo',
    rating: 4.9,
    wood: 'Roble Americano Macizo',
    dimensions: '160 cm x 78 cm x 45 cm',
    finish: 'Aceite de linaza mate natural y laca poliuretánica al agua',
    warranty: '10 años en ensamble estructural',
    desc: 'Aparador buffet de líneas depuradas con puertas correderas de apertura táctil suave y tiradores embutidos. Diseñado para optimizar el almacenamiento de vajilla y tecnología.'
  },
  {
    id: 'prod-2',
    name: 'Sitial Lounge Osaka',
    category: 'salon',
    categoryName: 'Salón & Estar',
    priceCLP: 340000,
    priceUSD: 370,
    img: 'assets/img/producto2.jpg',
    badge: 'Más Vendido',
    rating: 5.0,
    wood: 'Nogal Negro FSC',
    dimensions: '82 cm x 85 cm x 78 cm',
    finish: 'Tapizado en bouclé crudo hidrorrepelente de alto tránsito',
    warranty: '7 años en estructura y espumas',
    desc: 'Butaca escultural de inspiración orgánica. Su curvatura ergonómica abraza la postura natural del cuerpo brindando un confort envolvente.'
  },
  {
    id: 'prod-3',
    name: 'Mesa de Centro Copenhague',
    category: 'salon',
    categoryName: 'Salón & Estar',
    priceCLP: 290000,
    priceUSD: 315,
    img: 'assets/img/producto3.jpg',
    badge: 'Tendencia 2026',
    rating: 4.8,
    wood: 'Fresno Claro Seleccionado',
    dimensions: '110 cm x 42 cm x 60 cm',
    finish: 'Bisel perimetral a 45 grados y protección antimanchas',
    warranty: '5 años de garantía',
    desc: 'Mesa baja con geometría suave y cantos redondeados seguros para niños. Aporta calidez visual y ligereza espacial a cualquier living contemporáneo.'
  },
  {
    id: 'prod-4',
    name: 'Escritorio Studio Arhus',
    category: 'oficina',
    categoryName: 'Oficina & Estudio',
    priceCLP: 460000,
    priceUSD: 495,
    img: 'assets/img/producto4.jpg',
    badge: 'Home Office Pro',
    rating: 4.9,
    wood: 'Roble Europeo & Metal Grafito',
    dimensions: '140 cm x 75 cm x 65 cm',
    finish: 'Canaleta oculta pasacables magnética y cajón organizado',
    warranty: '10 años en correderas y ensamble',
    desc: 'Estación de trabajo minimalista diseñada para jornadas productivas sin fatiga. Incluye bandeja de gestión de cables y puerto de inducción opcional.'
  },
  {
    id: 'prod-5',
    name: 'Sillón Modular Bergen',
    category: 'salon',
    categoryName: 'Salón & Estar',
    priceCLP: 680000,
    priceUSD: 735,
    img: 'assets/img/producto5.jpg',
    badge: 'Alta Gama',
    rating: 5.0,
    wood: 'Estructura Pino Oregón Seco en Cámara',
    dimensions: '220 cm x 88 cm x 95 cm',
    finish: 'Espumas indeformables densidad 35 kg/m3 con plumón sintético',
    warranty: '10 años estructurales',
    desc: 'Sofá de 3 cuerpos de generosas proporciones y cojines reversibles. Confeccionado en lino belga con tratamiento antialérgico y desenfundable.'
  },
  {
    id: 'prod-6',
    name: 'Biblioteca & Repisa Malmö',
    category: 'oficina',
    categoryName: 'Oficina & Estudio',
    priceCLP: 520000,
    priceUSD: 560,
    img: 'assets/img/producto6.jpg',
    badge: 'Arquitectura Modular',
    rating: 4.8,
    wood: 'Nogal Macizo y Acero Negro',
    dimensions: '120 cm x 195 cm x 35 cm',
    finish: 'Fijación de seguridad anti-vuelco oculta incluida',
    warranty: '8 años de garantía',
    desc: 'Estantería vertical de concepto abierto para libros de arte y objetos de colección. Su diseño aéreo permite separar ambientes con sutileza.'
  }
];

// App State
let currentCurrency = 'CLP'; // 'CLP' or 'USD'
let cart = JSON.parse(localStorage.getItem('tm_cart_items')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCurrencyToggle();
  initCartDrawer();
  initProductCatalog();
  initQuickViewModal();
  initGalleryLightbox();
  initNewsletterForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const openDrawer = () => {
    navDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
}

/* --------------------------------------------------------------------------
   2. Currency Switcher (CLP / USD)
   -------------------------------------------------------------------------- */
function initCurrencyToggle() {
  const currencyPickers = document.querySelectorAll('.currency-picker, #currencyToggle');

  currencyPickers.forEach(picker => {
    picker.addEventListener('click', (e) => {
      e.preventDefault();
      currentCurrency = currentCurrency === 'CLP' ? 'USD' : 'CLP';
      updateCurrencyLabels();
      renderCartUI();
      // If products on page, update their prices
      updateCatalogPrices();
      showToast(`Moneda actualizada a ${currentCurrency === 'CLP' ? 'Pesos Chilenos ($ CLP)' : 'Dólares ($ USD)'}`);
    });
  });
}

function formatPrice(clp, usd) {
  if (currentCurrency === 'USD') {
    return `$${usd.toLocaleString('en-US')} USD`;
  }
  return `$${clp.toLocaleString('es-CL')} CLP`;
}

function updateCurrencyLabels() {
  document.querySelectorAll('.currency-label').forEach(el => {
    el.textContent = currentCurrency;
  });
}

function updateCatalogPrices() {
  document.querySelectorAll('.producto-card').forEach(card => {
    const id = card.getAttribute('data-id');
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (prod) {
      const priceEl = card.querySelector('.producto-price');
      if (priceEl) priceEl.textContent = formatPrice(prod.priceCLP, prod.priceUSD);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Shopping Cart Drawer System
   -------------------------------------------------------------------------- */
function initCartDrawer() {
  const cartBtn = document.getElementById('openCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const openCart = () => {
    cartDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartUI();
  };

  const closeCart = () => {
    cartDrawer?.classList.remove('active');
    if (!document.getElementById('navDrawer')?.classList.contains('active')) {
      drawerOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  cartBtn?.addEventListener('click', openCart);
  cartCloseBtn?.addEventListener('click', closeCart);

  // Close when clicking overlay if cart is active
  drawerOverlay?.addEventListener('click', () => {
    if (cartDrawer?.classList.contains('active')) {
      closeCart();
    }
  });

  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('El carrito está vacío. Agrega una pieza de mobiliario para continuar.');
      return;
    }
    showCheckoutSimulation();
  });

  renderCartUI();
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      priceCLP: product.priceCLP,
      priceUSD: product.priceUSD,
      img: product.img,
      wood: product.wood,
      qty: 1
    });
  }
  saveCart();
  renderCartUI();
  showToast(`¡"${product.name}" añadida a tu pedido!`);
}

function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCartUI();
  showToast('Pieza eliminada del carrito.');
}

function saveCart() {
  localStorage.setItem('tm_cart_items', JSON.stringify(cart));
}

function renderCartUI() {
  const countBadges = document.querySelectorAll('.cart-badge');
  const itemsContainer = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');

  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  countBadges.forEach(b => (b.textContent = totalCount));

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1.6rem auto; color: var(--text-muted); display: block;">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <p style="font-weight: 600; font-size: 1.6rem; color: var(--text-primary); margin-bottom: 0.6rem;">Tu carrito está vacío</p>
        <p style="font-size: 1.4rem;">Explora nuestra colección y añade piezas de diseño a tu espacio.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0, 0);
    return;
  }

  let totalCLP = 0;
  let totalUSD = 0;

  itemsContainer.innerHTML = cart.map(item => {
    const itemTotalCLP = item.priceCLP * item.qty;
    const itemTotalUSD = item.priceUSD * item.qty;
    totalCLP += itemTotalCLP;
    totalUSD += itemTotalUSD;

    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 0.4rem;">${item.wood}</p>
          <span class="cart-item-price">${formatPrice(item.priceCLP, item.priceUSD)}</span>
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', -1)" title="Disminuir">&minus;</button>
            <span style="font-size: 1.3rem; font-weight: 700; padding: 0 0.4rem;">${item.qty}</span>
            <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', 1)" title="Aumentar">&plus;</button>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Eliminar">&times;</button>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(totalCLP, totalUSD);
  }
}

window.changeCartQty = changeCartQty;
window.removeFromCart = removeFromCart;

/* Checkout Simulation */
function showCheckoutSimulation() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalCLP = cart.reduce((sum, i) => sum + (i.priceCLP * i.qty), 0);
  const totalUSD = cart.reduce((sum, i) => sum + (i.priceUSD * i.qty), 0);

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.id = 'checkoutModal';
  modal.innerHTML = `
    <div class="quickview-card" style="max-width: 560px; grid-template-columns: 1fr; padding: 3.6rem;">
      <button class="modal-close-btn" onclick="document.getElementById('checkoutModal').remove()">&times;</button>
      <div style="text-align: center; margin-bottom: 2.4rem;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.6rem auto;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="font-size: 2.6rem; margin-bottom: 0.8rem;">Resumen de Pedido</h3>
        <p style="font-size: 1.45rem;">Has seleccionado <strong>${totalCount} pieza(s)</strong> de mobiliario de autor.</p>
      </div>

      <div style="background: var(--bg-canvas); padding: 2.0rem; border-radius: var(--radius-md); margin-bottom: 2.4rem; border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 1.45rem;">
          <span>Subtotal Mobiliario:</span>
          <strong>${formatPrice(totalCLP, totalUSD)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 1.45rem; color: var(--secondary);">
          <span>Envío & Embalaje Seguro:</span>
          <strong>¡Gratis! (Promoción Lanzamiento)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid var(--border-strong); font-size: 1.8rem; font-weight: 800;">
          <span>Total a Pagar:</span>
          <span style="color: var(--primary);">${formatPrice(totalCLP, totalUSD)}</span>
        </div>
      </div>

      <div class="btn-group" style="justify-content: center;">
        <button class="btn-primary btn-lg" onclick="simulatePaymentSuccess()">
          Confirmar Compra Segura
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

window.simulatePaymentSuccess = function() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.innerHTML = `
      <div class="quickview-card" style="max-width: 500px; grid-template-columns: 1fr; padding: 4.0rem; text-align: center;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: #e8f5e9; color: #2e7d32; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.0rem auto;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="font-size: 2.6rem; margin-bottom: 1.0rem;">¡Pedido Confirmado!</h3>
        <p style="font-size: 1.5rem; margin-bottom: 2.0rem;">Tu orden #TM-2026-${Math.floor(1000 + Math.random() * 9000)} ha sido registrada con éxito. Nuestro equipo de maestros ebanistas se pondrá en contacto para coordinar la entrega e instalación en tu domicilio.</p>
        <button class="btn-primary" onclick="clearCartAndCloseModal()">Finalizar y Volver a la Tienda</button>
      </div>
    `;
  }
};

window.clearCartAndCloseModal = function() {
  cart = [];
  saveCart();
  renderCartUI();
  document.getElementById('checkoutModal')?.remove();
  document.getElementById('cartDrawer')?.classList.remove('active');
  document.getElementById('drawerOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
  showToast('¡Gracias por tu compra! Tu carrito ha sido reiniciado.');
};

/* --------------------------------------------------------------------------
   4. Products Catalog (Filtering, Search & Sorting)
   -------------------------------------------------------------------------- */
function initProductCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('productSearchInput');
  const sortSelect = document.getElementById('productSortSelect');
  const productsGrid = document.getElementById('productsListGrid');

  if (!productsGrid) return; // If on another page

  function filterAndRender() {
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const query = searchInput?.value.toLowerCase().trim() || '';
    const sortBy = sortSelect?.value || 'default';

    let filtered = PRODUCTS_DATA.filter(prod => {
      const matchCat = activeFilter === 'all' || prod.category === activeFilter;
      const matchQuery = prod.name.toLowerCase().includes(query) || prod.desc.toLowerCase().includes(query) || prod.wood.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.priceCLP - b.priceCLP);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.priceCLP - a.priceCLP);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProductsGrid(filtered, productsGrid);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRender();
    });
  });

  searchInput?.addEventListener('input', filterAndRender);
  sortSelect?.addEventListener('change', filterAndRender);

  // Initial Render
  filterAndRender();
}

function renderProductsGrid(products, container) {
  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 6.4rem 2.0rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1.6rem auto; color: var(--text-muted); display: block;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="font-size: 2.2rem; margin-bottom: 0.8rem;">No se encontraron piezas</h3>
        <p style="font-size: 1.5rem; color: var(--text-muted);">Prueba con otros términos de búsqueda o selecciona otra categoría.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(prod => `
    <div class="producto-card" data-id="${prod.id}">
      <div class="producto-media-wrap">
        <span class="producto-badge">${prod.badge}</span>
        <img src="${prod.img}" alt="${prod.name}" loading="lazy" />
        <button class="producto-quick-btn" onclick="openQuickView('${prod.id}')">
          Ficha Rápida
        </button>
      </div>
      <div class="producto-content">
        <span class="producto-cat-label">${prod.categoryName}</span>
        <h3 class="producto-title">${prod.name}</h3>
        <p class="producto-desc">${prod.desc}</p>
        <div class="producto-specs">
          <span>${prod.wood}</span>
          <span>&bull;</span>
          <div class="producto-rating">
            <span>★</span>
            <span>${prod.rating}</span>
          </div>
        </div>
        <div class="producto-footer">
          <div class="producto-price-wrap">
            <span class="producto-price-label">Precio</span>
            <span class="producto-price">${formatPrice(prod.priceCLP, prod.priceUSD)}</span>
          </div>
          <div class="producto-actions">
            <button class="btn btn-primary btn-sm" onclick="handleAddToCart('${prod.id}')">
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.handleAddToCart = function(id) {
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  if (prod) addToCart(prod);
};

/* --------------------------------------------------------------------------
   5. Quick View Modal
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickView');
  const overlay = modal?.querySelector('.modal-backdrop');

  closeBtn?.addEventListener('click', closeQuickView);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeQuickView();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });
}

function openQuickView(id) {
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  const modal = document.getElementById('quickViewModal');
  if (!prod || !modal) return;

  document.getElementById('qvImg').src = prod.img;
  document.getElementById('qvBadge').textContent = prod.badge;
  document.getElementById('qvCategory').textContent = prod.categoryName;
  document.getElementById('qvTitle').textContent = prod.name;
  document.getElementById('qvDesc').textContent = prod.desc;
  document.getElementById('qvWood').textContent = prod.wood;
  document.getElementById('qvDimensions').textContent = prod.dimensions;
  document.getElementById('qvFinish').textContent = prod.finish;
  document.getElementById('qvWarranty').textContent = prod.warranty;
  document.getElementById('qvPrice').textContent = formatPrice(prod.priceCLP, prod.priceUSD);

  const buyBtn = document.getElementById('qvBuyBtn');
  if (buyBtn) {
    buyBtn.onclick = () => {
      addToCart(prod);
      closeQuickView();
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  modal?.classList.remove('active');
  document.body.style.overflow = '';
}

window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;

/* --------------------------------------------------------------------------
   6. Gallery Lightbox
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.galeria-item, .galeria a');
  const modal = document.getElementById('galleryLightbox');
  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal || !imgEl) return;

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href') || item.querySelector('img')?.getAttribute('src');
      const caption = item.getAttribute('data-caption') || item.querySelector('img')?.getAttribute('alt') || 'Showroom Tienda Muebles';
      
      imgEl.src = href;
      if (captionEl) captionEl.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   7. Newsletter Form
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form, .footer-newsletter-wrap');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('¡Gracias por suscribirte! Código cupón: MUEBLES10 (-10% dto.)');
        input.value = '';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   9. Toast Notifications
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--primary-light);">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

window.showToast = showToast;
