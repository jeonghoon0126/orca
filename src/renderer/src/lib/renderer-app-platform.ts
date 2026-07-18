export function resolveRendererAppPlatform(
  userAgent: string,
  preloadPlatform?: NodeJS.Platform
): NodeJS.Platform {
  // Why: Windows/macOS E2E can emulate desktop chrome through the user agent.
  // Otherwise preload metadata stays authoritative for real and test renderers.
  if (userAgent.includes('Windows')) {
    return 'win32'
  }
  if (userAgent.includes('Mac')) {
    return 'darwin'
  }
  if (preloadPlatform) {
    return preloadPlatform
  }
  if (userAgent.includes('Linux') || userAgent.includes('X11')) {
    return 'linux'
  }
  if (userAgent) {
    return 'linux'
  }
  return 'win32'
}

export function getRendererAppPlatform(): NodeJS.Platform {
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent
  const preloadPlatform =
    typeof window === 'undefined' ? undefined : window.api?.platform?.get?.()?.platform
  return resolveRendererAppPlatform(userAgent, preloadPlatform)
}
