import { useState } from 'react'
import './Home.css'
import logoSrc from '../../assets/logo_bolt.svg'

// ── Figma asset URLs (Thunder DS icons — valid 7 days from fetch) ──
const ASSETS = {
  logo:       logoSrc,
  notif:      'https://www.figma.com/api/mcp/asset/df275c05-e60e-4471-a87f-c3101add8810',
  lock:       'https://www.figma.com/api/mcp/asset/b0385b7c-1f6a-4078-a778-3ca5e24467a2',
  card:       'https://www.figma.com/api/mcp/asset/1aa2977a-2028-4494-bd36-fb7dcc6b6e8f',
  transfer:   'https://www.figma.com/api/mcp/asset/5cac9619-4dcd-4789-891a-aabcc2e28775',
  crypto:     'https://www.figma.com/api/mcp/asset/6ccd22cc-5e27-4b72-9e67-f066ac7e1653',
  finance:    'https://www.figma.com/api/mcp/asset/ec00a816-35e8-4a95-a218-57a9d5baeaca',
  invest:     'https://www.figma.com/api/mcp/asset/34740af1-28d3-4fcf-b391-8adf2f5c0c6c',
  shopAi:     'https://www.figma.com/api/mcp/asset/e0ebd530-f6b1-406e-86e6-4c3732146aaf',
  track:      'https://www.figma.com/api/mcp/asset/ab71bba9-1d6b-44a3-b3d3-6c4a2e4acab9',
  rewards:    'https://www.figma.com/api/mcp/asset/5b189631-ec17-49ae-85cb-d8926f2e14a7',
  gaming:     'https://www.figma.com/api/mcp/asset/3a2f326f-708c-4353-964e-8712695d931b',
  credit:     'https://www.figma.com/api/mcp/asset/6453d0d0-1e04-467f-9f99-3f8ae3d2066a',
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
