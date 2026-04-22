import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './BottomSheet.css'

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  footer,
  detent = 'md',
  hasDragIndicator = true,
  hasTitleBar = true,
  isModal = true,
  className = '',
}) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <>
      {isModal && (
        <div
          className="bottom-sheet-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={['bottom-sheet', `bottom-sheet-${detent}`, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal={isModal}
        aria-label={title}
      >
        {hasDragIndicator && <div className="bottom-sheet-drag-indicator" aria-hidden="true" />}

        {hasTitleBar && (title || onClose) && (
          <div className="bottom-sheet-title-bar">
            {title && <div className="bottom-sheet-title">{title}</div>}
            {onClose && (
              <button className="bottom-sheet-close" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        <div className="bottom-sheet-body">{children}</div>

        {footer && <div className="bottom-sheet-footer">{footer}</div>}
      </div>
    </>,
    document.body
  )
}
