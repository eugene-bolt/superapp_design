import { useState } from 'react'
import './Home.css'

// ── Figma asset URLs (Thunder DS icons — valid 7 days from fetch) ──
const ASSETS = {
  logo:       'https://www.figma.com/api/mcp/asset/8501dae4-e0b6-4700-81cd-098c64724b60',
  notif:      'https://www.figma.com/api/mcp/asset/8b0f1e2a-f6f8-4d06-8346-07150822f4d9',
  lock:       'https://www.figma.com/api/mcp/asset/b92bc282-2751-4778-b1a0-93efbb3a06cb',
  card:       'https://www.figma.com/api/mcp/asset/d080f33c-11bf-4679-b46b-f29cca4aeb49',
  transfer:   'https://www.figma.com/api/mcp/asset/a3987647-84fe-4304-8390-c3871f8dd233',
  crypto:     'https://www.figma.com/api/mcp/asset/8aa4da6a-21db-4e35-98ad-d7b1cea33195',
  finance:    'https://www.figma.com/api/mcp/asset/bed344f6-c7a0-4a80-8fc4-b28441c15b6e',
  invest:     'https://www.figma.com/api/mcp/asset/fd556da4-cbca-4af1-b2fc-b2542a093a23',
  shopAi:     'https://www.figma.com/api/mcp/asset/6606db07-173a-4bf4-a89a-d1084f5f5310',
  track:      'https://www.figma.com/api/mcp/asset/68b0b7d6-b8c3-4f6c-8227-c193f9c2170f',
  rewards:    'https://www.figma.com/api/mcp/asset/ba5b5a43-70e1-4285-b843-2ba2bccfd7b9',
  gaming:     'https://www.figma.com/api/mcp/asset/fae89818-73f5-4bca-af11-d8076c832389',
  credit:     'https://www.figma.com/api/mcp/asset/8f928a79-a849-4913-a615-45b2cf15fddc',
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
