const main = {
  id: 'main',
  label: 'Main',
  simpleMode: true,
  seam: 'dark',

  theme: {
    bgPage:   '#04091a',
    bgCard:   '#151a37',
    bgSubtle: '#252c56',
    bgAvatar: '#363f72',
    accent:   '#ffffff',
    brand:    '#006cff',
    fgDefault:'#ffffff',
    fgMuted:  '#a0a4c0',
  },

  sections: {
    recentOrders:  true,
    boltAssistant: true,
    banner:        true,
    wallet:        true,
    addressBook:   true,
    shopMerchants: true,
  },

  copy: {
    assistantName: 'Bolt Assistant',
    assistantSub:  'Ask me anything',
    assistantCta:  "Let's chat",
    bannerTag:     '15% OFF',
    bannerTitle:   'Natural Aged After Shave',
    bannerSub:     'A timeless scent that captivates every moment',
    bannerPriceOld:'$89.99',
    bannerPriceNew:'$71.99',
    bannerCta:     'Shop now',
    footerText:    'How can we help?',
    footerLink:    'Contact us',
  },

  boltApps: [
    { key: 'money',   label: 'Money',   locked: false },
    { key: 'wallet',  label: 'Wallet',  locked: false },
    { key: 'shop',    label: 'Shop',    locked: false },
    { key: 'orders',  label: 'Orders',  locked: false },
    { key: 'rewards', label: 'Rewards', locked: false },
    { key: 'crypto',  label: 'Crypto',  locked: true  },
    { key: 'trade',   label: 'Trade',   locked: true  },
    { key: 'credit',  label: 'Credit',  locked: true  },
  ],
}

export default main
