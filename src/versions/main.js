const main = {
  id: 'main',
  label: 'Main',

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
    { key: 'orders',      label: 'Orders',       locked: false },
    { key: 'spending',    label: 'Spending',      locked: false },
    { key: 'cards',       label: 'Cards/Bank',    locked: true  },
    { key: 'transfer',    label: 'Send/Receive',  locked: true  },
    { key: 'crypto',      label: 'Crypto',        locked: true  },
    { key: 'trading',     label: 'Trading',       locked: true  },
    { key: 'rewards',     label: 'Rewards',       locked: true  },
    { key: 'credit',      label: 'Credit Score',  locked: true  },
    { key: 'gaming',      label: 'Play & Earn',   locked: true  },
  ],
}

export default main
