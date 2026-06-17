import { useState } from 'react'
import './Home.css'
import logoSrc from '../../assets/logo_bolt.svg'
import IconUser from '../../assets/icons/user.svg?react'
import IconBell from '../../assets/icons/bell.svg?react'
import IconPackage from '../../assets/icons/package.svg?react'
import IconChevronRight from '../../assets/icons/chevron-right.svg?react'

// ── Figma asset URLs (expire ~7 days from fetch) ──────────────────
const A = {
  // AppBar icons
  appSwitch:    'https://www.figma.com/api/mcp/asset/d0d8d098-22cf-40dd-ab29-3715ef039718',
  // StatusBar
  time941:      'https://www.figma.com/api/mcp/asset/03cd36ec-63ff-4fb9-84aa-dae608ce33f0',
  network:      'https://www.figma.com/api/mcp/asset/47399ec2-11a6-43ef-8b5d-cc3d5bf9c453',
  wifi:         'https://www.figma.com/api/mcp/asset/9e8978b1-0888-4cb6-9cef-3abe5cea2447',
  battery:      'https://www.figma.com/api/mcp/asset/674e770d-4911-43c0-9aa6-a2328abb213c',
  // Recent Orders
  nikeAvatar:   'https://www.figma.com/api/mcp/asset/581f161d-ff20-4ecc-94d7-1fe0c305cc48',
  // Bolt Assistant
  boltBot:      'https://www.figma.com/api/mcp/asset/6e8c9643-60c0-4b5f-9c2e-f08ae5b2b994',
  // Banner
  ticketIcon:   'https://www.figma.com/api/mcp/asset/f95f2762-19d9-47f4-834f-7f4d6fe0bd34',
  bannerImg:    'https://www.figma.com/api/mcp/asset/f1ef6a9b-e08e-4e44-ada8-79a85a87dab9',
  // Wallet
  boltIcon:     'https://www.figma.com/api/mcp/asset/8c52ae61-a0e4-4f4e-ba28-045c6f4458ae',
  visaLogo:     'https://www.figma.com/api/mcp/asset/90ef79ee-9084-48bf-9673-ed14776f599f',
  mastercardLogo: 'https://www.figma.com/api/mcp/asset/26ab64b2-0bdf-43c3-8f1f-90064b8c2a5e',
  // Shop top merchants
  revolve:      'https://www.figma.com/api/mcp/asset/72b25140-5e7c-494b-9672-7e2c91ad95d8',
  luisaviaroma: 'https://www.figma.com/api/mcp/asset/c88add69-b595-4b9e-948a-bd5dead1482d',
  badgleyMischka: 'https://www.figma.com/api/mcp/asset/b64df6f9-eb38-4b2f-94ad-0a0acc4bf699',
  luckyBrand:   'https://www.figma.com/api/mcp/asset/ffa5f0b1-3239-47a4-9df2-21bce3a66642',
  tadashiShoji: 'https://www.figma.com/api/mcp/asset/1ad25453-3a8d-4990-8a67-8355970d3929',
  headlightsDepot: 'https://www.figma.com/api/mcp/asset/1680629b-e0ba-4dff-ac6c-4bae265e3462',
  aev:          'https://www.figma.com/api/mcp/asset/9151b649-6b4c-4117-a88c-68e7123205ce',
  pureDiesel:   'https://www.figma.com/api/mcp/asset/61e5f5ef-335b-47ae-b27f-264437b77a4f',
  // Bolt apps grid icons
  ordersIcon:   'https://www.figma.com/api/mcp/asset/76d1898c-4e47-4e7f-9fa6-eb1d804eddca',
  spendingIcon: 'https://www.figma.com/api/mcp/asset/0f274834-db9d-498a-8d87-19b24dbfa685',
  cardIcon:     'https://www.figma.com/api/mcp/asset/2599505b-2703-4900-85f6-54c7c6bf9629',
  transferIcon: 'https://www.figma.com/api/mcp/asset/de1180b8-0f17-4e53-977e-14cf74f0308c',
  cryptoIcon:   'https://www.figma.com/api/mcp/asset/25292ad1-cca4-4a7e-a812-df348198996f',
  tradingIcon:  'https://www.figma.com/api/mcp/asset/17da6d2c-9594-470c-9526-39055ce89324',
  rewardsIcon:  'https://www.figma.com/api/mcp/asset/7863b503-2a5a-4e6f-b689-76dc7434863b',
  creditIcon:   'https://www.figma.com/api/mcp/asset/369daa96-643d-4629-ba78-4fa6172e0707',
  gamingIcon:   'https://www.figma.com/api/mcp/asset/a5bc271c-d1fc-46ea-8678-4d6858a65c41',
  lockIcon:     'https://www.figma.com/api/mcp/asset/00ecc4af-1347-4a51-8300-85acf6852609',
}

const BOLT_APPS = [
  { icon: A.ordersIcon,   label: 'Orders',       locked: false },
  { icon: A.spendingIcon, label: 'Spending',      locked: false },
  { icon: A.cardIcon,     label: 'Cards/Bank',    locked: true  },
  { icon: A.transferIcon, label: 'Send/Receive',  locked: true  },
  { icon: A.cryptoIcon,   label: 'Crypto',        locked: true  },
  { icon: A.tradingIcon,  label: 'Trading',       locked: true  },
  { icon: A.rewardsIcon,  label: 'Rewards',       locked: true  },
  { icon: A.creditIcon,   label: 'Credit Score',  locked: true  },
  { icon: A.gamingIcon,   label: 'Play & Earn',   locked: true  },
]

const MERCHANTS = [
  { img: A.revolve,        label: 'Revolve',          bg: '#1a1a2e' },
  { img: A.luisaviaroma,   label: 'Luisaviaroma',     bg: '#000' },
  { img: A.badgleyMischka, label: 'Badgley Mischka',  bg: '#fff' },
  { img: A.luckyBrand,     label: 'Lucky Brand',      bg: '#fff' },
  { img: A.tadashiShoji,   label: 'Tadashi Shoji',    bg: '#010101' },
  { img: A.headlightsDepot,label: 'Headlights Depot', bg: '#fff' },
  { img: A.aev,            label: 'AEV',              bg: '#fff' },
  { img: A.pureDiesel,     label: 'Pure Diesel',      bg: '#000' },
]

// ── Sub-components ────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>
      <div className="status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
          <rect x="9" y="1" width="3" height="11" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.6 10.7 0.5 8 0.5C5.3 0.5 2.8 1.6 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" opacity="0.4"/>
          <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" opacity="0.7"/>
          <circle cx="8" cy="10.5" r="1.5"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.35"/>
          <rect x="1.5" y="2.5" width="16" height="7" rx="1.5" fill="white"/>
          <path d="M22.5 4.5C23.3 4.5 24 5.2 24 6C24 6.8 23.3 7.5 22.5 7.5" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

function Divider() {
  return <div className="divider" />
}

function AppGridItem({ icon, label, locked }) {
  return (
    <div className="app-grid-item">
      <div className="app-grid-icon-wrap">
        <div className="app-grid-icon-btn">
          <img src={icon} alt="" width="24" height="24" />
        </div>
        {locked && (
          <div className="app-grid-lock-badge">
            <img src={A.lockIcon} alt="locked" width="8" height="8" />
          </div>
        )}
      </div>
      <span className="app-grid-label">{label}</span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="home">
      {/* AppBar */}
      <header className="appbar">
        <div className="appbar-leading">
          <button className="icon-btn" aria-label="App switcher" onClick={() => setSheetOpen(true)}>
            <img src={A.appSwitch} alt="" width="20" height="20" />
          </button>
          <img src={logoSrc} alt="Bolt" className="appbar-logo" />
        </div>
        <div className="appbar-trailing">
          <button className="icon-btn" aria-label="Account">
            <IconUser width="20" height="20" className="icon" />
          </button>
          <button className="icon-btn" aria-label="Notifications">
            <IconBell width="20" height="20" className="icon" />
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="scroll-area">

        {/* Recent Orders */}
        <section className="card">
          <div className="section-header">
            <span className="section-title">Recent orders</span>
            <button className="link-btn">View all</button>
          </div>
          <div className="order-list">
            <div className="order-row">
              <div className="avatar avatar-muted">
                <IconPackage width="20" height="20" className="icon" />
              </div>
              <div className="order-info">
                <span className="order-meta">#1230980942iiFedex093408</span>
                <span className="order-status">Preparing your order</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
            <Divider />
            <div className="order-row">
              <div className="avatar avatar-photo">
                <img src={A.nikeAvatar} alt="Nike" width="48" height="48" />
              </div>
              <div className="order-info">
                <span className="order-meta">Nike</span>
                <span className="order-status">Waiting for updates</span>
                <span className="order-desc">Nike Air Force 1 LV8 / MULTI-COLOR</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
          </div>
        </section>

        {/* Bolt Assistant */}
        <section className="card">
          <div className="assistant-row">
            <div className="avatar avatar-muted">
              <img src={A.boltBot} alt="" width="20" height="20" />
            </div>
            <div className="assistant-info">
              <span className="assistant-name">Bolt Assistant</span>
              <span className="assistant-sub">Ask me anything</span>
            </div>
            <button className="pill-btn">Let's chat</button>
          </div>
        </section>

        {/* Banner */}
        <section className="card banner-card">
          <div className="banner-left">
            <div className="tag tag-green">
              <img src={A.ticketIcon} alt="" width="12" height="12" />
              <span>15% OFF</span>
            </div>
            <p className="banner-title">Natural Aged After Shave</p>
            <p className="banner-sub">A timeless scent for the modern man</p>
            <div className="banner-pricing">
              <span className="price-old">$89.99</span>
              <span className="price-new">$71.99</span>
            </div>
            <button className="pill-btn pill-btn-full">Shop now</button>
          </div>
          <div className="banner-right">
            <img src={A.bannerImg} alt="Product" className="banner-img" />
          </div>
        </section>

        {/* Wallet */}
        <section className="card">
          <div className="section-header">
            <span className="section-title">Wallet</span>
            <button className="link-btn">Manage</button>
          </div>
          <div className="wallet-list">
            <div className="wallet-row">
              <div className="avatar avatar-blue">
                <img src={A.boltIcon} alt="" width="20" height="20" />
              </div>
              <div className="wallet-info">
                <span className="wallet-name">Bolt Debit Card</span>
                <span className="wallet-num">•••• 1234</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
            <Divider />
            <div className="wallet-row">
              <div className="avatar avatar-visa">
                <img src={A.visaLogo} alt="Visa" width="32" height="10" />
              </div>
              <div className="wallet-info">
                <span className="wallet-name">Visa</span>
                <span className="wallet-num">•••• 4242</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
            <Divider />
            <div className="wallet-row">
              <div className="avatar avatar-mc">
                <img src={A.mastercardLogo} alt="Mastercard" width="32" height="20" />
              </div>
              <div className="wallet-info">
                <span className="wallet-name">Mastercard</span>
                <span className="wallet-num">•••• 5533</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
          </div>
        </section>

        {/* Address Book */}
        <section className="card">
          <div className="section-header">
            <span className="section-title">Address book</span>
            <button className="link-btn">Manage</button>
          </div>
          <div className="address-list">
            <div className="address-row">
              <div className="address-info">
                <span className="address-main">123 Main Str.</span>
                <span className="address-sub">Chicago, IL 60061</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
            <Divider />
            <div className="address-row">
              <div className="address-info">
                <span className="address-main">540 Madison Ave</span>
                <span className="address-sub">San Francisco, CA 98876</span>
              </div>
              <IconChevronRight width="16" height="16" className="icon chevron" />
            </div>
          </div>
        </section>

        {/* Shop Top Merchants */}
        <section className="card">
          <p className="section-title">Shop top merchants</p>
          <p className="section-subtitle">Browse and shop from our featured partners</p>
          <div className="merchant-grid">
            {MERCHANTS.map(m => (
              <div key={m.label} className="merchant-item">
                <div className="merchant-logo" style={{ background: m.bg }}>
                  <img src={m.img} alt={m.label} width="40" height="40" />
                </div>
                <span className="merchant-label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="pagination-dots">
            <div className="dot dot-active" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </section>

        {/* Footer */}
        <div className="footer">
          <span className="footer-text">How can we help?</span>
          <button className="link-btn">Contact us</button>
        </div>
      </div>

      {/* Bolt Apps Bottom Sheet */}
      {sheetOpen && (
        <div className="overlay" onClick={() => setSheetOpen(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <p className="sheet-title">Bolt apps</p>
            <div className="app-grid">
              {BOLT_APPS.map(app => (
                <AppGridItem key={app.label} {...app} />
              ))}
            </div>
            <button className="close-btn" onClick={() => setSheetOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
