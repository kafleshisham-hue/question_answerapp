import { GoogleGenerativeAI } from '@google/generative-ai'
import { findRelevantCountry, serializeCountryContext, getCountryNameList } from '@/lib/countries'

function getLastUserMessage(messages: Array<{ role: string; content: string }>) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === 'user') return messages[i].content
  }
  return ''
}

export async function POST(request: Request) {
  const geminiKey = process.env.GEMINI_API_KEY

  if (!geminiKey) {
    return new Response('GEMINI_API_KEY not configured', { status: 500 })
  }

  const { messages } = await request.json()
  const userQuestion = getLastUserMessage(messages)
  const country = findRelevantCountry(userQuestion)

  const systemInstruction = country
    ? `You are a world knowledge assistant. Answer questions using only the selected country record below. Be concise, helpful, and do not invent details.\n\nSelected Country:\n${serializeCountryContext(country)}`
    : `You are a world knowledge assistant. The user asked a question about countries, but the system only has data for these countries: ${getCountryNameList()}. ` +
      `If the requested country is not listed, respond that the information is not available. Be concise, helpful, and do not invent details.`

  const genAI = new GoogleGenerativeAI(geminiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction,
  })

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
    return new Response(`API error: ${message}`, { status: 502 })
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
