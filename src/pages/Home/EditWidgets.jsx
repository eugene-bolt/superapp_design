import { useState, useRef } from 'react'
import './EditWidgets.css'
import { AppBarIconBtn } from '../../design-system/AppBar/AppBar'
import { Button } from '../../design-system/Button/Button'
import { APPS, APP_MAP } from '../../data/apps'
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

const ICON_MAP = {
  money: IconMoney, wallet: IconWallet, crypto: IconCrypto,
  trade: IconTrade, shop: IconShop, play: IconPlay,
  insurance: IconInsurance, credit: IconCredit, bills: IconBills,
  rewards: IconRewards, rideshare: IconRideshare, dining: IconDining,
  travel: IconTravel, tickets: IconTickets, deals: IconDeals, orders: IconOrders,
}

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function EditWidgets({ activeKeys, onDone, onClose }) {
  const allKeys = APPS.map(a => a.key)
  const [activeList, setActiveList] = useState(() => [...activeKeys])
  const [hiddenList, setHiddenList] = useState(() =>
    allKeys.filter(k => !activeKeys.includes(k))
  )
  const [draggedKey, setDraggedKey] = useState(null)
  const listRef = useRef(null)
  const dragKeyRef = useRef(null)

  function toggle(key) {
    if (activeList.includes(key)) {
      setActiveList(w => w.filter(k => k !== key))
      setHiddenList(h => [key, ...h])
    } else {
      setHiddenList(h => h.filter(k => k !== key))
      setActiveList(w => [...w, key])
    }
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
        el.style.marginTop = ''
        el.style.marginBottom = ''
      })
    }

    function onMove(ev) {
      const dy = ev.clientY - startY
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
        if (ev.clientY < r.top + r.height * 0.5) {
          item.style.marginTop = '4px'
          insertBeforeKey = item.dataset.ekey
          placed = true
          break
        }
      }
      if (!placed) {
        const last = [...items].reverse().find(el => el.dataset.ekey !== key)
        if (last) last.style.marginBottom = '4px'
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

  function renderCard(key, isActive) {
    const app = APP_MAP[key]
    const Icon = ICON_MAP[key]
    if (!app || !Icon) return null
    return (
      <div
        key={key}
        data-ekey={isActive ? key : undefined}
        className={`ew-card${draggedKey === key ? ' ew-card-dragging' : ''}`}
      >
        <div className="ew-app-icon" style={{ background: app.color }}>
          <Icon width="22" height="22" style={{ color: '#fff' }} />
        </div>
        <span className="ew-app-name">{app.label}</span>
        <button
          className={`ew-checkbox${isActive ? ' ew-checkbox-on' : ''}`}
          onClick={() => toggle(key)}
          aria-label={isActive ? 'Disable' : 'Enable'}
        >
          {isActive && <CheckMark />}
        </button>
        {isActive
          ? <div className="ew-drag-handle" onMouseDown={e => onHandleMouseDown(e, key)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          : <div className="ew-drag-placeholder" />
        }
      </div>
    )
  }

  return (
    <div className="ew-screen">
      <div className="ew-header">
        <AppBarIconBtn ariaLabel="Close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </AppBarIconBtn>
        <span className="ew-header-title">Edit widgets</span>
        <div className="ew-header-end" />
      </div>

      <div className="ew-scroll">
        {activeList.length > 0 && (
          <>
            <p className="ew-section-label">MY WIDGETS</p>
            <div className="ew-list" ref={listRef}>
              {activeList.map(key => renderCard(key, true))}
            </div>
          </>
        )}

        {hiddenList.length > 0 && (
          <>
            <p className="ew-section-label ew-section-label-more">MORE WIDGETS</p>
            <div className="ew-list">
              {hiddenList.map(key => renderCard(key, false))}
            </div>
          </>
        )}
      </div>

      <div className="ew-action-bar">
        <Button fullWidth size="md" onClick={() => onDone(activeList)}>Done</Button>
      </div>
    </div>
  )
}
