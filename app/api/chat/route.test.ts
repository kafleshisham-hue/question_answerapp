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
    vi.stubEnv('GEMINI_API_KEY', 'test-key')
    mockGetModel.mockClear()
    mockGenerateContentStream.mockClear()
  })

  it('returns 400 when document is missing', async () => {
    const response = await POST(makeRequest({ messages: [{ role: 'user', content: 'hello' }] }))
    expect(response.status).toBe(400)
  })

  it('includes the document text in the system instruction sent to Gemini', async () => {
    async function* fakeStream() {
      yield { text: () => 'answer' }
    }
    mockGenerateContentStream.mockResolvedValue({ stream: fakeStream() })

    await POST(
      makeRequest({ document: 'SECRET_CONTENT', messages: [{ role: 'user', content: 'q' }] })
    )

    const modelOptions = mockGetModel.mock.calls[0][0]
    expect(modelOptions.systemInstruction).toContain('SECRET_CONTENT')
  })

  it('returns a streaming plain-text response on valid input', async () => {
    async function* fakeStream() {
      yield { text: () => 'Hello' }
      yield { text: () => ' world' }
    }
    mockGenerateContentStream.mockResolvedValue({ stream: fakeStream() })

    const response = await POST(
      makeRequest({ document: 'Test doc', messages: [{ role: 'user', content: 'summarise' }] })
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('text/plain')

    const text = await response.text()
    expect(text).toBe('Hello world')
  })
})
