import { useState } from 'react'
import Home from './pages/Home/Home'
import HomeSimple from './pages/Home/HomeSimple'
import Login from './pages/Login/Login'
import VersionPicker from './components/VersionPicker/VersionPicker'
import { useVersion } from './hooks/useVersion'
import { ALL_KEYS } from './data/apps'
import './design-system/tokens.css'

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('authed') === 'true')

  const [activeWidgets, setActiveWidgets] = useState(() => {
    const saved = localStorage.getItem('bolt_widgets')
    return saved ? JSON.parse(saved) : ALL_KEYS
  })

  const [hiddenWidgets, setHiddenWidgets] = useState(() => {
    const saved = localStorage.getItem('bolt_widgets')
    if (!saved) return []
    const active = JSON.parse(saved)
    return ALL_KEYS.filter(k => !active.includes(k))
  })

  function login(selectedKeys) {
    const keys = selectedKeys && selectedKeys.length > 0 ? selectedKeys : ALL_KEYS
    const existing = localStorage.getItem('bolt_widgets')
    const finalKeys = selectedKeys === null && existing ? JSON.parse(existing) : keys
    localStorage.setItem('authed', 'true')
    localStorage.setItem('bolt_widgets', JSON.stringify(finalKeys))
    setActiveWidgets(finalKeys)
    setHiddenWidgets(ALL_KEYS.filter(k => !finalKeys.includes(k)))
    setAuthed(true)
  }

  function logout() {
    localStorage.removeItem('authed')
    localStorage.removeItem('bolt_widgets')
    setAuthed(false)
    setActiveWidgets(ALL_KEYS)
    setHiddenWidgets([])
  }

  function handleWidgetsChange(active, hidden) {
    setActiveWidgets(active)
    setHiddenWidgets(hidden)
    localStorage.setItem('bolt_widgets', JSON.stringify(active))
  }

  const { versionId, version, switchVersion } = useVersion()
  const isSimple = version.simpleMode === true

  function handleSwitchVersion(id) {
    logout()
    switchVersion(id)
  }

  const themeVars = {
    '--tnd-color-bg-page':    version.theme.bgPage,
    '--tnd-color-bg-card':    version.theme.bgCard,
    '--tnd-color-bg-subtle':  version.theme.bgSubtle,
    '--tnd-color-bg-avatar':  version.theme.bgAvatar,
    '--tnd-color-accent':     version.theme.accent,
    '--tnd-color-brand':      version.theme.brand,
    '--tnd-color-fg-default': version.theme.fgDefault,
    '--tnd-color-fg-muted':   version.theme.fgMuted,
  }

  return (
    <div style={themeVars} data-seam={version.seam ?? 'dark'}>
      {authed
        ? (isSimple
            ? <HomeSimple version={version} onLogout={logout} />
            : <Home
                version={version}
                activeWidgets={activeWidgets}
                hiddenWidgets={hiddenWidgets}
                onWidgetsChange={handleWidgetsChange}
                onLogout={logout}
              />
          )
        : <Login onComplete={login} simpleMode={isSimple} />
      }
      <VersionPicker versionId={versionId} onSwitch={handleSwitchVersion} />
    </div>
  )
}
