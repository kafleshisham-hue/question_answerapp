import { GoogleGenerativeAI } from '@google/generative-ai'
import { readFileSync } from 'fs'
import { join } from 'path'

type Country = { name: string; context: string }

function loadCountryContext(): string {
  const raw = readFileSync(join(process.cwd(), 'data/gold/countries.json'), 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  return countries.map((c) => `${c.name}: ${c.context}`).join('\n\n')
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response('GEMINI_API_KEY is not configured', { status: 500 })
  }

  const { messages } = await request.json()

  const countryData = loadCountryContext()
  const systemInstruction =
    `You are a world knowledge assistant. Answer questions strictly based on the country data provided below. ` +
    `If the question is about a country not in the data, say so clearly. Be concise and friendly.\n\n` +
    `Country Data:\n${countryData}`

  const genAI = new GoogleGenerativeAI(apiKey)
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
