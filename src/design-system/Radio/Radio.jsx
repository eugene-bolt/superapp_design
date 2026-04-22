import './Radio.css'

export function Radio({
  label,
  value,
  checked,
  onChange,
  isDisabled = false,
  name,
  className = '',
}) {
  return (
    <label className={['radio-wrapper', isDisabled && 'radio-disabled', className].filter(Boolean).join(' ')}>
      <input
        className="radio-input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <span className="radio-control">
        <span className="radio-dot" />
      </span>
      {label && <span className="radio-label">{label}</span>}
    </label>
  )
}

export function RadioGroup({
  options = [],
  value,
  onChange,
  name,
  direction = 'vertical',
  className = '',
}) {
  return (
    <div
      className={['radio-group', direction === 'horizontal' && 'radio-group-horizontal', className].filter(Boolean).join(' ')}
      role="radiogroup"
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          label={opt.label}
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          isDisabled={opt.disabled}
        />
      ))}
    </div>
  )
}
