import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockCreate, mockOpenAI } = vi.hoisted(() => ({
  mockCreate: vi.fn(),
  mockOpenAI: vi.fn(),
}))

vi.mock('openai', () => ({
  default: class OpenAI {
    constructor(options: { apiKey: string }) {
      mockOpenAI(options)
    }
    chat = {
      completions: {
        create: mockCreate,
      },
    }
  },
}))

import { POST } from './route'

function makeRequest(body: object) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.stubEnv('OPENAI_API_KEY', 'test-key')
    mockCreate.mockClear()
    mockOpenAI.mockClear()
  })

  it('includes the selected country record in the system message', async () => {
    async function* fakeStream() {
      yield { choices: [{ delta: { content: 'Kathmandu is the capital.' } }] }
    }
    mockCreate.mockResolvedValue(fakeStream())

    await POST(makeRequest({ messages: [{ role: 'user', content: 'Capital of Nepal?' }] }))

    const callArgs = mockCreate.mock.calls[0][0]
    expect(callArgs.messages[0].content).toContain('Selected Country:')
    expect(callArgs.messages[0].content).toContain('Capital: Kathmandu')
    expect(callArgs.model).toBe('gpt-4')
  })

  it('returns a streaming plain-text response', async () => {
    async function* fakeStream() {
      yield { choices: [{ delta: { content: 'Hello' } }] }
      yield { choices: [{ delta: { content: ' world' } }] }
    }
    mockCreate.mockResolvedValue(fakeStream())

    const response = await POST(
      makeRequest({ messages: [{ role: 'user', content: 'Tell me about Nepal' }] })
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('text/plain')
    expect(await response.text()).toBe('Hello world')
  })
})
