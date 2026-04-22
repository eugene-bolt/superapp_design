import './IconButton.css'

export function IconButton({
  icon,
  label,
  intent = 'neutral',
  variant = 'ghost',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      className={['icon-btn', `icon-btn-${size}`, `icon-btn-${intent}-${variant}`, className].filter(Boolean).join(' ')}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      aria-label={label}
    >
      {isLoading ? <span className="icon-btn-spinner" aria-hidden="true" /> : icon}
    </button>
  )
}
