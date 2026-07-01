import { useState, useRef } from 'react'
import './Home.css'
import { AppBar, AppBarIconBtn } from '../../design-system/AppBar/AppBar'
import { Button } from '../../design-system/Button/Button'
import LogoSvg from '../../assets/logo_bolt.svg?react'
import IconUser from '../../assets/icons/user.svg?react'
import IconBell from '../../assets/icons/bell.svg?react'
import IconAppSwitch from '../../assets/icons/app-switch.svg?react'
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
import { APP_MAP } from '../../data/apps'

const ICONS = {
  money:     IconMoney,
  wallet:    IconWallet,
  crypto:    IconCrypto,
  trade:     IconTrade,
  shop:      IconShop,
  play:      IconPlay,
  insurance: IconInsurance,
  credit:    IconCredit,
  bills:     IconBills,
  rewards:   IconRewards,
  rideshare: IconRideshare,
  dining:    IconDining,
  travel:    IconTravel,
  tickets:   IconTickets,
  deals:     IconDeals,
  orders:    IconOrders,
}

const A = {
  appSwitch: 'https://www.figma.com/api/mcp/asset/d0d8d098-22cf-40dd-ab29-3715ef039718',
}

// ── App Grid Item (for app switcher) ─────────────────────────────
function AppGridItem({ icon: Icon, label, locked, color }) {
  return (
    <div className="app-grid-item">
      <div className="app-grid-icon-wrap">
        <div className="app-grid-icon-btn" style={color ? { background: color } : undefined}>
          <Icon width="24" height="24" className="icon" />
        </div>
        {locked && (
          <div className="app-grid-lock-badge">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 10h-1V7a5 5 0 0 0-10 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-6 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-7H9V7a3 3 0 0 1 6 0v3z"/>
            </svg>
          </div>
        )}
      </div>
      <span className="app-grid-label">{label}</span>
    </div>
  )
}

// ── Widget Editor (full-screen) ───────────────────────────────────
function WidgetEditor({ widgets, hidden, onSave, onCancel }) {
  const [activeList, setActiveList] = useState(widgets)
  const [hiddenList, setHiddenList] = useState(hidden)
  const [draggedKey, setDraggedKey] = useState(null)
  const listRef = useRef(null)
  const dragKeyRef = useRef(null)

  function remove(key) {
    setActiveList(w => w.filter(k => k !== key))
    setHiddenList(h => [key, ...h])
  }

  function add(key) {
    setHiddenList(h => h.filter(k => k !== key))
    setActiveList(w => [...w, key])
  }

  function onHandleMouseDown(e, key) {
    e.preventDefault()
    const list = listRef.current
    if (!list) return
    const rowEl = list.querySelector(`[data-ekey="${key}"]`)
    if (!rowEl) return

    const startY = e.clientY
    dragKeyRef.current = key
    setDraggedKey(key)
    let insertBeforeKey = null

    function clearIndicators() {
      list.querySelectorAll('[data-ekey]').forEach(el => {
        el.style.borderTop = ''
        el.style.borderBottom = ''
      })
    }

    function onMove(e) {
      const dy = e.clientY - startY
      rowEl.style.transform = `translateY(${dy}px)`
      rowEl.style.zIndex = '10'
      rowEl.style.position = 'relative'
      clearIndicators()
      insertBeforeKey = null

      const items = [...list.querySelectorAll('[data-ekey]')]
      let placed = false
      for (const item of items) {
        if (item.dataset.ekey === key) continue
        const r = item.getBoundingClientRect()
        if (e.clientY < r.top + r.height * 0.5) {
          item.style.borderTop = '2px solid rgba(255,255,255,0.4)'
          insertBeforeKey = item.dataset.ekey
          placed = true
          break
        }
      }
      if (!placed) {
        const last = [...items].reverse().find(el => el.dataset.ekey !== key)
        if (last) last.style.borderBottom = '2px solid rgba(255,255,255,0.4)'
      }
    }

    function onUp() {
      rowEl.style.transform = ''
      rowEl.style.zIndex = ''
      rowEl.style.position = ''
      clearIndicators()
      const fromKey = dragKeyRef.current
      dragKeyRef.current = null
      setDraggedKey(null)

      if (insertBeforeKey) {
        setActiveList(prev => {
          const arr = [...prev]
          const from = arr.indexOf(fromKey)
          const to = arr.indexOf(insertBeforeKey)
          if (from === -1 || to === -1 || from === to) return prev
          arr.splice(from, 1)
          arr.splice(to > from ? to - 1 : to, 0, fromKey)
          return arr
        })
      }

      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div className="editor-page">
      <div className="editor-header">
        <button className="editor-cancel" onClick={onCancel}>Cancel</button>
        <span className="editor-title">Edit widgets</span>
        <button className="editor-done" onClick={() => onSave(activeList, hiddenList)}>Done</button>
      </div>

      <div className="editor-scroll">
        {/* Active widgets */}
        <p className="editor-section-label">MY WIDGETS</p>
        <div className="editor-list" ref={listRef}>
          {activeList.map(key => {
            const app = APP_MAP[key]
            const Icon = ICONS[key]
            if (!app || !Icon) return null
            const isDragging = draggedKey === key
            return (
              <div
                key={key}
                data-ekey={key}
                className={`editor-row${isDragging ? ' editor-row-dragging' : ''}`}
              >
                <button className="editor-remove" onClick={() => remove(key)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="editor-row-icon" style={{ background: app.color }}>
                  <Icon width="20" height="20" style={{ color: '#fff' }} />
                </div>
                <span className="editor-row-label">{app.label}</span>
                <div
                  className="editor-handle"
                  onMouseDown={e => onHandleMouseDown(e, key)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        {/* Hidden widgets */}
        {hiddenList.length > 0 && (
          <>
            <p className="editor-section-label" style={{ marginTop: 32 }}>MORE WIDGETS</p>
            <div className="editor-list">
              {hiddenList.map(key => {
                const app = APP_MAP[key]
                const Icon = ICONS[key]
                if (!app || !Icon) return null
                return (
                  <div key={key} className="editor-row">
                    <button className="editor-add" onClick={() => add(key)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div className="editor-row-icon" style={{ background: app.color }}>
                      <Icon width="20" height="20" style={{ color: '#fff' }} />
                    </div>
                    <span className="editor-row-label">{app.label}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Home ─────────────────────────────────────────────────────────
export default function Home({ version, activeWidgets, hiddenWidgets, onWidgetsChange, onLogout }) {
  const [widgets, setWidgets] = useState(activeWidgets)
  const [hidden, setHidden] = useState(hiddenWidgets)
  const [editorOpen, setEditorOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  const { boltApps } = version

  function handleSave(newWidgets, newHidden) {
    setWidgets(newWidgets)
    setHidden(newHidden)
    setEditorOpen(false)
    onWidgetsChange(newWidgets, newHidden)
  }

  return (
    <div className="home">
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

      <div className="scroll-area">
        {widgets.map(key => {
          const app = APP_MAP[key]
          const Icon = ICONS[key]
          if (!app || !Icon) return null
          return (
            <div
              key={key}
              className="widget"
              style={{ '--widget-color': app.color }}
            >
              <div className="widget-body">
                <div className="widget-icon-wrap">
                  <Icon width="36" height="36" className="widget-icon" />
                </div>
                <span className="widget-label">{app.label}</span>
                <span className="widget-desc">{app.desc}</span>
              </div>
            </div>
          )
        })}

        <div className="home-footer">
          <Button fullWidth size="md" variant="muted" onClick={() => setEditorOpen(true)}>Customize</Button>
          <div className="footer-help">
            <span className="footer-text">How can we help?</span>
            <Button variant="ghost">Contact us</Button>
          </div>
        </div>
      </div>

      {/* Full-screen widget editor */}
      {editorOpen && (
        <WidgetEditor
          widgets={widgets}
          hidden={hidden}
          onSave={handleSave}
          onCancel={() => setEditorOpen(false)}
        />
      )}

      {/* App switcher bottom sheet */}
      {sheetOpen && (
        <div className="overlay" onClick={() => setSheetOpen(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <p className="sheet-title">Bolt apps</p>
            <div className="app-grid">
              {boltApps.map(app => {
                const Icon = ICONS[app.key]
                if (!Icon) return null
                return (
                  <AppGridItem
                    key={app.key}
                    icon={Icon}
                    label={app.label}
                    locked={app.locked}
                    color={app.color}
                  />
                )
              })}
            </div>
            <Button fullWidth size="md" onClick={() => setSheetOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
