import './ListItem.css'

export function ListItem({
  title,
  subtitle,
  value,
  meta,
  leading,
  trailing,
  onClick,
  isSelected = false,
  isDisabled = false,
  isDanger = false,
  variant = 'default',
  hasDivider = false,
  as: Tag = 'div',
  className = '',
}) {
  const interactive = !!onClick
  return (
    <>
      <Tag
        className={[
          'list-item',
          variant === 'filled' && 'list-item-filled',
          interactive && 'list-item-interactive',
          isSelected && 'list-item-selected',
          isDisabled && 'list-item-disabled',
          isDanger && 'list-item-danger',
          className,
        ].filter(Boolean).join(' ')}
        onClick={!isDisabled ? onClick : undefined}
        tabIndex={interactive && !isDisabled ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        aria-selected={isSelected || undefined}
        aria-disabled={isDisabled || undefined}
      >
        {leading && <div className="list-item-leading">{leading}</div>}

        <div className="list-item-content">
          {title && <div className="list-item-title">{title}</div>}
          {subtitle && <div className="list-item-subtitle">{subtitle}</div>}
        </div>

        {(value || meta || trailing) && (
          <div className="list-item-trailing">
            <div>
              {value && <div className="list-item-value">{value}</div>}
              {meta && <div className="list-item-meta">{meta}</div>}
            </div>
            {trailing}
          </div>
        )}
      </Tag>
      {hasDivider && <hr className="list-item-divider" />}
    </>
  )
}

export function List({ children, className = '' }) {
  return (
    <div className={['list', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
