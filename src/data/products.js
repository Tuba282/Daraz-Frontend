const COLORS = [
  { name: 'White', hex: '#f8fafc', border: '#cbd5e1' },
  { name: 'Black', hex: '#111827', border: '#374151' },
  { name: 'Red', hex: '#ef4444', border: '#dc2626' },
  { name: 'Blue', hex: '#3b82f6', border: '#2563eb' },
  { name: 'Orange', hex: '#f59e0b', border: '#d97706' },
];

const QUALITIES = ['Standard', 'Premium', 'Pro'];
const CATEGORY_TITLES = [
  'Smart Watch',
  'Wireless Earbuds',
  'Running Shoes',
  'Leather Wallet',
  'Bluetooth Speaker',
  'Travel Backpack',
  'Premium Headphones',
  'Laptop Sleeve',
  'Home Blender',
  'Portable Charger',
];

const DESCRIPTIONS = [
  'A polished everyday pick with dependable performance and modern styling.',
  'Designed for comfort, longevity, and premium finish with everyday utility.',
  'Made with quality materials and practical features for daily use.',
  'A strong value option that balances build quality, looks, and affordability.',
  'Trusted by shoppers for consistent performance and fast delivery.',
];

const REVIEW_TEMPLATES = [
  'Excellent quality and the finish looks premium. Delivery was quick and packaging was neat.',
  'Very happy with the product. It feels durable and the color looks even better in person.',
  'Good value for money. I would definitely recommend it to friends and family.',
  'The product matched the description and the performance is better than expected.',
  'The experience was smooth from checkout to delivery. The quality feels solid.',
  'A little expensive, but the build quality and finish justify it completely.',
  'Great for everyday use. It looks stylish and works exactly the way I needed.',
];

const SELLER_NAMES = ['Daraz Mall', 'TrendHub', 'Luxe Cart', 'Prime Choice', 'Style Avenue'];

const IMAGE_LIBRARY = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
];

const slugify = (value) =>
  String(value || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const hashString = (value) =>
  String(value)
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

const getColorChoices = (hash) => {
  const uniqueColors = [];
  for (let index = 0; index < 3; index += 1) {
    const color = COLORS[(hash + index) % COLORS.length];
    if (!uniqueColors.some((item) => item.name === color.name)) {
      uniqueColors.push(color);
    }
  }
  return uniqueColors;
};

const getImageSet = (hash, title) => {
  const titleLower = title.toLowerCase();
  let baseImages = IMAGE_LIBRARY.slice();

  if (titleLower.includes('watch')) {
    baseImages = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
    ];
  } else if (titleLower.includes('earbud') || titleLower.includes('headphone')) {
    baseImages = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',
    ];
  } else if (titleLower.includes('shoe') || titleLower.includes('backpack') || titleLower.includes('wallet')) {
    baseImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
    ];
  }

  return Array.from({ length: 4 }, (_, index) => baseImages[(hash + index) % baseImages.length]);
};

export const generateBaseProduct = (seed = 'product') => {
  const normalizedSeed = typeof seed === 'string' ? seed : String(seed || 'product');
  const hash = hashString(normalizedSeed);
  const categoryTitle = CATEGORY_TITLES[hash % CATEGORY_TITLES.length];
  const prefix = ['Premium', 'Latest', 'Trending', 'New', 'Smart'][hash % 5];
  const title = `${prefix} ${categoryTitle} ${hash % 2 === 0 ? 'Edition' : 'Pro'}`;
  const slug = slugify(`${title}-${normalizedSeed}`);
  const price = 1200 + (hash % 17) * 1800;
  const discount = 8 + (hash % 22);
  const salePrice = Math.round(price * (1 - discount / 100));
  const colors = getColorChoices(hash);
  const selectedColor = colors[0];
  const qualities = QUALITIES.filter((_, index) => (hash + index) % 2 === 0 || index === 1).slice(0, 3);
  const selectedQuality = qualities[0];
  const reviewsCount = 80 + (hash % 160);
  const rating = Number((3.6 + (hash % 14) / 10).toFixed(1));

  const reviews = Array.from({ length: 8 }, (_, index) => {
    const reviewRating = index % 4 === 0 ? 3 : index % 3 === 0 ? 4 : 5;
    return {
      id: `${normalizedSeed}-${index}`,
      user: ['Ali', 'Sara', 'Muneeb', 'Ayesha', 'Hassan', 'Nadia'][index % 6],
      rating: reviewRating,
      date: `${index + 1} ${index === 0 ? 'day' : 'days'} ago`,
      verified: index % 2 === 0,
      comment: REVIEW_TEMPLATES[(hash + index) % REVIEW_TEMPLATES.length],
      sellerResponse: 'Thank you for your feedback. We are glad the product matched your expectations.',
      responseDate: `${index + 1} weeks ago`,
      colorFamily: colors[index % colors.length]?.name || 'Standard',
    };
  });

  return {
    id: normalizedSeed,
    _id: normalizedSeed,
    slug,
    name: title,
    title,
    brand: SELLER_NAMES[hash % SELLER_NAMES.length],
    category: 'Electronics',
    subCategory: 'Trending Products',
    description: DESCRIPTIONS[hash % DESCRIPTIONS.length],
    price,
    salePrice,
    discount,
    rating,
    reviewsCount,
    images: getImageSet(hash, title),
    colors,
    selectedColor,
    qualities,
    selectedQuality,
    badge: hash % 3 === 0 ? 'Flash Sale' : hash % 3 === 1 ? 'Top Rated' : 'Best Seller',
    seller: {
      name: SELLER_NAMES[hash % SELLER_NAMES.length],
      rating: `${86 + (hash % 8)}%`,
      shippingPerformance: `${90 + (hash % 7)}%`,
    },
    specs: {
      Brand: SELLER_NAMES[hash % SELLER_NAMES.length],
      Material: 'Premium Build',
      Condition: 'New',
      Warranty: '1 Year Local Warranty',
      'Return Policy': '14 Days Easy Return',
      'Color Family': selectedColor.name,
      Quality: selectedQuality,
      'Delivery Speed': 'Express Delivery Available',
    },
    highlights: [
      'Fast shipping and secure packaging',
      'Dynamic color and quality options',
      'Real buyer reviews and reliable seller support',
    ],
    variants: [
      {
        label: 'Color',
        options: colors,
      },
      {
        label: 'Quality',
        options: QUALITIES.map((quality) => ({ name: quality, label: quality })),
      },
    ],
    reviews,
  };
};

export const generateMockProduct = (id, title, price, salePrice, image) => {
  const base = generateBaseProduct(id);
  const discount = Math.round(((price - salePrice) / price) * 100);
  return {
    ...base,
    id,
    _id: id,
    slug: id,
    name: title,
    title,
    price,
    salePrice,
    discount,
    images: [image, ...base.images.slice(1)],
  };
};

export const baseJustForYouProducts = [
  generateMockProduct('101', 'Cat Neck Rainbow Ribbon Adjustable Collar', 750, 276, 'https://picsum.photos/seed/cat-collar/400/400'),
  generateMockProduct('102', 'Automatic Counting Hand Gripper Adjustable', 499, 299, 'https://picsum.photos/seed/hand-gripper/400/400'),
  generateMockProduct('103', 'NEW TRENDY D T F', 3599, 799, 'https://picsum.photos/seed/tshirt1/400/400'),
  generateMockProduct('104', 'Girls & Women Soft Cotton Jersey', 1999, 799, 'https://picsum.photos/seed/jersey/400/400'),
  generateMockProduct('105', 'Premium Printed T-Shirt', 1499, 664, 'https://picsum.photos/seed/tshirt2/400/400'),
  generateMockProduct('106', 'M10 Stereo TWS Earbuds', 1999, 653, 'https://picsum.photos/seed/earbuds/400/400'),
  generateMockProduct('107', 'Elegant Umrah Saving Box', 400, 240, 'https://picsum.photos/seed/saving-box/400/400'),
  generateMockProduct('108', 'Bow Knot Collar For Cats', 200, 176, 'https://picsum.photos/seed/cat-bow/400/400'),
  generateMockProduct('109', 'Golden Umrah Decoration', 799, 199, 'https://picsum.photos/seed/umrah-decor/400/400'),
  generateMockProduct('110', 'Summer Collection Pack Of 3', 1999, 379, 'https://picsum.photos/seed/summer-pack/400/400'),
  generateMockProduct('111', 'Leather Wallet For Men', 599, 299, 'https://picsum.photos/seed/wallet/400/400'),
  generateMockProduct('112', 'Luxury Tracksuit', 1299, 979, 'https://picsum.photos/seed/tracksuit/400/400'),
  generateMockProduct('113', 'Wireless Magnetic Handfree', 1299, 593, 'https://picsum.photos/seed/handfree/400/400'),
  generateMockProduct('114', 'Dell Laptop Sleeve', 5500, 2957, 'https://picsum.photos/seed/laptop-sleeve/400/400'),
  generateMockProduct('115', 'Snap Button Press Plier', 899, 495, 'https://picsum.photos/seed/plier/400/400'),
  generateMockProduct('116', '3 in 1 Hair Dryer Brush', 2999, 1799, 'https://picsum.photos/seed/hair-dryer/400/400'),
  generateMockProduct('117', 'Remote Control Helicopter', 1999, 799, 'https://picsum.photos/seed/helicopter/400/400'),
  generateMockProduct('118', 'Stainless Steel Ring', 599, 191, 'https://picsum.photos/seed/ring/400/400'),
];

export const generateProduct = (seed = 'product') => {
  const normalizedSeed = typeof seed === 'string' ? seed : String(seed || 'product');

  // Match with productList first so the clicked card details are accurate
  const productListMatch = productList.find(p => String(p.id) === normalizedSeed || p.slug === normalizedSeed);
  if (productListMatch) {
    return generateMockProduct(String(productListMatch.id), productListMatch.name, productListMatch.price, productListMatch.salePrice, productListMatch.images[0]);
  }

  // Try to find if it matches any hardcoded base products first
  const baseProductMatch = baseJustForYouProducts.find(p => p.id === normalizedSeed || p.slug === normalizedSeed);
  if (baseProductMatch) {
    return baseProductMatch;
  }

  return generateBaseProduct(normalizedSeed);
};

export const generateProductList = (count = 12, prefix = 'product') => {
  if (prefix === 'just-for-you') {
    // Return base products plus generate more if needed
    const list = [...baseJustForYouProducts];
    let i = baseJustForYouProducts.length + 1;
    while (list.length < count) {
      list.push(generateBaseProduct(`${prefix}-${i}`));
      i++;
    }
    return list.slice(0, count);
  }

  return Array.from({ length: count }, (_, index) => generateProduct(`${prefix}-${index + 1}`));
};



export const productList = [
  { id: 1, name: "Wireless Bluetooth Earbuds", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XdlM3Lc3tOhV2mMtacBPteJQHtSstl91o_iCtfYSxw&s=10'], slug: "wireless-bluetooth-earbuds", price: 3999, salePrice: 2499, rating: 5, reviewsCount: 134, badge: "Hot Deal" },
  { id: 2, name: "Gaming Mechanical Keyboard", images: ['https://bloodygaming.pk/cdn/shop/files/bloody-ws98-dual-core-wireless-mechanical-gaming-keyboard-9800417.jpg?v=1761126367'], slug: "gaming-mechanical-keyboard", price: 7999, salePrice: 5999, rating: 5, reviewsCount: 289, badge: "Sale" },
  { id: 3, name: "RGB Gaming Mouse", images: ['https://img.drz.lazcdn.com/static/pk/p/9473b0fc6b8c3d372f40d1f8e942eb01.png_960x960q80.png_.webp'], slug: "rgb-gaming-mouse", price: 2499, salePrice: 1699, rating: 4, reviewsCount: 95, badge: "New" },
  { id: 4, name: "Smart Watch Series 9", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAltxUBt3-as_-SOsC2mrkEh2h2QKl8eRGV-vsWwi8Xg&s=10'], slug: "smart-watch-series-9", price: 1299, salePrice: 9999, rating: 5, reviewsCount: 412, badge: "Bestseller" },
  { id: 5, name: "USB-C Fast Charger", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIzkhT5UPym2fxt00NW1qJvz2u3OptUX4XjW_lO2-aw&s=10'], slug: "usb-c-fast-charger", price: 1999, salePrice: 1299, rating: 4, reviewsCount: 178, badge: "Hot Deal" },
  { id: 6, name: "Leather Wallet", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUGwpzfjTinmhExXomFG-drNwl0bbOxW1ohx3dEJjNNw&s=10'], slug: "leather-wallet", price: 2499, salePrice: 1599, rating: 5, reviewsCount: 87, badge: "Sale" },
  { id: 7, name: "Casual Cotton T-Shirt", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgov2djOdzOa5Yl_2VRbK5wSxo5aPHluErrmDvMgX6A&s=10'], slug: "casual-cotton-tshirt", price: 1999, salePrice: 999, rating: 4, reviewsCount: 221, badge: "New" },
  { id: 8, name: "Sports Running Shoes", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlgxltTAO_Y4xiDvpIUJS-HhtYpzX3hQKOO2i84LiNyA&s=10'], slug: "sports-running-shoes", price: 8999, salePrice: 6499, rating: 5, reviewsCount: 351, badge: "Hot Deal" },
  { id: 9, name: "Laptop Backpack", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDJefWtpgUDMkdDPX5yI3_BONli31tO0KHgRkkoVXYQ&s=10'], slug: "laptop-backpack", price: 4999, salePrice: 3499, rating: 5, reviewsCount: 144, badge: "Bestseller" },
  { id: 10, name: "Wireless Mouse", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoRlcuLEmiOwcvdJkL1V1wcPkKenF5hhAnzdvtApIHvw&s=10'], slug: "wireless-mouse", price: 2999, salePrice: 1899, rating: 4, reviewsCount: 188, badge: "Sale" },
  { id: 11, name: "Portable SSD 1TB", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXMRzdqwXoW3PG2ZzHyeGpv7vJby0_lNkumJtWvkhWOg&s=10'], slug: "portable-ssd-1tb", price: 18999, salePrice: 14999, rating: 5, reviewsCount: 93, badge: "Hot Deal" },
  { id: 12, name: "Bluetooth Speaker", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD36cSFPwI899GhfdHtRWusBwnvAUMIA86X6PIcgXThA&s=10'], slug: "bluetooth-speaker", price: 5999, salePrice: 4499, rating: 5, reviewsCount: 201, badge: "New" },
  { id: 13, name: "LED Desk Lamp", images: ['https://ae01.alicdn.com/kf/S67632b3e2042479daafb4709966c35b15.jpg'], slug: "led-desk-lamp", price: 2499, salePrice: 1799, rating: 4, reviewsCount: 80, badge: "Sale" },
  { id: 14, name: "Hair Dryer Brush", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtE8rOhOXu89Apm00AZ9benEBDb7vHkL1l5ravwxjkhA&s=10'], slug: "hair-dryer-brush", price: 5499, salePrice: 3999, rating: 5, reviewsCount: 173, badge: "Hot Deal" },
  { id: 15, name: "Fitness Dumbbells Set", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5aEQu-j1Je-tVEsJI4T153xzostRzkGqlJvCI4hZBa0GGsDGel6B2TvI&s=10'], slug: "fitness-dumbbells-set", price: 6999, salePrice: 4999, rating: 5, reviewsCount: 155, badge: "Bestseller" },
  { id: 16, name: "iPhone 15 Case", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzG-5PVSs7enUKLvbBXVKPUasiR1OEJv5btWClMFacFA&s=10'], slug: "iphone-15-case", price: 1499, salePrice: 899, rating: 4, reviewsCount: 132, badge: "New" },
  { id: 17, name: "Premium Hoodie", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_nMWCKQoL7xV7qg0rILoLr_RVy3LMuTe2qJyudaKMQ&s=10'], slug: "premium-hoodie", price: 4999, salePrice: 3499, rating: 5, reviewsCount: 142, badge: "Hot Deal" },
  { id: 18, name: "Wireless Power Bank", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJogWihTsZv2XG4xGb-7J9ogksm-Cr4Ak7i_tjqC-evA&s=10'], slug: "wireless-power-bank", price: 5999, salePrice: 4199, rating: 5, reviewsCount: 236, badge: "Sale" },
  { id: 19, name: "Gaming Headset", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ks6lbrMcRoI-H6lJbmpdWvG74nfNNg0kcL2fyjTBKQ&s=10'], slug: "gaming-headset", price: 8999, salePrice: 6799, rating: 5, reviewsCount: 301, badge: "Bestseller" },
  { id: 20, name: "Coffee Mug", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9OwfdsOAE59WI3B8RezJs5xyqw2l9Ve4eY2r36Qdsg&s=10'], slug: "coffee-mug", price: 999, salePrice: 699, rating: 4, reviewsCount: 71, badge: "New" },
  { id: 21, name: "Travel Suitcase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEKMr7N4itbA-CIgZXtdOAJy2HVnCIrwbQ3vBz10_Qvw&s=10'], slug: "travel-suitcase", price: 9999, salePrice: 7499, rating: 5, reviewsCount: 211, badge: "Hot Deal" },
  { id: 22, name: "Mini Projector", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCSfa9ASTPmjP2UWRefBCe9g2kZW5RiYziSIEpEDDKg&s=10'], slug: "mini-projector", price: 15999, salePrice: 12499, rating: 5, reviewsCount: 124, badge: "Sale" },
  { id: 23, name: "Office Chair", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuZM4u34Rmxk4zkJjf2LtE2OIHn-xdAmMpjdLUhaVF5w&s=10'], slug: "office-chair", price: 18999, salePrice: 14999, rating: 4, reviewsCount: 184, badge: "Bestseller" },
  { id: 24, name: "Ceramic Flower Vase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZhqtt1O_havNKDS2p35DDV8z-L4QiMK0cZyOj-oJCg&s'], slug: "ceramic-flower-vase", price: 2999, salePrice: 1999, rating: 4, reviewsCount: 69, badge: "New" },
  { id: 25, name: "Digital Alarm Clock", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjAgzOtxeTKXzUyOdod87WG-w5i9egYVdQ8t9WjBT7g&s=10'], slug: "digital-alarm-clock", price: 3499, salePrice: 2499, rating: 5, reviewsCount: 111, badge: "Hot Deal" },
  { id: 26, name: "Samsung Galaxy Buds FE", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFCTBCJS2E1Pi38Hkdm50g7x9Iu7znLBTKWE9omrc9aw&s=10'], slug: "samsung-galaxy-buds-fe", price: 15999, salePrice: 12999, rating: 5, reviewsCount: 254, badge: "Hot Deal" },
  { id: 27, name: "Lenovo Wireless Keyboard", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLcfNoQRkguqI22FVpTxZT9DR-VG6nsDFsAMAlW_1IDg&s=10'], slug: "lenovo-wireless-keyboard", price: 6999, salePrice: 5299, rating: 4, reviewsCount: 147, badge: "Sale" },
  { id: 28, name: "Dell Laptop 15.6 Inch", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4F8gwq3nZe1_uCzJ5_lFIjw_RPpd-FSumysu84bzODg&s=10'], slug: "dell-laptop-sleeve-15-6-inch", price: 3499, salePrice: 2499, rating: 5, reviewsCount: 83, badge: "New" },
  { id: 29, name: "Nike Sports Cap", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4F8gwq3nZe1_uCzJ5_lFIjw_RPpd-FSumysu84bzODg&s=10'], slug: "nike-sports-cap", price: 1999, salePrice: 1399, rating: 4, reviewsCount: 176, badge: "Bestseller" },
  { id: 30, name: "Portable Bluetooth Speaker", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUs4keO8Nmz858DWOBuSrrggEn1GvGHKTIXlPKbU8ZrA&s=10'], slug: "portable-bluetooth-speaker", price: 7499, salePrice: 5499, rating: 5, reviewsCount: 291, badge: "Hot Deal" },
  { id: 31, name: "Premium Leather Belt", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV70UjHyjNrT6Z-xCWCpc0Azf-Hfq_DgUP-at0iFOCzg&s=10'], slug: "premium-leather-belt", price: 1799, salePrice: 1199, rating: 4, reviewsCount: 98, badge: "Sale" },
  { id: 32, name: "Gaming Mouse Pad XL", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTLroARyicxMbr1nk6eAvjBJ5bH7yP1U48tjv-QqxJg&s=10'], slug: "gaming-mouse-pad-xl", price: 1499, salePrice: 999, rating: 5, reviewsCount: 212, badge: "New" },
  { id: 33, name: "Canon DSLR Camera Bag", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE79RjEy09JjFrKDwzwVMDOt8fxaC8_qDINZ90uWlXNw&s=10'], slug: "canon-dslr-camera-bag", price: 4999, salePrice: 3699, rating: 5, reviewsCount: 167, badge: "Hot Deal" },
  { id: 34, name: "Ceramic Coffee Mug Set", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU7fVJT0F4fCnSqUKwYhRt6u7Hn2NEBV46-9zZP_sbug&s=10'], slug: "ceramic-coffee-mug-set", price: 2299, salePrice: 1699, rating: 4, reviewsCount: 63, badge: "Bestseller" },
  { id: 35, name: "Adjustable Laptop Stand", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgzEvGGo8RFvm-NCo9PZspHaLAmLGQYWFVx5ibaHhUQ&s=10'], slug: "adjustable-laptop-stand", price: 3999, salePrice: 2899, rating: 5, reviewsCount: 231, badge: "Sale" },
  { id: 36, name: "Hair Straightener Brush", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0M28EpF1fU073saQ-sQaYzOlp6aWN52dVvPss10SIwg&s'], slug: "hair-straightener-brush", price: 5499, salePrice: 3999, rating: 4, reviewsCount: 109, badge: "New" },
  { id: 37, name: "Travel Duffel Bag", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5r1CaueN3PXh-BuQYhurC6IsRKN8YTchqpyYpO6brUQ&s=10'], slug: "travel-duffel-bag", price: 4599, salePrice: 3299, rating: 5, reviewsCount: 194, badge: "Hot Deal" },
  { id: 38, name: "Steel Bottle", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExOsEZaHge5FMq4e1BlKXlJmAHXIw-ce5L9-cqibB0w&s=10'], slug: "steel-bottle", price: 1999, salePrice: 1399, rating: 4, reviewsCount: 88, badge: "Bestseller" },
  { id: 39, name: "Xiaomi Redmi 12 8GB RAM", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrZyoOboMuec75cf0Lvk55n5BbyZkD8TCzFy_8Mn1HA&s=10'], slug: "xiaomi-redmi-12-8gb-ram", price: 42999, salePrice: 34999, rating: 5, reviewsCount: 1234, badge: "Hot Deal" },
  { id: 40, name: "Realme C53 6GB RAM", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQolwKpojKkkg72txBB6Uh2LxxabqZicpEmg45SpPQIPw&s=10'], slug: "realme-c53-6gb-ram", price: 35999, salePrice: 29999, rating: 4, reviewsCount: 876, badge: "Sale" },
  { id: 41, name: "Fitness Dumbbells Set", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5aEQu-j1Je-tVEsJI4T153xzostRzkGqlJvCI4hZBa0GGsDGel6B2TvI&s=10'], slug: "fitness-dumbbells-set", price: 6999, salePrice: 4999, rating: 5, reviewsCount: 155, badge: "Bestseller" },
  { id: 42, name: "Leather Wallet", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUGwpzfjTinmhExXomFG-drNwl0bbOxW1ohx3dEJjNNw&s=10'], slug: "leather-wallet", price: 2499, salePrice: 1599, rating: 5, reviewsCount: 87, badge: "Sale" },
  { id: 43, name: "iPhone 15 Case", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzG-5PVSs7enUKLvbBXVKPUasiR1OEJv5btWClMFacFA&s=10'], slug: "iphone-15-case", price: 1499, salePrice: 899, rating: 4, reviewsCount: 132, badge: "New" },
  { id: 44, name: "Premium Hoodie", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_nMWCKQoL7xV7qg0rILoLr_RVy3LMuTe2qJyudaKMQ&s=10'], slug: "premium-hoodie", price: 4999, salePrice: 3499, rating: 5, reviewsCount: 142, badge: "Hot Deal" },
  { id: 45, name: "Wireless Power Bank", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJogWihTsZv2XG4xGb-7J9ogksm-Cr4Ak7i_tjqC-evA&s=10'], slug: "wireless-power-bank", price: 5999, salePrice: 4199, rating: 5, reviewsCount: 236, badge: "Sale" },
  { id: 46, name: "Gaming Headset", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ks6lbrMcRoI-H6lJbmpdWvG74nfNNg0kcL2fyjTBKQ&s=10'], slug: "gaming-headset", price: 8999, salePrice: 6799, rating: 5, reviewsCount: 301, badge: "Bestseller" },
  { id: 47, name: "Coffee Mug", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9OwfdsOAE59WI3B8RezJs5xyqw2l9Ve4eY2r36Qdsg&s=10'], slug: "coffee-mug", price: 999, salePrice: 699, rating: 4, reviewsCount: 71, badge: "New" },
  { id: 48, name: "Travel Suitcase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEKMr7N4itbA-CIgZXtdOAJy2HVnCIrwbQ3vBz10_Qvw&s=10'], slug: "travel-suitcase", price: 9999, salePrice: 7499, rating: 5, reviewsCount: 211, badge: "Hot Deal" },
  { id: 49, name: "Mini Projector", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCSfa9ASTPmjP2UWRefBCe9g2kZW5RiYziSIEpEDDKg&s=10'], slug: "mini-projector", price: 15999, salePrice: 12499, rating: 5, reviewsCount: 124, badge: "Sale" },
  { id: 50, name: "Office Chair", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuZM4u34Rmxk4zkJjf2LtE2OIHn-xdAmMpjdLUhaVF5w&s=10'], slug: "office-chair", price: 18999, salePrice: 14999, rating: 4, reviewsCount: 184, badge: "Bestseller" },
  { id: 51, name: "Ceramic Flower Vase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZhqtt1O_havNKDS2p35DDV8z-L4QiMK0cZyOj-oJCg&s'], slug: "ceramic-flower-vase", price: 2999, salePrice: 1999, rating: 4, reviewsCount: 69, badge: "New" },
  { id: 52, name: "Digital Alarm Clock", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjAgzOtxeTKXzUyOdod87WG-w5i9egYVdQ8t9WjBT7g&s=10'], slug: "digital-alarm-clock", price: 3499, salePrice: 2499, rating: 5, reviewsCount: 111, badge: "Hot Deal" },
  { id: 53, name: "iPhone 15 Case", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzG-5PVSs7enUKLvbBXVKPUasiR1OEJv5btWClMFacFA&s=10'], slug: "iphone-15-case", price: 1499, salePrice: 899, rating: 4, reviewsCount: 132, badge: "New" },
  { id: 54, name: "Premium Hoodie", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_nMWCKQoL7xV7qg0rILoLr_RVy3LMuTe2qJyudaKMQ&s=10'], slug: "premium-hoodie", price: 4999, salePrice: 3499, rating: 5, reviewsCount: 142, badge: "Hot Deal" },
  { id: 55, name: "Wireless Power Bank", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJogWihTsZv2XG4xGb-7J9ogksm-Cr4Ak7i_tjqC-evA&s=10'], slug: "wireless-power-bank", price: 5999, salePrice: 4199, rating: 5, reviewsCount: 236, badge: "Sale" },
  { id: 56, name: "Gaming Headset", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ks6lbrMcRoI-H6lJbmpdWvG74nfNNg0kcL2fyjTBKQ&s=10'], slug: "gaming-headset", price: 8999, salePrice: 6799, rating: 5, reviewsCount: 301, badge: "Bestseller" },
  { id: 57, name: "Coffee Mug", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9OwfdsOAE59WI3B8RezJs5xyqw2l9Ve4eY2r36Qdsg&s=10'], slug: "coffee-mug", price: 999, salePrice: 699, rating: 4, reviewsCount: 71, badge: "New" },
  { id: 58, name: "Travel Suitcase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEKMr7N4itbA-CIgZXtdOAJy2HVnCIrwbQ3vBz10_Qvw&s=10'], slug: "travel-suitcase", price: 9999, salePrice: 7499, rating: 5, reviewsCount: 211, badge: "Hot Deal" },
  { id: 59, name: "Mini Projector", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCSfa9ASTPmjP2UWRefBCe9g2kZW5RiYziSIEpEDDKg&s=10'], slug: "mini-projector", price: 15999, salePrice: 12499, rating: 5, reviewsCount: 124, badge: "Sale" },
  { id: 60, name: "Office Chair", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuZM4u34Rmxk4zkJjf2LtE2OIHn-xdAmMpjdLUhaVF5w&s=10'], slug: "office-chair", price: 18999, salePrice: 14999, rating: 4, reviewsCount: 184, badge: "Bestseller" },
  { id: 61, name: "Ceramic Flower Vase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZhqtt1O_havNKDS2p35DDV8z-L4QiMK0cZyOj-oJCg&s'], slug: "ceramic-flower-vase", price: 2999, salePrice: 1999, rating: 4, reviewsCount: 69, badge: "New" },
  { id: 62, name: "Digital Alarm Clock", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjAgzOtxeTKXzUyOdod87WG-w5i9egYVdQ8t9WjBT7g&s=10'], slug: "digital-alarm-clock", price: 3499, salePrice: 2499, rating: 5, reviewsCount: 111, badge: "Hot Deal" },
  { id: 63, name: "iPhone 15 Case", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzG-5PVSs7enUKLvbBXVKPUasiR1OEJv5btWClMFacFA&s=10'], slug: "iphone-15-case", price: 1499, salePrice: 899, rating: 4, reviewsCount: 132, badge: "New" },
  { id: 64, name: "Premium Hoodie", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_nMWCKQoL7xV7qg0rILoLr_RVy3LMuTe2qJyudaKMQ&s=10'], slug: "premium-hoodie", price: 4999, salePrice: 3499, rating: 5, reviewsCount: 142, badge: "Hot Deal" },
  { id: 65, name: "Wireless Power Bank", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJogWihTsZv2XG4xGb-7J9ogksm-Cr4Ak7i_tjqC-evA&s=10'], slug: "wireless-power-bank", price: 5999, salePrice: 4199, rating: 5, reviewsCount: 236, badge: "Sale" },
  { id: 66, name: "Gaming Headset", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ks6lbrMcRoI-H6lJbmpdWvG74nfNNg0kcL2fyjTBKQ&s=10'], slug: "gaming-headset", price: 8999, salePrice: 6799, rating: 5, reviewsCount: 301, badge: "Bestseller" },
  { id: 67, name: "Coffee Mug", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9OwfdsOAE59WI3B8RezJs5xyqw2l9Ve4eY2r36Qdsg&s=10'], slug: "coffee-mug", price: 999, salePrice: 699, rating: 4, reviewsCount: 71, badge: "New" },
  { id: 68, name: "Travel Suitcase", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEKMr7N4itbA-CIgZXtdOAJy2HVnCIrwbQ3vBz10_Qvw&s=10'], slug: "travel-suitcase", price: 9999, salePrice: 7499, rating: 5, reviewsCount: 211, badge: "Hot Deal" },
  { id: 69, name: "Mini Projector", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCSfa9ASTPmjP2UWRefBCe9g2kZW5RiYziSIEpEDDKg&s=10'], slug: "mini-projector", price: 15999, salePrice: 12499, rating: 5, reviewsCount: 124, badge: "Sale" },
  { id: 70, name: "Office Chair", images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuZM4u34Rmxk4zkJjf2LtE2OIHn-xdAmMpjdLUhaVF5w&s=10'], slug: "office-chair", price: 18999, salePrice: 14999, rating: 4, reviewsCount: 184, badge: "Bestseller" },
]