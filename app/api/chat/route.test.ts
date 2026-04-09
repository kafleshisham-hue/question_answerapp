import { describe, it, expect, vi } from 'vitest'

const { mockCreate } = vi.hoisted(() => ({ mockCreate: vi.fn() }))

vi.mock('openai', () => ({
  default: class {
    chat = { completions: { create: mockCreate } }
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
  it('returns 400 when document is missing', async () => {
    const response = await POST(makeRequest({ messages: [{ role: 'user', content: 'hello' }] }))
    expect(response.status).toBe(400)
  })

  it('includes the document text in the system prompt sent to OpenAI', async () => {
    async function* fakeStream() {
      yield { choices: [{ delta: { content: 'answer' } }] }
    }
    mockCreate.mockResolvedValue(fakeStream())

    await POST(
      makeRequest({ document: 'SECRET_CONTENT', messages: [{ role: 'user', content: 'q' }] })
    )

    const calledMessages = mockCreate.mock.calls[0][0].messages
    const systemMessage = calledMessages.find((m: { role: string }) => m.role === 'system')
    expect(systemMessage.content).toContain('SECRET_CONTENT')
  })

  it('returns a streaming plain-text response on valid input', async () => {
    async function* fakeStream() {
      yield { choices: [{ delta: { content: 'Hello' } }] }
      yield { choices: [{ delta: { content: ' world' } }] }
    }
    mockCreate.mockResolvedValue(fakeStream())

    const response = await POST(
      makeRequest({ document: 'Test doc', messages: [{ role: 'user', content: 'summarise' }] })
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('text/plain')

    const text = await response.text()
    expect(text).toBe('Hello world')
  })
})
