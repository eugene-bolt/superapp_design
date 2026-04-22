import { useState } from 'react'
import './Home.css'

// ── Figma asset URLs (Thunder DS icons — valid 7 days from fetch) ──
const ASSETS = {
  logo:       'https://www.figma.com/api/mcp/asset/a21964aa-f3ae-4a8e-9543-06c6e7ea4817',
  notif:      'https://www.figma.com/api/mcp/asset/c37be9c8-a1d0-43c6-9887-f04974eeb248',
  lock:       'https://www.figma.com/api/mcp/asset/f06d1280-223a-459d-bc83-6373e02da183',
  card:       'https://www.figma.com/api/mcp/asset/ddd6e6a4-8348-4a5f-b5b4-2907f0757de7',
  transfer:   'https://www.figma.com/api/mcp/asset/0978564b-d33c-4788-b9ca-6697048dda23',
  crypto:     'https://www.figma.com/api/mcp/asset/fb6e2de6-e67b-4b73-8227-723b5261c38d',
  finance:    'https://www.figma.com/api/mcp/asset/aad64318-4822-4049-bf66-9f5205271c56',
  invest:     'https://www.figma.com/api/mcp/asset/766f2416-8ddd-405f-b266-2fc1767b77f6',
  shopAi:     'https://www.figma.com/api/mcp/asset/9a1fe82c-a62f-478d-97bf-bb0178cc3095',
  track:      'https://www.figma.com/api/mcp/asset/f9906983-ce07-4e16-9574-2076a699602b',
  rewards:    'https://www.figma.com/api/mcp/asset/d7d1af02-8d84-4fe7-9b31-f5c48baf1667',
  gaming:     'https://www.figma.com/api/mcp/asset/6adcb793-e59d-4f52-9e22-35d206cdf542',
  credit:     'https://www.figma.com/api/mcp/asset/931bf710-a29d-477b-8bf6-8402d620ee66',
}

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
