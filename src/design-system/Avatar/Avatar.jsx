import './Avatar.css'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  className = '',
}) {
  const classes = ['avatar', `avatar-${size}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-label={alt || initials}>
      {src ? (
        <img className="avatar-img" src={src} alt={alt} />
      ) : initials ? (
        initials.slice(0, 2).toUpperCase()
      ) : (
        <span className="avatar-icon"><UserIcon /></span>
      )}
    </span>
  )
}

export function AvatarGroup({ avatars = [], max = 3, size = 'md' }) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className="avatar-group">
      {overflow > 0 && (
        <Avatar size={size} initials={`+${overflow}`} className="avatar-overflow" />
      )}
      {[...visible].reverse().map((avatar, i) => (
        <Avatar key={i} size={size} {...avatar} />
      ))}
    </div>
  )
}
