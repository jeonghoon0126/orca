import { describe, expect, it } from 'vitest'
import { resolveRendererAppPlatform } from './renderer-app-platform'

describe('resolveRendererAppPlatform', () => {
  it('keeps renderer layout branches aligned with a Windows user agent', () => {
    expect(resolveRendererAppPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'darwin')).toBe(
      'win32'
    )
  })

  it('falls back to the preload platform when no user agent exists', () => {
    expect(resolveRendererAppPlatform('', 'darwin')).toBe('darwin')
  })

  it('falls back to the preload platform for a non-browser user agent', () => {
    expect(resolveRendererAppPlatform('Node.js/24', 'win32')).toBe('win32')
  })

  it('recognizes an explicit Linux browser user agent without preload metadata', () => {
    expect(resolveRendererAppPlatform('Mozilla/5.0 (X11; Linux x86_64)')).toBe('linux')
  })
})
