import { useState } from 'react'
import './Home.css'

// ── Inline SVG icons ──────────────────────────────────────────────

const BoltLogo = () => (
  <svg viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bolt">
    <path d="M0 27.2h8.96V34H0zM0 13.6h8.96v6.8H0zM0 0h8.96v6.8H0zM11.2 0h8.96v34H11.2zM22.4 27.2h8.96V34H22.4zM33.6 0h8.96v34H33.6zM44.8 0h17.92v6.8H44.8zM44.8 13.6h8.96v6.8H44.8zM44.8 27.2h17.92V34H44.8zM67.2 0H76v34h-8.8zM78.4 0h26.88v6.8H78.4zM78.4 27.2h26.88V34H78.4zM78.4 13.6h8.96v6.8H78.4zM96.32 13.6H105.28v6.8H96.32zM107.52 0h12.48v34h-12.48z" fill="#fff"/>
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="7" width="10" height="8" rx="1.5" fill="currentColor"/>
    <path d="M3 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
)

// Status bar icons
const SignalIcon = () => (
  <svg className="status-icon" width="20" height="12" viewBox="0 0 20 12">
    <rect x="0"  y="8"  width="3" height="4" rx="0.5"/>
    <rect x="4"  y="5"  width="3" height="7" rx="0.5"/>
    <rect x="8"  y="3"  width="3" height="9" rx="0.5"/>
    <rect x="12" y="0"  width="3" height="12" rx="0.5"/>
    <rect x="16" y="0"  width="4" height="12" rx="0.5" opacity="0.3"/>
  </svg>
)

const WifiIcon = () => (
  <svg className="status-icon" width="17" height="12" viewBox="0 0 17 12">
    <path d="M8.5 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
    <path d="M4.5 6.8A5.6 5.6 0 0 1 8.5 5a5.6 5.6 0 0 1 4 1.8" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M1.5 3.8A9.5 9.5 0 0 1 8.5 1a9.5 9.5 0 0 1 7 2.8" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const BatteryIcon = () => (
  <svg className="status-icon" width="25" height="12" viewBox="0 0 25 12">
    <rect x="0" y="1" width="21" height="10" rx="2" stroke="#fff" strokeWidth="1.2" fill="none"/>
    <rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="#fff"/>
    <path d="M22.5 4.5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Feature grid icons
const CardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3"/>
    <path d="M2 10h20"/>
    <path d="M6 15h4"/>
  </svg>
)
const TransferIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M15 6l6 6-6 6"/>
    <path d="M19 12H5M9 18l-6-6 6-6"/>
  </svg>
)
const CryptoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
)
const FinanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)
const InvestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
)
const ShopAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <path d="M12 9l2 2 4-4"/>
  </svg>
)
const TrackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
)
const RewardsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const GamingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="4"/>
    <path d="M6 12h4M8 10v4M15 12h2M17 10v4"/>
  </svg>
)
const CreditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────

const TABS = ['Cash', 'Crypto', 'Rewards', 'Invest']

const GRID_ITEMS = [
  { Icon: CardIcon,     label: 'Cards/Bank',   locked: true  },
  { Icon: TransferIcon, label: 'Send/Receive',  locked: true  },
  { Icon: CryptoIcon,   label: 'Crypto',        locked: true  },
  { Icon: FinanceIcon,  label: 'Finance',       locked: true  },
  { Icon: InvestIcon,   label: 'Invest',        locked: true  },
  { Icon: ShopAIIcon,   label: 'Shop AI',       locked: false },
  { Icon: TrackIcon,    label: 'Track Orders',  locked: false },
  { Icon: RewardsIcon,  label: 'Rewards',       locked: true  },
  { Icon: GamingIcon,   label: 'Play & Earn',   locked: true  },
  { Icon: CreditIcon,   label: 'Credit Score',  locked: false },
]

// ── Sub-components ────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-bar-time">9:41</span>
      <div className="status-bar-icons">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

function GridItem({ Icon, label, locked }) {
  return (
    <div className="home-grid-item" role="button" tabIndex={0} aria-label={label}>
      <div className="home-grid-icon-wrap">
        <div className="home-grid-icon-btn">
          <Icon />
        </div>
        {locked && (
          <div className="home-lock-badge" aria-label="Coming soon">
            <LockIcon />
          </div>
        )}
      </div>
      <span className="home-grid-label">{label}</span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState('Cash')

  return (
    <div className="home">
      <StatusBar />

      <header className="home-appbar">
        <div className="home-appbar-logo">
          <BoltLogo />
        </div>
        <div className="home-appbar-actions">
          <div className="home-avatar" aria-label="Account: WW">WW</div>
          <button className="home-notif-btn" aria-label="Notifications — 3 unread">
            <BellIcon />
            <span className="home-notif-badge" aria-hidden="true">3</span>
          </button>
        </div>
      </header>

      <nav className="home-tabs" aria-label="Account type">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`home-tab ${tab === activeTab ? 'home-tab-active' : 'home-tab-inactive'}`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={tab === activeTab}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="home-balance-section">
        <div className="home-balance" aria-label="Balance: $0.00">$0.00</div>
      </div>

      <div className="home-content">
        <div className="home-grid">
          {GRID_ITEMS.map(item => (
            <GridItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
