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
    vi.stubEnv('GEMINI_API_KEY', 'test-gemini-key')
    mockGenerateContentStream.mockClear()
    mockGetModel.mockClear()
  })

  it('includes the selected country record in the system message', async () => {
    async function* fakeStream() {
      yield { text: () => 'Kathmandu is the capital.' }
    }
    mockGenerateContentStream.mockResolvedValue({ stream: fakeStream() })

    await POST(makeRequest({ messages: [{ role: 'user', content: 'Capital of Nepal?' }] }))

    const callArgs = mockGetModel.mock.calls[0][0]
    expect(callArgs.systemInstruction).toContain('Selected Country:')
    expect(callArgs.systemInstruction).toContain('Nepal is located in Asia')
    expect(callArgs.model).toBe('gemini-2.5-flash')
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
