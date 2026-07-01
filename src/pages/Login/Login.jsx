import { useState, useEffect } from 'react'
import './Login.css'
import { AppBar, AppBarIconBtn } from '../../design-system/AppBar/AppBar'
import { Button } from '../../design-system/Button/Button'
import IconChevronLeft from '../../assets/icons/chevron-left.svg?react'
import LogoSvg from '../../assets/logo_bolt.svg?react'
import IconMoney     from '../../assets/icons/bolt_money.svg?react'
import IconWallet    from '../../assets/icons/bolt_wallet.svg?react'
import IconCrypto    from '../../assets/icons/bolt_crypto.svg?react'
import IconTrade     from '../../assets/icons/bolt-trade.svg?react'
import IconShop      from '../../assets/icons/bolt_shop.svg?react'
import IconPlay      from '../../assets/icons/bolt_play.svg?react'
import IconInsurance from '../../assets/icons/bolt_insurance.svg?react'
import IconCredit    from '../../assets/icons/bolt_credit_score.svg?react'
import IconBills     from '../../assets/icons/bolt_bills.svg?react'
import IconRewards   from '../../assets/icons/bolt_rewards.svg?react'
import IconRideshare from '../../assets/icons/bolt_rideshare.svg?react'
import IconDining    from '../../assets/icons/bolt_dining.svg?react'
import IconTravel    from '../../assets/icons/bolt_travel.svg?react'
import IconTickets   from '../../assets/icons/bolt_tickets.svg?react'
import IconDeals     from '../../assets/icons/bolt_deals.svg?react'
import IconOrders    from '../../assets/icons/bolt_orders.svg?react'
import { ALL_KEYS } from '../../data/apps'

const APPS = [
  { key: 'money',     label: 'Money',        desc: 'Manage accounts, cards, and transfers.',    Icon: IconMoney,     color: '#2d8a27' },
  { key: 'wallet',    label: 'Wallet',       desc: 'Store passes, IDs, and gift cards.',        Icon: IconWallet,    color: '#92600f' },
  { key: 'crypto',    label: 'Crypto',       desc: 'Buy, sell, and track digital assets.',      Icon: IconCrypto,    color: '#7b2fbe' },
  { key: 'trade',     label: 'Trade',        desc: 'Grow your wealth with smart investing.',    Icon: IconTrade,     color: '#2563eb' },
  { key: 'shop',      label: 'Shop',         desc: 'Browse stores and manage orders.',          Icon: IconShop,      color: '#dc2626' },
  { key: 'play',      label: 'Play',         desc: 'Discover games and earn rewards.',          Icon: IconPlay,      color: '#d97706' },
  { key: 'insurance', label: 'Insurance',    desc: 'View coverage and manage claims.',          Icon: IconInsurance, color: '#166534' },
  { key: 'credit',    label: 'Credit score', desc: 'Monitor and improve your credit.',          Icon: IconCredit,    color: '#be185d' },
  { key: 'bills',     label: 'Bills',        desc: 'Pay bills and manage subscriptions.',       Icon: IconBills,     color: '#ea580c' },
  { key: 'rewards',   label: 'Rewards',      desc: 'Earn points and redeem perks.',             Icon: IconRewards,   color: '#2563eb' },
  { key: 'rideshare', label: 'Rideshare',    desc: 'Book rides and track trips.',               Icon: IconRideshare, color: '#16a34a' },
  { key: 'dining',    label: 'Dining',       desc: 'Order food and discover restaurants.',      Icon: IconDining,    color: '#0f766e' },
  { key: 'travel',    label: 'Travel',       desc: 'Book flights, hotels, and trips.',          Icon: IconTravel,    color: '#0891b2' },
  { key: 'tickets',   label: 'Tickets',      desc: 'Get tickets for events and shows.',         Icon: IconTickets,   color: '#a21caf' },
  { key: 'deals',     label: 'Deals',        desc: 'Find discounts, offers, and cashback.',     Icon: IconDeals,     color: '#2563eb' },
  { key: 'orders',    label: 'Orders',       desc: 'Track packages and deliveries.',            Icon: IconOrders,    color: '#6d28d9' },
]

// ── Screens ────────────────────────────────────────────────────────

function SplashScreen({ onLogin, onCreateAccount }) {
  return (
    <div className="login-screen">
      <div className="splash-content">
        <LogoSvg className="splash-logo" aria-label="Bolt" />
      </div>
      <div className="login-action-bar">
        <Button fullWidth size="md" onClick={onCreateAccount}>Create account</Button>
        <Button fullWidth size="md" variant="muted" onClick={onLogin}>Login</Button>
      </div>
    </div>
  )
}

function EmailScreen({ onNext, onBack }) {
  const [email, setEmail] = useState('')

  return (
    <div className="login-screen">
      <AppBar
        leading={
          <AppBarIconBtn ariaLabel="Back" onClick={onBack}>
            <IconChevronLeft width="20" height="20" />
          </AppBarIconBtn>
        }
        title="What's your email?"
        subtitle="We'll use this to create your account and keep you updated."
      />
      <div className="login-body">
        <div className="login-field">
          <label className="login-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && email.trim()) onNext(email.trim()) }}
            autoFocus
          />
        </div>
      </div>
      <div className="login-action-bar">
        <Button fullWidth size="md" isDisabled={!email.trim()} onClick={() => { if (email.trim()) onNext(email.trim()) }}>
          Continue
        </Button>
      </div>
    </div>
  )
}

function OtpScreen({ email, onNext, onBack }) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(58)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  function pad(n) { return String(n).padStart(2, '0') }

  return (
    <div className="login-screen">
      <AppBar
        leading={
          <AppBarIconBtn ariaLabel="Back" onClick={onBack}>
            <IconChevronLeft width="20" height="20" />
          </AppBarIconBtn>
        }
        title="Enter verification code"
        subtitle={
          <span>
            We sent a 6-digit code to <span className="login-sub-highlight">{email}</span>
          </span>
        }
      />
      <div className="login-body">
        <div className="login-field">
          <label className="login-label" htmlFor="otp">Code</label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            className="login-input login-input-otp"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            onKeyDown={e => { if (e.key === 'Enter' && otp.length >= 1) onNext() }}
            autoFocus
            autoComplete="one-time-code"
          />
        </div>
        <div className="login-resend-row">
          {countdown > 0
            ? <span className="login-resend-timer">Resend code in 00:{pad(countdown)}</span>
            : <Button variant="ghost" onClick={() => setCountdown(58)}>Resend code</Button>
          }
        </div>
      </div>
      <div className="login-action-bar">
        <Button fullWidth size="md" isDisabled={otp.length < 1} onClick={() => { if (otp.length >= 1) onNext() }}>
          Continue
        </Button>
      </div>
    </div>
  )
}

function AppPreferencesScreen({ onNext, onBack }) {
  const [selected, setSelected] = useState(new Set())

  function toggle(key) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="login-screen">
      <AppBar
        leading={
          <AppBarIconBtn ariaLabel="Back" onClick={onBack}>
            <IconChevronLeft width="20" height="20" />
          </AppBarIconBtn>
        }
      />
      <div className="pref-list">
        <div className="pref-header">
          <h1 className="pref-title">What are you here for?</h1>
          <p className="pref-subtitle">Pick the apps you're most interested in. You can always change this later in your profile.</p>
        </div>
        {APPS.map(({ key, label, desc, Icon, color }) => {
          const checked = selected.has(key)
          return (
            <button
              key={key}
              className={`pref-item${checked ? ' pref-item-checked' : ''}`}
              onClick={() => toggle(key)}
            >
              <div className="pref-icon-wrap" style={{ background: color }}>
                <Icon width="24" height="24" style={{ color: '#fff' }} />
              </div>
              <div className="pref-text">
                <span className="pref-label">{label}</span>
                <span className="pref-desc">{desc}</span>
              </div>
              <div className={`pref-checkbox${checked ? ' pref-checkbox-checked' : ''}`}>
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="var(--tnd-color-text-on-bold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>
      <div className="login-action-bar">
        {selected.size === 0
          ? <Button fullWidth size="md" onClick={() => onNext(ALL_KEYS)}>I'll try them all</Button>
          : <Button fullWidth size="md" onClick={() => onNext(Array.from(selected))}>Continue</Button>
        }
      </div>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────

export default function Login({ onComplete, simpleMode = false }) {
  const [step, setStep] = useState('splash')
  const [flow, setFlow] = useState(null) // 'register' | 'login'
  const [email, setEmail] = useState('')

  if (step === 'splash') return (
    <SplashScreen
      onLogin={() => { setFlow('login'); setStep('email') }}
      onCreateAccount={() => { setFlow('register'); setStep('email') }}
    />
  )

  if (step === 'email') return (
    <EmailScreen
      onNext={e => { setEmail(e); setStep('otp') }}
      onBack={() => setStep('splash')}
    />
  )

  if (step === 'otp') return (
    <OtpScreen
      email={email}
      onNext={() => (!simpleMode && flow === 'register') ? setStep('preferences') : onComplete(null)}
      onBack={() => setStep('email')}
    />
  )

  return (
    <AppPreferencesScreen
      onNext={keys => onComplete(keys)}
      onBack={() => setStep('otp')}
    />
  )
}
