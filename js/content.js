// Home page copy: stockists, benefits, steps, reviews, pricing tiers and FAQ.
// Stockist names and reviews are placeholders. Swap in real ones (with permission) before launch.

export const HERO = {
  eyebrow: 'New in: The Era Collection',
  title: 'Watches we’d wear <em>every single day</em>.',
  lede: 'Polished steel, warm rose gold and clean white dials. We make them in small batches in Ajah, Lagos, and post them anywhere in the world.',
};

// Pieces you can switch between in the interactive preview.
export const PREVIEW = [
  { id: 'the-era-rose-gold', swatch: 'linear-gradient(135deg,#f3d2bf,#c9967a 55%,#a9745b)', strap: 'Link bracelet', case: '32 mm' },
  { id: 'classic-era-silver-rose', swatch: 'linear-gradient(135deg,#f4f4f4,#bdbdbd 48%,#d8a68a 52%,#b98065)', strap: 'Two-tone link', case: '32 mm' },
  { id: 'classic-era-rose-gold', swatch: 'linear-gradient(135deg,#f0cdb7,#bf8a6d 55%,#9c6a52)', strap: 'Rose gold link', case: '32 mm' },
  { id: 'rose-quartz', swatch: 'repeating-linear-gradient(45deg,#e8c2ac 0 2px,#c69479 2px 4px)', strap: 'Milanese mesh', case: '36 mm' },
];

// Placeholder stockists. Replace with the real names before launch.
export const LOGOS = ['The Lekki Edit', 'MARULA', 'Ìmọ́lẹ̀ Studio', 'Coastline', 'HOUSE OF ADÉ', 'Bloom & Bark'];

export const BENEFITS = [
  { icon: 'globe', title: 'We post everywhere', text: 'Lagos in a day or two, the rest of Nigeria in 3–5 days, and abroad in 7–14. You get a tracking link either way.' },
  { icon: 'card', title: 'Pay how you like', text: 'Card, bank transfer, or cash when it arrives (Nigeria only). We never see or keep your card number.' },
  { icon: 'award', title: 'Two years of cover', text: 'If the movement stops or the plating lifts in the first two years, send it back and we’ll fix or replace it.' },
];

export const STEPS = [
  { title: 'Pick your piece', text: 'Every product page lists the case size, strap and materials. Not sure about fit? Send us your wrist size on WhatsApp.' },
  { title: 'Check out', text: 'Pay by card, transfer or on delivery. Add a note and ₦2,000 gift wrap if it’s a present.' },
  { title: 'Unbox it', text: 'It comes in our box with a care card and your guarantee. Battery changes are free for the first two years.' },
];

// Portraits are illustrations in images/reviews/. Use real customer photos instead if you have permission.
export const TESTIMONIALS = [
  {
    quote: 'Bought the Era for my sister’s graduation, then went back the next week and got one for myself. The rose gold looks way more expensive than it was.',
    name: 'Tolani A.', role: 'Lekki, Lagos', product: 'The Era, Rose Gold',
    avatar: 'images/reviews/tolani.svg',
  },
  {
    quote: 'Took nine days to reach Manchester and they messaged me at every step. I’ve worn my Classic Era pretty much every day since.',
    name: 'Amara O.', role: 'Manchester, UK', product: 'Classic Era, Silver / Rose',
    avatar: 'images/reviews/amara.svg',
  },
  {
    quote: 'Got the His & Hers set for our anniversary. My husband actually wears his, which tells you something. Paying on delivery made it easy.',
    name: 'Funmi B.', role: 'Abuja', product: 'His & Hers Set',
    avatar: 'images/reviews/funmi.svg',
  },
  {
    quote: 'I have tiny wrists and the mesh strap just fits, no links to take out. People ask me where it’s from all the time.',
    name: 'Kemi J.', role: 'Ibadan', product: 'Rose Quartz, Mesh',
    avatar: 'images/reviews/kemi.svg',
  },
  {
    quote: 'We ordered 40 for staff awards. They sorted the engraving list for us and delivered a day early.',
    name: 'Chidi N.', role: 'HR, Victoria Island', product: 'Corporate order',
    avatar: 'images/reviews/chidi.svg',
  },
];

// Pricing tiers point at real categories in data.js.
export const TIERS = [
  {
    name: 'Cuffs & layers', from: 28000, href: '#/shop/jewelry', cta: 'See jewelry',
    text: 'Wear them next to your watch, or on their own.',
    perks: ['Stainless steel, won’t tarnish', 'Open cuff, fits most wrists', 'Comes in a PearlyBeau pouch'],
  },
  {
    name: 'Watches', from: 72000, href: '#/shop/watches', cta: 'See watches', featured: true,
    text: 'The Era, Classic Era and Rose Quartz.',
    perks: ['Japanese quartz movement', 'Rose gold or two-tone', 'Two-year guarantee', 'Free delivery in Nigeria over ₦150,000'],
  },
  {
    name: 'Gift sets', from: 105000, href: '#/shop/giftshop', cta: 'See gift sets',
    text: 'A watch and a cuff, or two watches, boxed together.',
    perks: ['Gift box and handwritten note', 'Wrapped at no extra cost', 'Gift cards from ₦25,000'],
  },
];

export const FAQ = [
  ['Will the rose gold fade?', 'Not with normal wear. The plating sits on 316L stainless steel. Keep perfume and pool water off it and wipe it with the cloth in the box. If the plating does lift in the first two years, it’s covered.'],
  ['Can I wear it in water?', 'Rain and hand washing are fine (it’s rated 3 ATM). Take it off before you swim or shower.'],
  ['How long does delivery take?', 'Lagos 1–2 working days, the rest of Nigeria 3–5, everywhere else 7–14. Standard delivery in Nigeria is free over ₦150,000.'],
  ['How can I pay?', 'Visa, Mastercard or Verve, a bank transfer, or cash on delivery if you’re in Nigeria.'],
  ['The strap is too big. What now?', 'Bring it to the studio in Ajah and we’ll take links out for free, or we’ll send you a how-to video. The Rose Quartz mesh strap adjusts on its own.'],
  ['Can I send it back?', 'Yes. Send unworn pieces back in the box within 14 days for a refund or an exchange.'],
];
