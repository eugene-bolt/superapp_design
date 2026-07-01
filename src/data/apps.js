export const APPS = [
  { key: 'money',     label: 'Money',        desc: 'Manage accounts, cards, and transfers.',   color: '#2d8a27' },
  { key: 'wallet',    label: 'Wallet',       desc: 'Store passes, IDs, and gift cards.',       color: '#92600f' },
  { key: 'crypto',    label: 'Crypto',       desc: 'Buy, sell, and track digital assets.',     color: '#7b2fbe' },
  { key: 'trade',     label: 'Trade',        desc: 'Grow your wealth with smart investing.',   color: '#2563eb' },
  { key: 'shop',      label: 'Shop',         desc: 'Browse stores and manage orders.',         color: '#dc2626' },
  { key: 'play',      label: 'Play',         desc: 'Discover games and earn rewards.',         color: '#d97706' },
  { key: 'insurance', label: 'Insurance',    desc: 'View coverage and manage claims.',         color: '#166534' },
  { key: 'credit',    label: 'Credit score', desc: 'Monitor and improve your credit.',         color: '#be185d' },
  { key: 'bills',     label: 'Bills',        desc: 'Pay bills and manage subscriptions.',      color: '#ea580c' },
  { key: 'rewards',   label: 'Rewards',      desc: 'Earn points and redeem perks.',            color: '#2563eb' },
  { key: 'rideshare', label: 'Rideshare',    desc: 'Book rides and track trips.',              color: '#16a34a' },
  { key: 'dining',    label: 'Dining',       desc: 'Order food and discover restaurants.',     color: '#0f766e' },
  { key: 'travel',    label: 'Travel',       desc: 'Book flights, hotels, and trips.',         color: '#0891b2' },
  { key: 'tickets',   label: 'Tickets',      desc: 'Get tickets for events and shows.',        color: '#a21caf' },
  { key: 'deals',     label: 'Deals',        desc: 'Find discounts, offers, and cashback.',    color: '#2563eb' },
  { key: 'orders',    label: 'Orders',       desc: 'Track packages and deliveries.',           color: '#6d28d9' },
]

export const APP_MAP = Object.fromEntries(APPS.map(a => [a.key, a]))
export const ALL_KEYS = APPS.map(a => a.key)
