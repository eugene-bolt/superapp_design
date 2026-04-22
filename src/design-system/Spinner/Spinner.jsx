import './Spinner.css'

export function Spinner({
  size = 'md',
  color = 'brand',
  label = 'Loading…',
  className = '',
}) {
  return (
    <span
      className={['spinner', `spinner-${size}`, `spinner-${color}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-label={label}
    />
  )
}
