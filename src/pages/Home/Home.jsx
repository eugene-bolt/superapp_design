import { useState } from 'react'
import './Home.css'

// ── Figma asset URLs (Thunder DS icons — valid 7 days from fetch) ──
const ASSETS = {
  logo:       'https://www.figma.com/api/mcp/asset/06aa66a6-eb3b-4c82-851a-50671deeba1f',
  notif:      'https://www.figma.com/api/mcp/asset/cf00b7f8-e5fe-4bbe-be6c-1be5e986daac',
  lock:       'https://www.figma.com/api/mcp/asset/911b9d78-3a85-402f-8770-dda4b92d44af',
  card:       'https://www.figma.com/api/mcp/asset/1fe49aff-bd20-4659-9157-155f5f801891',
  transfer:   'https://www.figma.com/api/mcp/asset/42c0fa06-8b4a-47d0-b207-3a7feefafa03',
  crypto:     'https://www.figma.com/api/mcp/asset/7b8e7711-f390-4239-ac88-aa2d47490844',
  finance:    'https://www.figma.com/api/mcp/asset/8cc1447d-a41c-4c81-bef7-d9e3ac8afb43',
  invest:     'https://www.figma.com/api/mcp/asset/d3817bd6-579e-4794-8375-9067bee19741',
  shopAi:     'https://www.figma.com/api/mcp/asset/d1294bcb-b386-485c-aa77-6fea415076a7',
  track:      'https://www.figma.com/api/mcp/asset/173e6ca7-4bab-4d75-8714-7bf82ddbe581',
  rewards:    'https://www.figma.com/api/mcp/asset/ee0493f1-2dfd-4559-9f95-b8e5a6d0c99c',
  gaming:     'https://www.figma.com/api/mcp/asset/4b85e40a-f257-4e29-b740-32f7f9e77a5d',
  credit:     'https://www.figma.com/api/mcp/asset/b0bfa030-1314-45cf-97b6-762a09733967',
}

// ── Status bar icons (inline SVG — no external dependency) ────────
const SignalIcon = () => (
  <svg className="status-icon" width="20" height="12" viewBox="0 0 20 12" fill="white">
    <rect x="0"  y="8"  width="3" height="4" rx="0.5"/>
    <rect x="4.5"  y="5" width="3" height="7" rx="0.5"/>
    <rect x="9"  y="2"  width="3" height="10" rx="0.5"/>
    <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
    <rect x="17" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
  </svg>
)

const WifiIcon = () => (
  <svg className="status-icon" width="17" height="12" viewBox="0 0 17 12" fill="none">
    <circle cx="8.5" cy="11" r="1.5" fill="white"/>
    <path d="M5 7.5A5 5 0 0 1 8.5 6a5 5 0 0 1 3.5 1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M2 4A9 9 0 0 1 8.5 1.5 9 9 0 0 1 15 4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const BatteryIcon = () => (
  <svg className="status-icon" width="25" height="12" viewBox="0 0 25 12" fill="none">
    <rect x="0.6" y="1.6" width="20.5" height="8.8" rx="2.2" stroke="white" strokeWidth="1.2"/>
    <rect x="2" y="3" width="15" height="6" rx="1" fill="white"/>
    <path d="M22.5 4.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────
const TABS = ['Cash', 'Crypto', 'Rewards', 'Invest']

const GRID_ITEMS = [
  { icon: ASSETS.card,     label: 'Cards/Bank',   locked: true  },
  { icon: ASSETS.transfer, label: 'Send/Receive',  locked: true  },
  { icon: ASSETS.crypto,   label: 'Crypto',        locked: true  },
  { icon: ASSETS.finance,  label: 'Finance',       locked: true  },
  { icon: ASSETS.invest,   label: 'Invest',        locked: true  },
  { icon: ASSETS.shopAi,   label: 'Shop AI',       locked: false },
  { icon: ASSETS.track,    label: 'Track Orders',  locked: false },
  { icon: ASSETS.rewards,  label: 'Rewards',       locked: true  },
  { icon: ASSETS.gaming,   label: 'Play & Earn',   locked: true  },
  { icon: ASSETS.credit,   label: 'Credit Score',  locked: false },
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

function GridItem({ icon, label, locked }) {
  return (
    <div className="home-grid-item" role="button" tabIndex={0} aria-label={label}>
      <div className="home-grid-icon-wrap">
        <div className="home-grid-icon-btn">
          <img src={icon} alt="" width="24" height="24" />
        </div>
        {locked && (
          <div className="home-lock-badge" aria-label="Coming soon">
            <img src={ASSETS.lock} alt="" width="8" height="8" />
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
          <img src={ASSETS.logo} alt="Bolt" />
        </div>
        <div className="home-appbar-actions">
          <div className="home-avatar" aria-label="Account: WW">WW</div>
          <button className="home-notif-btn" aria-label="Notifications — 3 unread">
            <img src={ASSETS.notif} alt="" width="20" height="20" />
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
