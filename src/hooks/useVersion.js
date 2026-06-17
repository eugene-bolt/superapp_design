import { useState, useEffect } from 'react'
import { getVersion } from '../versions/index.js'

function getUrlVersion() {
  return new URLSearchParams(window.location.search).get('v') ?? 'main'
}

export function useVersion() {
  const [versionId, setVersionId] = useState(getUrlVersion)

  function switchVersion(id) {
    const url = new URL(window.location.href)
    if (id === 'main') url.searchParams.delete('v')
    else url.searchParams.set('v', id)
    window.history.pushState({}, '', url)
    setVersionId(id)
  }

  useEffect(() => {
    function onPop() { setVersionId(getUrlVersion()) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return { versionId, version: getVersion(versionId), switchVersion }
}
