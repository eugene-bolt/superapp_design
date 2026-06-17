import { useState } from 'react'
import { versions } from '../../versions/index.js'
import './VersionPicker.css'

export default function VersionPicker({ versionId, onSwitch }) {
  const [open, setOpen] = useState(false)

  function select(id) {
    onSwitch(id)
    setOpen(false)
  }

  return (
    <div className="vp-root">
      {open && (
        <div className="vp-menu">
          <p className="vp-heading">Version</p>
          {versions.map(v => (
            <button
              key={v.id}
              className={`vp-item ${v.id === versionId ? 'vp-item-active' : ''}`}
              onClick={() => select(v.id)}
            >
              <span className="vp-item-label">{v.label}</span>
              {v.id === versionId && <span className="vp-check">✓</span>}
            </button>
          ))}
        </div>
      )}
      <button className="vp-trigger" onClick={() => setOpen(o => !o)}>
        <span className="vp-trigger-label">
          {versions.find(v => v.id === versionId)?.label ?? 'Main'}
        </span>
        <span className="vp-trigger-arrow">{open ? '▲' : '▼'}</span>
      </button>
    </div>
  )
}
