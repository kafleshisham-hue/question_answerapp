import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockGenerateContentStream, mockGetModel } = vi.hoisted(() => ({
  mockGenerateContentStream: vi.fn(),
  mockGetModel: vi.fn(),
}))

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel(options: unknown) {
      mockGetModel(options)
      return { generateContentStream: mockGenerateContentStream }
    }
  },
}))

vi.mock('fs', () => ({
  readFileSync: () =>
    JSON.stringify([
      { name: 'Nepal', context: 'Nepal is in Asia. Capital is Kathmandu.' },
    ]),
}))

vi.mock('path', () => ({ join: (...args: string[]) => args.join('/') }))

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
    vi.stubEnv('GEMINI_API_KEY', 'test-key')
    mockGetModel.mockClear()
    mockGenerateContentStream.mockClear()
  })

  it('includes country data in the system instruction sent to Gemini', async () => {
    async function* fakeStream() {
      yield { text: () => 'Kathmandu is the capital.' }
    }
    mockGenerateContentStream.mockResolvedValue({ stream: fakeStream() })

    await POST(makeRequest({ messages: [{ role: 'user', content: 'Capital of Nepal?' }] }))

    const modelOptions = mockGetModel.mock.calls[0][0]
    expect(modelOptions.systemInstruction).toContain('Nepal')
    expect(modelOptions.systemInstruction).toContain('Kathmandu')
  })

  it('returns a streaming plain-text response', async () => {
    async function* fakeStream() {
      yield { text: () => 'Hello' }
      yield { text: () => ' world' }
    }
    mockGenerateContentStream.mockResolvedValue({ stream: fakeStream() })

    const response = await POST(
      makeRequest({ messages: [{ role: 'user', content: 'Tell me about Nepal' }] })
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('text/plain')
    expect(await response.text()).toBe('Hello world')
  })
})
