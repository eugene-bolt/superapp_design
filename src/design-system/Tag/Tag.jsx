import './Tag.css'

export function Tag({
  children,
  intent = 'neutral',
  size = 'md',
  hasDot = false,
  icon,
  className = '',
}) {
  return (
    <span className={['tag', `tag-${size}`, `tag-${intent}`, className].filter(Boolean).join(' ')}>
      {hasDot && <span className="tag-dot" aria-hidden="true" />}
      {icon && <span className="tag-icon">{icon}</span>}
      {children}
    </span>
  )
}
