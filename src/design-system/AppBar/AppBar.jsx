import './AppBar.css'

export function AppBar({
  title,
  subtitle,
  leading,
  trailing,
  size = 'md',
  isSticky = false,
  isScrolled = false,
  className = '',
}) {
  return (
    <header
      className={[
        'app-bar',
        `app-bar-${size}`,
        isSticky && 'app-bar-sticky',
        isScrolled && 'app-bar-scrolled',
        className,
      ].filter(Boolean).join(' ')}
    >
      {leading && <div className="app-bar-leading">{leading}</div>}

      <div className="app-bar-content">
        {title && <div className="app-bar-title">{title}</div>}
        {subtitle && <div className="app-bar-subtitle">{subtitle}</div>}
      </div>

      {trailing && <div className="app-bar-trailing">{trailing}</div>}
    </header>
  )
}
