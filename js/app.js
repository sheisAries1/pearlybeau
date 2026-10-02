// Hash router and site-wide behaviour (header, cart badge, toasts, newsletter).
// Hash routes work on GitHub Pages with no server rewrites.
import * as views from './views.js';
import { checkout, order } from './checkout.js';
import * as store from './store.js';
import { productById } from './data.js';
import { esc, money, toast } from './ui.js';
import { enhance } from './motion.js';

const app = document.getElementById('app');

const routes = [
  [/^\/?$/, () => views.home()],
  [/^\/shop\/?$/, (m, q) => views.shop(null, q)],
  [/^\/shop\/([\w-]+)\/?$/, (m, q) => views.shop(m[1], q)],
  [/^\/search\/?$/, (m, q) => views.search(q)],
  [/^\/product\/([\w-]+)\/?$/, (m) => views.product(m[1])],
  [/^\/cart\/?$/, () => views.cart()],
  [/^\/checkout\/?$/, () => checkout()],
  [/^\/order\/([\w-]+)\/?$/, (m) => order(m[1])],
  [/^\/wishlist\/?$/, () => views.wishlist()],
  [/^\/account\/?$/, () => views.account()],
  [/^\/brand\/?$/, () => ({ ...views.brand(), nav: 'brand' })],
  [/^\/page\/([\w-]+)\/?$/, (m) => views.page(m[1])],
];

function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  return { path, query: new URLSearchParams(qs) };
}

let firstRender = true;

function render({ keepScroll = false } = {}) {
  const { path, query } = parseHash();
  let view = null;
  for (const [re, handler] of routes) {
    const m = path.match(re);
    if (m) { view = handler(m, query); break; }
  }
  view = view || views.notFound();

  app.innerHTML = view.html;
  document.title = view.title;
  view.mount?.(app);
  // Re-renders in place (wishlist, cart quantity) shouldn't replay the entrance animations.
  enhance(app, { instant: keepScroll });

  document.querySelectorAll('[data-nav]').forEach((a) => {
    const on = a.dataset.nav === view.nav;
    a.classList.toggle('is-on', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const searchInput = document.getElementById('searchInput');
  searchInput.value = path.startsWith('/search') ? query.get('q') || '' : '';
  closeMenu();

  if (!keepScroll) window.scrollTo(0, 0);
  if (!firstRender && !keepScroll) app.focus({ preventScroll: true });
  firstRender = false;
}

// Cross-fade between pages where the browser supports view transitions.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('hashchange', () => {
  if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(() => render());
  else render();
});

// The skip link points at #app, which the hash router would treat as a page, so handle it here.
document.querySelector('.skip').addEventListener('click', (e) => {
  e.preventDefault();
  app.focus();
});
document.addEventListener('pb:rerender', () => render({ keepScroll: true }));

// ---------- Actions inside pages ----------

function added(id, qty, option) {
  store.addToCart(id, qty, option);
  const p = productById(id);
  toast(`<span>Added <strong>${esc(p.name)} ${esc(p.variant)}</strong>${qty > 1 ? ` × ${qty}` : ''}${option ? ` (${money(option)})` : ''}</span>
    <a href="#/cart">View cart</a>`);
}

document.addEventListener('pb:add', (e) => added(e.detail.id, e.detail.qty, e.detail.option));

const onCheckout = () => parseHash().path.startsWith('/checkout');
function refreshAfterPromo() {
  const summary = onCheckout() && app.querySelector('#summary');
  if (summary) summary.dispatchEvent(new Event('pb:summary'));
  else render({ keepScroll: true });
}

app.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id, key } = btn.dataset;

  if (action === 'add') added(id, 1, null);

  if (action === 'wish') {
    const on = store.toggleWishlist(id);
    const p = productById(id);
    if (parseHash().path.startsWith('/wishlist')) return render({ keepScroll: true });
    app.querySelectorAll(`[data-action="wish"][data-id="${id}"]`).forEach((b) => {
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', `${on ? 'Remove from' : 'Add to'} wishlist: ${p.name} ${p.variant}`);
    });
    toast(on ? `<span>Saved to your wishlist</span><a href="#/wishlist">View</a>` : '<span>Removed from your wishlist</span>');
  }

  if (action === 'qty') { store.setQty(key, +btn.dataset.qty); render({ keepScroll: true }); }
  if (action === 'remove') { store.removeLine(key); render({ keepScroll: true }); }
  if (action === 'unpromo') { store.removePromo(); refreshAfterPromo(); }
  if (action === 'signout') { store.signOut(); render({ keepScroll: true }); }
});

app.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-promo]');
  if (!form) return;
  e.preventDefault();
  if (store.applyPromo(form.code.value)) {
    refreshAfterPromo();
    toast('<span>Promo code applied</span>');
  } else {
    form.querySelector('[data-promo-error]').textContent = 'That code isn’t valid.';
  }
});

app.addEventListener('change', (e) => {
  const select = e.target.closest('[data-sort-base]');
  if (!select) return;
  const base = select.dataset.sortBase;
  const sep = base.includes('?') ? '&' : '?';
  location.hash = select.value === 'featured' ? base : `${base}${sep}sort=${select.value}`;
});

// ---------- Header ----------

function updateBadges() {
  const cart = document.getElementById('cartCount');
  const wish = document.getElementById('wishCount');
  const n = store.cartCount();
  const w = store.wishlist().length;
  cart.textContent = n; cart.hidden = !n;
  wish.textContent = w; wish.hidden = !w;
  cart.closest('a').setAttribute('aria-label', `Cart, ${n} ${n === 1 ? 'item' : 'items'}`);
  wish.closest('a').setAttribute('aria-label', `Wishlist, ${w} saved`);
}
store.subscribe(updateBadges);

document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = e.target.q.value.trim();
  location.hash = q ? `#/search?q=${encodeURIComponent(q)}` : '#/shop';
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Shadow under the sticky header once the page scrolls.
const masthead = document.querySelector('.masthead');
// The category row tucks away on scroll down and slides back on scroll up.
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  masthead.classList.toggle('is-scrolled', y > 10);
  if (Math.abs(y - lastY) > 6) masthead.classList.toggle('is-tucked', y > 160 && y > lastY);
  lastY = y;
}, { passive: true });
enhance(document.querySelector('.footer'));

// ---------- Footer ----------

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsEmail');
  const msg = document.getElementById('newsMsg');
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    msg.textContent = 'Enter a valid email address.';
    return;
  }
  email.value = '';
  msg.innerHTML = 'Thanks for signing up! Use code <strong>WELCOME10</strong> for 10% off your first order.';
});

updateBadges();
render();
