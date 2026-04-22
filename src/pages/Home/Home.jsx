import { useState } from 'react'
import './Home.css'

// Figma asset URLs (valid for 7 days)
const imgNetworkSignal = 'https://www.figma.com/api/mcp/asset/fc8cec57-dbbb-45f5-9914-9073017a2bf7'
const imgWifi          = 'https://www.figma.com/api/mcp/asset/731b5dc3-1880-4f94-aa64-0f723be2325c'
const imgBattery       = 'https://www.figma.com/api/mcp/asset/9c6a04d6-36d5-4e0d-aa0f-34ce4e425dd5'
const imgBoltLogo      = 'https://www.figma.com/api/mcp/asset/06aa66a6-eb3b-4c82-851a-50671deeba1f'
const imgNotifIcon     = 'https://www.figma.com/api/mcp/asset/cf00b7f8-e5fe-4bbe-be6c-1be5e986daac'
const imgLockIcon      = 'https://www.figma.com/api/mcp/asset/911b9d78-3a85-402f-8770-dda4b92d44af'

const icons = {
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

const TABS = ['Cash', 'Crypto', 'Rewards', 'Invest']

const GRID_ITEMS = [
  { icon: icons.card,     label: 'Cards/Bank',   locked: true  },
  { icon: icons.transfer, label: 'Send/Receive',  locked: true  },
  { icon: icons.crypto,   label: 'Crypto',        locked: true  },
  { icon: icons.finance,  label: 'Finance',       locked: true  },
  { icon: icons.invest,   label: 'Invest',        locked: true  },
  { icon: icons.shopAi,   label: 'Shop AI',       locked: false },
  { icon: icons.track,    label: 'Track Orders',  locked: false },
  { icon: icons.rewards,  label: 'Rewards',       locked: true  },
  { icon: icons.gaming,   label: 'Play & Earn',   locked: true  },
  { icon: icons.credit,   label: 'Credit Score',  locked: false },
]

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-bar-time">9:41</span>
      <div className="status-bar-icons">
        <img src={imgNetworkSignal} alt="Signal" />
        <img src={imgWifi} alt="WiFi" />
        <img src={imgBattery} alt="Battery" />
      </div>
    </div>
  )
}

function GridItem({ icon, label, locked }) {
  return (
    <div className="home-grid-item">
      <div className="home-grid-icon-wrap">
        <div className="home-grid-icon-btn">
          <img src={icon} alt={label} />
        </div>
        {locked && (
          <div className="home-lock-badge" aria-label="Coming soon">
            <img src={imgLockIcon} alt="" />
          </div>
        )}
      </div>
      <span className="home-grid-label">{label}</span>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('Cash')

  return (
    <div className="home">
      <StatusBar />

      {/* App Bar */}
      <header className="home-appbar">
        <div className="home-appbar-logo">
          <img src={imgBoltLogo} alt="Bolt" />
        </div>
        <div className="home-appbar-actions">
          <div className="home-avatar" aria-label="WW">WW</div>
          <button className="home-notif-btn" aria-label="Notifications, 3 unread">
            <img src={imgNotifIcon} alt="" />
            <span className="home-notif-badge" aria-hidden="true">3</span>
          </button>
        </div>
      </header>

      {/* Tab Toggle */}
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

      {/* Balance */}
      <div className="home-balance-section">
        <div className="home-balance">$0.00</div>
      </div>

      {/* Icon Grid — bottom aligned */}
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
