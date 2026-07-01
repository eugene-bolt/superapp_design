const northStar = {
  id: 'north-star',
  label: 'North Star',
  simpleMode: false,
  seam: 'dark',

  theme: {
    bgPage:   '#04091a',
    bgCard:   '#151a37',
    bgSubtle: '#252c56',
    bgAvatar: '#363f72',
    accent:   '#33ccff',
    brand:    '#006cff',
    fgDefault:'#ffffff',
    fgMuted:  '#a0a4c0',
  },

  sections: {
    recentOrders: true,
    boltAssistant: true,
    banner: true,
    wallet: true,
    addressBook: true,
    shopMerchants: true,
  },

  copy: {
    assistantName: 'Bolt Assistant',
    assistantSub:  'Ask me anything',
    assistantCta:  "Let's chat",
    bannerTag:     '15% OFF',
    bannerTitle:   'Natural Aged After Shave',
    bannerSub:     'A timeless scent for the modern man',
    bannerPriceOld:'$89.99',
    bannerPriceNew:'$71.99',
    bannerCta:     'Shop now',
    footerText:    'How can we help?',
    footerLink:    'Contact us',
  },

  boltApps: [
    { key: 'money',     label: 'Money',        locked: false, color: '#2d8a27' },
    { key: 'wallet',    label: 'Wallet',       locked: false, color: '#92600f' },
    { key: 'crypto',    label: 'Crypto',       locked: true,  color: '#7b2fbe' },
    { key: 'trade',     label: 'Trade',        locked: true,  color: '#2563eb' },
    { key: 'shop',      label: 'Shop',         locked: true,  color: '#dc2626' },
    { key: 'play',      label: 'Play',         locked: true,  color: '#d97706' },
    { key: 'insurance', label: 'Insurance',    locked: true,  color: '#166534' },
    { key: 'credit',    label: 'Credit score', locked: true,  color: '#be185d' },
    { key: 'bills',     label: 'Bills',        locked: true,  color: '#ea580c' },
    { key: 'rewards',   label: 'Rewards',      locked: true,  color: '#2563eb' },
    { key: 'rideshare', label: 'Rideshare',    locked: true,  color: '#16a34a' },
    { key: 'dining',    label: 'Dining',       locked: true,  color: '#0f766e' },
    { key: 'travel',    label: 'Travel',       locked: true,  color: '#0891b2' },
    { key: 'tickets',   label: 'Tickets',      locked: true,  color: '#a21caf' },
    { key: 'deals',     label: 'Deals',        locked: true,  color: '#2563eb' },
    { key: 'orders',    label: 'Orders',       locked: true,  color: '#6d28d9' },
  ],
}

export default northStar
