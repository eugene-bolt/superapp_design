// Only override what differs from main
const fork101 = {
  id: 'fork-1.0.1',
  label: 'Fork 1.0.1',

  theme: {
    bgPage:   '#04091a',
    bgCard:   '#0f1f1a',
    bgSubtle: '#1a3030',
    bgAvatar: '#1f3d35',
    accent:   '#00e5a0',
    brand:    '#00c47a',
    fgDefault:'#ffffff',
    fgMuted:  '#8ab5a8',
  },

  sections: {
    recentOrders:  true,
    boltAssistant: false,
    banner:        true,
    wallet:        true,
    addressBook:   false,
    shopMerchants: true,
  },

  copy: {
    bannerTag:     '20% OFF',
    bannerTitle:   'Premium Running Shoes',
    bannerSub:     'Built for speed, made to last',
    bannerPriceOld:'$149.99',
    bannerPriceNew:'$119.99',
    bannerCta:     'Shop now',
    footerText:    'Need help?',
    footerLink:    'Get support',
  },

  boltApps: [
    { key: 'orders',   label: 'Orders',      locked: false },
    { key: 'spending', label: 'Spending',     locked: false },
    { key: 'cards',    label: 'Cards/Bank',   locked: false },
    { key: 'transfer', label: 'Send/Receive', locked: false },
    { key: 'crypto',   label: 'Crypto',       locked: true  },
    { key: 'trading',  label: 'Trading',      locked: true  },
    { key: 'rewards',  label: 'Rewards',      locked: false },
    { key: 'credit',   label: 'Credit Score', locked: true  },
    { key: 'gaming',   label: 'Play & Earn',  locked: true  },
  ],
}

export default fork101
