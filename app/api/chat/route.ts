import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response('GEMINI_API_KEY is not configured', { status: 500 })
  }

  const body = await request.json()
  const { document, messages } = body

  if (!document) {
    return new Response('document is required', { status: 400 })
  }

  const systemInstruction =
    `You are a document Q&A assistant. Answer questions strictly based on the provided document. ` +
    `If the answer cannot be found in the document, say so explicitly.\n\nDocument:\n${document}`

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction,
  })

  // Gemini uses 'user'/'model' roles and parts arrays
  const contents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  let result: Awaited<ReturnType<typeof model.generateContentStream>>
  try {
    result = await model.generateContentStream({ contents })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[api/chat] Gemini API error:', message)
    return new Response(`Gemini error: ${message}`, { status: 502 })
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(new TextEncoder().encode(text))
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('[api/chat] Gemini stream error:', message)
        controller.error(err)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
