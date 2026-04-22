import './Button.css'

export function Button({
  children,
  intent = 'neutral',
  variant = 'filled',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  onClick,
  type = 'button',
  className = '',
}) {
  const classes = [
    'btn',
    `btn-${size}`,
    `btn-${intent}-${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className="btn-spinner" aria-hidden="true" />}
      {!isLoading && leadingIcon && <span className="btn-icon">{leadingIcon}</span>}
      {children}
      {!isLoading && trailingIcon && <span className="btn-icon">{trailingIcon}</span>}
    </button>
  )
}
