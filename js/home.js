// Home page, built from small section components.
import { PRODUCTS, productById } from './data.js';
import { HERO, PREVIEW, LOGOS, BENEFITS, STEPS, TESTIMONIALS, TIERS, FAQ } from './content.js';
import { esc, money, icons, wishButton } from './ui.js';

// ---------- Shared building blocks ----------

// align: 'center', 'left', or 'split' (title on the left, text on the right).
export function sectionHead({ eyebrow, title, text = '', align = 'center', id = '' }) {
  return `
    <header class="section-head section-head--${align}" data-reveal>
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="display"${id ? ` id="${id}"` : ''}>${title}</h2>
      </div>
      ${text ? `<p class="section-head__text">${text}</p>` : ''}
    </header>`;
}

const section = (id, inner, cls = '') => `<section class="band ${cls}" id="${id}" aria-labelledby="${id}-title">${inner}</section>`;

function avatar(t) {
  return `<img class="avatar" src="${t.avatar}" alt="" width="52" height="52" loading="lazy" decoding="async">`;
}

const stars = (n = 5) => `<span class="stars" role="img" aria-label="Rated ${n} out of 5">${icons.star.repeat(n)}</span>`;

// ---------- Sections ----------

function hero() {
  const era = productById('the-era-rose-gold');
  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__text">
        <p class="pill" data-reveal><span class="pill__dot"></span>${HERO.eyebrow}</p>
        <h1 class="display" id="hero-title" data-reveal>${HERO.title}</h1>
        <p class="lede" data-reveal>${HERO.lede}</p>
        <div class="hero__ctas" data-reveal>
          <a class="btn btn--primary" href="#/product/${era.id}" data-magnetic>Shop The Era ${icons.arrow}</a>
          <a class="btn btn--glass" href="#preview" data-scroll>Try the finishes</a>
        </div>
        <ul class="hero__proof" data-reveal>
          <li>${icons.globe}<span>Ships worldwide</span></li>
          <li>${icons.check}<span>14-day returns</span></li>
          <li>${icons.award}<span>2-year guarantee</span></li>
        </ul>
      </div>
      <div class="hero__stage" data-reveal>
        <div class="glass hero__card" data-tilt>
          <span class="glass__sheen" aria-hidden="true"></span>
          <div class="hero__plate"><img src="${era.image}" alt="The Era watch in rose gold with a white dial" width="350" height="605" fetchpriority="high" decoding="async"></div>
        </div>
        <p class="glass float-chip float-chip--b"><span class="float-chip__price">${money(era.price)}</span><span>The Era, rose gold</span></p>
      </div>
    </section>`;
}

function preview() {
  const first = productById(PREVIEW[0].id);
  return section('preview', `
    ${sectionHead({ eyebrow: 'Up close', id: 'preview-title', title: 'Find your finish', text: 'Our four best sellers, side by side. Tap one to swap it in.' })}
    <div class="preview glass" data-reveal>
      <span class="glass__sheen" aria-hidden="true"></span>
      <div class="preview__stage" data-tilt>
        <img id="pvImg" src="${first.image}" alt="${esc(first.name)}, ${esc(first.variant)}" width="350" height="605" loading="lazy" decoding="async">
        <span class="preview__floor" aria-hidden="true"></span>
      </div>
      <div class="preview__panel">
        <p class="eyebrow" id="pvKicker">${esc(first.name)}</p>
        <h3 class="preview__title" id="pvTitle">${esc(first.variant)}</h3>
        <p class="preview__price" id="pvPrice">${money(first.price)}</p>
        <p class="preview__desc" id="pvDesc">${esc(first.description)}</p>
        <div class="swatches" role="radiogroup" aria-label="Choose a watch">
          ${PREVIEW.map((v, i) => {
            const p = productById(v.id);
            return `<button type="button" class="swatch" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}"
              data-pv="${i}" style="--sw:${v.swatch}"><span class="swatch__dot"></span><span>${esc(p.name)}<small>${esc(p.variant)}</small></span></button>`;
          }).join('')}
        </div>
        <dl class="specs" id="pvSpecs"></dl>
        <p class="sr-only" id="pvLive" aria-live="polite"></p>
        <div class="preview__actions">
          <button class="btn btn--primary" type="button" id="pvAdd" data-magnetic>Add to cart</button>
          <a class="btn btn--glass" id="pvLink" href="#/product/${first.id}">Full details</a>
          <span id="pvWish">${wishButton(first)}</span>
        </div>
      </div>
    </div>`, 'band--preview');
}

function logoCloud() {
  return `
    <section class="logos" aria-labelledby="logos-title">
      <div class="logos__head" data-reveal>
        <p class="logos__label" id="logos-title">You’ll also find us at</p>
        <button class="logos__toggle" type="button" aria-pressed="false" data-marquee-toggle>Pause</button>
      </div>
      <div class="logos__track" data-reveal>
        <ul>${LOGOS.map((l, i) => `<li class="logo-mark logo-mark--${i % 3}">${l}</li>`).join('')}</ul>
        <ul aria-hidden="true">${LOGOS.map((l, i) => `<li class="logo-mark logo-mark--${i % 3}">${l}</li>`).join('')}</ul>
      </div>
    </section>`;
}

function benefits() {
  return section('benefits', `
    ${sectionHead({ eyebrow: 'Before you buy', id: 'benefits-title', title: 'The boring (but important) bits', text: 'Delivery, payment and what happens if something goes wrong. No small print.', align: 'split' })}
    <div class="benefits">
      ${BENEFITS.map((b, i) => `
        <article class="benefit" data-reveal style="--d:${i * 90}ms">
          <span class="benefit__icon glass">${icons[b.icon]}</span>
          <h3>${b.title}</h3>
          <p>${b.text}</p>
        </article>`).join('')}
    </div>`);
}

function bento() {
  return section('craft', `
    ${sectionHead({ eyebrow: 'The details', id: 'craft-title', title: 'Made to be <em>worn</em>, not kept in a drawer', align: 'left' })}
    <div class="bento">
      <a class="tile tile--hero glass" href="#/brand" data-reveal>
        <img src="images/about.jpg" alt="A rose gold PearlyBeau watch worn with a silk sleeve" width="336" height="353" loading="lazy" decoding="async">
        <div class="tile__body tile__body--over">
          <p class="eyebrow">Our story</p>
          <h3>A female-led brand from Lagos, started in June 2021.</h3>
          <span class="tile__more">Who we are ${icons.arrow}</span>
        </div>
      </a>
      <div class="tile tile--stat tile--s1 glass" data-reveal style="--d:60ms">
        <span class="glass__sheen" aria-hidden="true"></span>
        <p class="stat">316L</p>
        <h3>Stainless steel</h3>
        <p>Kind to sensitive skin, won’t tarnish, and polished by hand.</p>
      </div>
      <div class="tile tile--stat tile--s2 glass" data-reveal style="--d:120ms">
        <span class="glass__sheen" aria-hidden="true"></span>
        <p class="stat">3 ATM</p>
        <h3>Splash resistant</h3>
        <p>Fine in the rain or at the sink. Take it off to swim.</p>
      </div>
      <a class="tile tile--photo glass" href="#/shop/jewelry" data-reveal style="--d:60ms">
        <img src="images/cat-jewelry.jpg" alt="Layered bar and coin necklaces on a black pouch" width="400" height="393" loading="lazy" decoding="async">
        <div class="tile__body tile__body--over"><h3>Layers that stack</h3><span class="tile__more">Jewelry ${icons.arrow}</span></div>
      </a>
      <div class="tile tile--movement glass" data-reveal style="--d:120ms">
        <span class="glass__sheen" aria-hidden="true"></span>
        <div class="mini-dial" aria-hidden="true"><span class="mini-dial__h" id="dialH"></span><span class="mini-dial__m" id="dialM"></span><span class="mini-dial__s" id="dialS"></span></div>
        <div>
          <h3>Japanese quartz</h3>
          <p>Loses a few seconds a month at most. The little dial here is set to your time.</p>
        </div>
      </div>
      <a class="tile tile--wide glass" href="#/shop/eyewear" data-reveal style="--d:180ms">
        <img src="images/cat-eyewear.jpg" alt="Shady #002 sunglasses in black acetate" width="400" height="386" loading="lazy" decoding="async">
        <div class="tile__body">
          <p class="eyebrow">Eyewear</p>
          <h3>Shady #002</h3>
          <p>Big black frames with smoke lenses and full UV400 protection. Made for the Lagos sun.</p>
          <span class="tile__more">Shop eyewear ${icons.arrow}</span>
        </div>
      </a>
    </div>`);
}

function howItWorks() {
  return section('how', `
    ${sectionHead({ eyebrow: 'Ordering', id: 'how-title', title: 'How it works', align: 'left' })}
    <ol class="steps-row">
      ${STEPS.map((s, i) => `
        <li class="step glass" data-reveal style="--d:${i * 100}ms">
          <span class="glass__sheen" aria-hidden="true"></span>
          <span class="step__num">0${i + 1}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </li>`).join('')}
    </ol>`);
}

function testimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  return section('reviews', `
    ${sectionHead({ eyebrow: 'Reviews', id: 'reviews-title', title: 'What customers tell us', text: 'From messages, DMs and the odd voice note.' })}
    <div class="reviews">
      <figure class="review review--lead glass" data-reveal>
        <span class="glass__sheen" aria-hidden="true"></span>
        ${stars()}
        <blockquote class="display">“${lead.quote}”</blockquote>
        <figcaption>${avatar(lead)}<span><strong>${lead.name}</strong>${lead.role} · ${lead.product}</span></figcaption>
      </figure>
      ${rest.map((t, i) => `
        <figure class="review glass" data-reveal style="--d:${(i % 2) * 90}ms">
          ${stars()}
          <blockquote>“${t.quote}”</blockquote>
          <figcaption>${avatar(t)}<span><strong>${t.name}</strong>${t.role} · ${t.product}</span></figcaption>
        </figure>`).join('')}
    </div>`);
}

function pricing() {
  return section('pricing', `
    ${sectionHead({ eyebrow: 'Prices', id: 'pricing-title', title: 'What things cost', text: 'We sell straight from the studio, so there’s no shop markup on top.' })}
    <div class="tiers">
      ${TIERS.map((t, i) => `
        <article class="tier glass ${t.featured ? 'tier--featured' : ''}" data-reveal style="--d:${i * 90}ms">
          <span class="glass__sheen" aria-hidden="true"></span>
          <div class="tier__head"><h3>${t.name}</h3>${t.featured ? '<span class="tier__flag">Most popular</span>' : ''}</div>
          <p class="tier__text">${t.text}</p>
          <p class="tier__price"><small>from</small> ${money(t.from)}</p>
          <ul class="ticks">${t.perks.map((p) => `<li>${icons.check}${p}</li>`).join('')}</ul>
          <a class="btn ${t.featured ? 'btn--primary' : 'btn--glass'} btn--block" href="${t.href}" ${t.featured ? 'data-magnetic' : ''}>${t.cta}</a>
        </article>`).join('')}
    </div>
    <p class="tiers__note" data-reveal>All prices in naira. First order? Use <strong>WELCOME10</strong> for 10% off.</p>`);
}

function faq() {
  return section('faq', `
    <div class="faq">
      ${sectionHead({ eyebrow: 'FAQ', id: 'faq-title', title: 'Questions we get a lot', text: 'Can’t see yours? Call or WhatsApp <a href="tel:+2349114819336">+234 911 481 9336</a>. We’re a small team, so give us a few hours to reply.', align: 'left' })}
      <div class="faq__list glass" data-reveal>
        ${FAQ.map(([q, a], i) => `
          <details class="qa" ${i === 0 ? 'open' : ''}>
            <summary>${q}<span class="qa__icon" aria-hidden="true"></span></summary>
            <div class="qa__body"><p>${a}</p></div>
          </details>`).join('')}
      </div>
    </div>`);
}

function finalCta() {
  const best = PRODUCTS.filter((p) => p.bestseller).slice(0, 3);
  return `
    <section class="band band--cta" aria-labelledby="cta-title">
      <div class="cta glass" data-reveal>
        <span class="glass__sheen" aria-hidden="true"></span>
        <div class="cta__text">
          <p class="eyebrow">Still deciding?</p>
          <h2 class="display" id="cta-title">Find the one you’ll <em>actually</em> wear.</h2>
          <p>Free delivery in Nigeria over ₦150,000, two years of cover, and 14 days to change your mind.</p>
          <div class="hero__ctas">
            <a class="btn btn--primary" href="#/shop/watches" data-magnetic>Shop watches ${icons.arrow}</a>
            <a class="btn btn--glass" href="#/shop/giftshop">Browse gifts</a>
          </div>
        </div>
        <div class="cta__stack" aria-hidden="true">
          ${best.map((p) => `<img src="${p.image}" alt="" loading="lazy" decoding="async">`).join('')}
        </div>
      </div>
    </section>`;
}

// ---------- Behaviour ----------

function mountPreview(root) {
  const box = root.querySelector('.preview');
  if (!box) return;
  const img = box.querySelector('#pvImg');
  const swatches = [...box.querySelectorAll('.swatch')];
  let current = 0;

  function show(i, focus = false, announce = true) {
    current = i;
    const v = PREVIEW[i];
    const p = productById(v.id);
    swatches.forEach((s, j) => {
      s.setAttribute('aria-checked', String(j === i));
      s.tabIndex = j === i ? 0 : -1;
    });
    if (focus) swatches[i].focus();
    img.classList.add('is-swapping');
    setTimeout(() => {
      img.src = p.image;
      img.alt = `${p.name}, ${p.variant}`;
      img.classList.remove('is-swapping');
    }, 180);
    box.querySelector('#pvKicker').textContent = p.name;
    box.querySelector('#pvTitle').textContent = p.variant;
    box.querySelector('#pvPrice').textContent = money(p.price);
    box.querySelector('#pvDesc').textContent = p.description;
    box.querySelector('#pvLink').href = `#/product/${p.id}`;
    box.querySelector('#pvWish').innerHTML = wishButton(p);
    if (announce) box.querySelector('#pvLive').textContent = `Showing ${p.name}, ${p.variant}, ${money(p.price)}`;
    box.querySelector('#pvSpecs').innerHTML = [
      ['Case', v.case], ['Strap', v.strap], ['Movement', 'Japanese quartz'], ['Water', '3 ATM'],
    ].map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('');
  }

  box.addEventListener('click', (e) => {
    const s = e.target.closest('[data-pv]');
    if (s) show(+s.dataset.pv);
    if (e.target.closest('#pvAdd')) {
      document.dispatchEvent(new CustomEvent('pb:add', { detail: { id: PREVIEW[current].id, qty: 1, option: null } }));
    }
  });
  box.querySelector('.swatches').addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    show((current + step + PREVIEW.length) % PREVIEW.length, true);
  });
  show(0, false, false);
}

// The small dial in the bento grid shows the visitor's local time.
function mountDial(root) {
  const h = root.querySelector('#dialH');
  if (!h) return () => {};
  const m = root.querySelector('#dialM');
  const s = root.querySelector('#dialS');
  const tick = () => {
    const d = new Date();
    const sec = d.getSeconds();
    const min = d.getMinutes() + sec / 60;
    const hr = (d.getHours() % 12) + min / 60;
    h.style.transform = `rotate(${hr * 30}deg)`;
    m.style.transform = `rotate(${min * 6}deg)`;
    s.style.transform = `rotate(${sec * 6}deg)`;
  };
  tick();
  const timer = setInterval(() => (h.isConnected ? tick() : clearInterval(timer)), 1000);
  return timer;
}

export function home() {
  return {
    title: 'Pearlybeau | Quality Watches, Eyewear & Jewelry',
    html: [hero(), logoCloud(), preview(), benefits(), bento(), howItWorks(), testimonials(), pricing(), faq(), finalCta()].join(''),
    mount(root) {
      mountPreview(root);
      mountDial(root);
      // In-page links: scroll there and move focus, without touching the hash router.
      root.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.setAttribute('tabindex', '-1');
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }));
      const toggle = root.querySelector('[data-marquee-toggle]');
      toggle?.addEventListener('click', () => {
        const paused = toggle.getAttribute('aria-pressed') !== 'true';
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? 'Play' : 'Pause';
        root.querySelector('.logos').classList.toggle('is-paused', paused);
      });
    },
  };
}
