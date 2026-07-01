import './AppBar.css'

export function AppBarIconBtn({ children, onClick, ariaLabel }) {
  return (
    <button className="app-bar-icon-btn" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function AppBar({ leading, trailing, title, subtitle }) {
  return (
    <header className="app-bar">
      <div className="app-bar-row">
        {leading && <div className="app-bar-leading">{leading}</div>}
        <div className="app-bar-spacer" />
        {trailing && <div className="app-bar-trailing">{trailing}</div>}
      </div>
      {(title || subtitle) && (
        <div className="app-bar-text">
          {title && <h1 className="app-bar-title">{title}</h1>}
          {subtitle && <p className="app-bar-subtitle">{subtitle}</p>}
        </div>
      )}
    </header>
  )
}
