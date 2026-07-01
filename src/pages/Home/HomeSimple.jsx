import { useState } from 'react'
import './HomeSimple.css'
import { AppBar, AppBarIconBtn } from '../../design-system/AppBar/AppBar'
import { Button } from '../../design-system/Button/Button'
import { EditWidgets } from './EditWidgets'
import { APP_MAP } from '../../data/apps'
import LogoSvg from '../../assets/logo_bolt.svg?react'
import IconUser from '../../assets/icons/user.svg?react'
import IconBell from '../../assets/icons/bell.svg?react'
import IconBot from '../../assets/icons/bolt_bot.svg?react'
import IconAppSwitch from '../../assets/icons/app-switch.svg?react'
import IconOrders    from '../../assets/icons/bolt_orders.svg?react'
import IconMoney     from '../../assets/icons/bolt_money.svg?react'
import IconWallet    from '../../assets/icons/bolt_wallet.svg?react'
import IconShop      from '../../assets/icons/bolt_shop.svg?react'
import IconRewards   from '../../assets/icons/bolt_rewards.svg?react'
import IconCrypto    from '../../assets/icons/bolt_crypto.svg?react'
import IconTrade     from '../../assets/icons/bolt-trade.svg?react'
import IconCredit    from '../../assets/icons/bolt_credit_score.svg?react'
import IconPlay      from '../../assets/icons/bolt_play.svg?react'
import IconSpending  from '../../assets/icons/bolt_finance.svg?react'
import IconDeals     from '../../assets/icons/bolt_deals.svg?react'
import IconInsurance from '../../assets/icons/bolt_insurance.svg?react'
import IconBills     from '../../assets/icons/bolt_bills.svg?react'
import IconRideshare from '../../assets/icons/bolt_rideshare.svg?react'
import IconDining    from '../../assets/icons/bolt_dining.svg?react'
import IconTravel    from '../../assets/icons/bolt_travel.svg?react'
import IconTickets   from '../../assets/icons/bolt_tickets.svg?react'

const APP_ICONS = {
  money: IconMoney, wallet: IconWallet, shop: IconShop,
  orders: IconOrders, rewards: IconRewards, crypto: IconCrypto,
  trade: IconTrade, credit: IconCredit, play: IconPlay,
  insurance: IconInsurance, bills: IconBills, rideshare: IconRideshare,
  dining: IconDining, travel: IconTravel, tickets: IconTickets, deals: IconDeals,
}

const ORDERS = [
  {
    id: 'ord1',
    trackingNum: '#1230980942IlFedex093408',
    status: 'Preparing your order',
    icon: 'package',
  },
  {
    id: 'ord2',
    store: 'Nike',
    status: 'Waiting for updates',
    subtitle: 'Nike Air Force 1 LV8 / MULTI-COLOR',
    icon: 'shoe',
  },
]

const CARDS = [
  { id: 'c1', label: 'Bolt Debit Card', last4: '1234', brand: 'bolt',       bg: '#1a237e' },
  { id: 'c2', label: 'Visa',            last4: '4242', brand: 'visa',       bg: '#1565c0' },
  { id: 'c3', label: 'Mastercard',      last4: '3411', brand: 'mastercard', bg: '#1a237e' },
  { id: 'c4', label: 'Mastercard',      last4: '3411', brand: 'mastercard', bg: '#263238' },
]

const ADDRESSES = [
  { id: 'a1', line1: '123 Main Str.',   line2: 'Chicago, IL 60061' },
  { id: 'a2', line1: '540 Madison Ave', line2: 'San Francisco, CA 98876' },
]

const MERCHANTS = [
  { id: 'm1', name: 'Revolve' },
  { id: 'm2', name: 'Luisaviaroma' },
  { id: 'm3', name: 'Badgley Mischka' },
  { id: 'm4', name: 'Lucky Brand' },
  { id: 'm5', name: 'Tadashi Shoji' },
  { id: 'm6', name: 'Headlights Depot' },
  { id: 'm7', name: 'AEV' },
  { id: 'm8', name: 'Pure Diesel Power' },
]

function MerchantLogo({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
  return (
    <div className="merchant-logo">
      <span className="merchant-initials">{initials}</span>
    </div>
  )
}

function CardBrand({ brand, last4 }) {
  if (brand === 'bolt') return (
    <div className="card-brand-row">
      <span className="card-brand-bolt">BOLT</span>
      <span className="card-dots">••••{last4}</span>
    </div>
  )
  if (brand === 'visa') return (
    <div className="card-brand-row">
      <span className="card-brand-visa">VISA</span>
      <span className="card-dots">••••{last4}</span>
    </div>
  )
  return (
    <div className="card-brand-row">
      <div className="card-mc-circles">
        <div className="card-mc-circle card-mc-red" />
        <div className="card-mc-circle card-mc-orange" />
      </div>
      <span className="card-dots">••••{last4}</span>
    </div>
  )
}

export default function HomeSimple({ version, onLogout }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const { sections, copy } = version
  const [activeKeys, setActiveKeys] = useState(() => version.boltApps.map(a => a.key))

  return (
    <div className="home-simple">
      <AppBar
        leading={
          <>
            <AppBarIconBtn ariaLabel="App switcher" onClick={() => setSheetOpen(true)}>
              <IconAppSwitch width="20" height="20" />
            </AppBarIconBtn>
            <LogoSvg className="appbar-logo" aria-label="Bolt" />
          </>
        }
        trailing={
          <>
            <AppBarIconBtn ariaLabel="Sign out" onClick={onLogout}>
              <IconUser width="20" height="20" />
            </AppBarIconBtn>
            <AppBarIconBtn ariaLabel="Notifications">
              <IconBell width="20" height="20" />
            </AppBarIconBtn>
          </>
        }
      />

      <div className="hs-scroll">

        {/* Recent orders */}
        {sections.recentOrders && (
          <div className="hs-card">
            <div className="hs-card-header">
              <span className="hs-card-title">Recent orders</span>
              <button className="hs-link">View all</button>
            </div>
            {ORDERS.map((order, i) => (
              <div key={order.id}>
                {i > 0 && <div className="hs-divider" />}
                <div className="hs-order-row">
                  <div className="hs-order-icon">
                    {order.icon === 'shoe'
                      ? <div className="hs-order-img-placeholder" />
                      : <IconOrders width="22" height="22" style={{ color: '#fff' }} />
                    }
                  </div>
                  <div className="hs-order-text">
                    {order.store && <span className="hs-order-store">{order.store}</span>}
                    {order.trackingNum && <span className="hs-order-tracking">{order.trackingNum}</span>}
                    <span className="hs-order-status">{order.status}</span>
                    {order.subtitle && <span className="hs-order-sub">{order.subtitle}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bolt Assistant */}
        {sections.boltAssistant && (
          <div className="hs-card hs-assistant">
            <div className="hs-assistant-icon">
              <IconBot width="22" height="22" style={{ color: 'var(--tnd-color-accent)' }} />
            </div>
            <div className="hs-assistant-text">
              <span className="hs-assistant-name">{copy.assistantName}</span>
              <span className="hs-assistant-sub">{copy.assistantSub}</span>
            </div>
            <Button size="md" variant="secondary">{copy.assistantCta}</Button>
          </div>
        )}

        {/* Featured apps */}
        <div className="hs-card hs-featured-apps">
          <div className="hs-card-header">
            <span className="hs-card-title">Featured apps</span>
            <button className="hs-link" onClick={() => setSheetOpen(true)}>View all</button>
          </div>
          <div className="hs-featured-grid">
            <div className="hs-featured-app-card">
              <div className="hs-featured-app-icon">
                <IconPlay width="22" height="22" style={{ color: 'var(--tnd-color-fg-muted)' }} />
              </div>
              <span className="hs-featured-app-name">Play &amp; Earn</span>
              <span className="hs-featured-app-desc">Play games and earn real cash rewards.</span>
              <span className="hs-featured-app-earned">$12.45 earned</span>
              <Button size="md" intent="neutral" variant="muted" fullWidth>Open</Button>
            </div>
            <div className="hs-featured-app-card">
              <div className="hs-featured-app-icon">
                <IconSpending width="22" height="22" style={{ color: 'var(--tnd-color-fg-muted)' }} />
              </div>
              <span className="hs-featured-app-name">Spending</span>
              <span className="hs-featured-app-desc">Track your spending and discover saving opportunities.</span>
              <Button size="md" intent="neutral" variant="muted" fullWidth>Open</Button>
            </div>
          </div>
        </div>

        {/* Deal Banner */}
        {sections.banner && (
          <div className="hs-card hs-banner">
            <div className="hs-banner-content">
              <span className="hs-banner-tag">
                <IconDeals width="12" height="12" style={{ flexShrink: 0 }} />
                {copy.bannerTag}
              </span>
              <span className="hs-banner-title">{copy.bannerTitle}</span>
              <span className="hs-banner-sub">{copy.bannerSub}</span>
              <div className="hs-banner-price">
                <span className="hs-banner-old">{copy.bannerPriceOld}</span>
                <span className="hs-banner-new">{copy.bannerPriceNew}</span>
              </div>
              <Button size="md" variant="secondary">{copy.bannerCta}</Button>
            </div>
            <img
              className="hs-banner-img"
              src="/src/assets/banner-aftershave.png"
              alt="Natural Aged After Shave"
            />
          </div>
        )}

        {/* Wallet */}
        {sections.wallet && (
          <div className="hs-card">
            <div className="hs-card-header">
              <span className="hs-card-title">Wallet</span>
              <button className="hs-link">Manage</button>
            </div>
            <div className="hs-cards-scroll">
              {CARDS.map(card => (
                <div key={card.id} className="hs-payment-card" style={{ background: card.bg }}>
                  <CardBrand brand={card.brand} last4={card.last4} />
                  <span className="hs-card-label">{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address book */}
        {sections.addressBook && (
          <div className="hs-card">
            <div className="hs-card-header">
              <span className="hs-card-title">Address book</span>
              <button className="hs-link">Manage</button>
            </div>
            {ADDRESSES.map((addr, i) => (
              <div key={addr.id}>
                {i > 0 && <div className="hs-divider" />}
                <div className="hs-address">
                  <span className="hs-address-line1">{addr.line1}</span>
                  <span className="hs-address-line2">{addr.line2}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shop top merchants */}
        {sections.shopMerchants && (
          <div className="hs-card">
            <div className="hs-card-header">
              <span className="hs-card-title">Shop top merchants</span>
            </div>
            <span className="hs-merchants-sub">Browse and shop from our featured partners</span>
            <div className="hs-merchants-grid">
              {MERCHANTS.map(m => (
                <div key={m.id} className="hs-merchant-item">
                  <MerchantLogo name={m.name} />
                  <span className="hs-merchant-name">{m.name}</span>
                </div>
              ))}
            </div>
            <div className="hs-dots">
              <div className="hs-dot hs-dot-active" />
              <div className="hs-dot" />
              <div className="hs-dot" />
              <div className="hs-dot" />
            </div>
          </div>
        )}

        <div className="hs-footer">
          <span className="hs-footer-text">{copy.footerText}</span>
          <Button variant="ghost">{copy.footerLink}</Button>
        </div>

        <div className="hs-customize-bar">
          <Button intent="neutral" variant="muted" fullWidth onClick={() => setEditOpen(true)}>
            Customize
          </Button>
        </div>
      </div>

      {/* App switcher */}
      {sheetOpen && (
        <div className="overlay" onClick={() => setSheetOpen(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <p className="sheet-title">Bolt apps</p>
            <div className="app-grid">
              {activeKeys.map(key => {
                const app = APP_MAP[key]
                const Icon = APP_ICONS[key]
                if (!app || !Icon) return null
                return (
                  <div key={key} className="app-grid-item">
                    <div className="app-grid-icon-wrap">
                      <div className="app-grid-icon-btn">
                        <Icon width="24" height="24" className="icon" />
                      </div>
                    </div>
                    <span className="app-grid-label">{app.label}</span>
                  </div>
                )
              })}
            </div>
            <Button fullWidth size="md" onClick={() => setSheetOpen(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* Edit widgets */}
      {editOpen && (
        <EditWidgets
          activeKeys={activeKeys}
          onDone={keys => { setActiveKeys(keys); setEditOpen(false) }}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  )
}
