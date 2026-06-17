import Home from './pages/Home/Home'
import VersionPicker from './components/VersionPicker/VersionPicker'
import { useVersion } from './hooks/useVersion'
import './design-system/tokens.css'

export default function App() {
  const { versionId, version, switchVersion } = useVersion()

  // Apply version theme as CSS variables on the root element
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
    <div style={themeVars}>
      <Home version={version} />
      <VersionPicker versionId={versionId} onSwitch={switchVersion} />
    </div>
  )
}
