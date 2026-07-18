import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { NestedRepoChecklist } from './NestedRepoChecklist'
import type { NestedRepoScanResult } from '../../../../shared/types'

const scan: NestedRepoScanResult = {
  selectedPath: '/workspace/platform',
  selectedPathKind: 'non_git_folder',
  repos: [
    { path: '/workspace/platform/web', displayName: 'web', depth: 1 },
    { path: '/workspace/platform/payments/api', displayName: 'api', depth: 2 },
    { path: '/workspace/platform/billing/api', displayName: 'api', depth: 2 }
  ],
  truncated: false,
  timedOut: false,
  stopped: false,
  durationMs: 4,
  maxDepth: 3,
  maxRepos: 100,
  timeoutMs: null
}

describe('NestedRepoChecklist', () => {
  it('renders stable collision labels while retaining full paths for test identification', () => {
    const html = renderToStaticMarkup(
      <NestedRepoChecklist
        scan={scan}
        selectedPaths={new Set(scan.repos.map((repo) => repo.path))}
        onSelectedPathsChange={vi.fn()}
      />
    )
    const visibleText = html.replace(/<[^>]+>/g, '')

    expect(visibleText).toContain('Deselect all')
    expect(visibleText).toContain('3 of 3 selected')
    expect(visibleText).toContain('web')
    expect(visibleText).toContain('payments/api')
    expect(visibleText).toContain('billing/api')
    expect(visibleText).not.toContain('Project group')
    expect(visibleText).not.toContain('/workspace/platform/payments/api')

    expect(html).toContain('data-testid="nested-repo-checklist"')
    expect(html).toContain('data-testid="nested-repo-select-all"')
    for (const repo of scan.repos) {
      expect(html).toContain(`data-repo-path="${repo.path}"`)
    }
  })
})
