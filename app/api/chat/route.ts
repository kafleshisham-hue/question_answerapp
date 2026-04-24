import OpenAI from 'openai'
import { findRelevantCountry, serializeCountryContext, getCountryNameList } from '@/lib/countries'

function getLastUserMessage(messages: Array<{ role: string; content: string }>) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === 'user') return messages[i].content
  }
  return ''
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response('OPENAI_API_KEY is not configured', { status: 500 })
  }

  const { messages } = await request.json()
  const userQuestion = getLastUserMessage(messages)
  const country = findRelevantCountry(userQuestion)

  const systemInstruction = country
    ? `You are a world knowledge assistant. Answer questions using only the selected country record below. Be concise, helpful, and do not invent details.\n\nSelected Country:\n${serializeCountryContext(country)}`
    : `You are a world knowledge assistant. The user asked a question about countries, but the system only has data for these countries: ${getCountryNameList()}. ` +
      `If the requested country is not listed, respond that the information is not available. Be concise, helpful, and do not invent details.`

  const openai = new OpenAI({ apiKey })

  const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemInstruction },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ]

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: openaiMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content
            if (text) {
              controller.enqueue(new TextEncoder().encode(text))
            }
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          console.error('[api/chat] OpenAI stream error:', message)
          controller.error(err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[api/chat] OpenAI API error:', message)
    return new Response(`OpenAI error: ${message}`, { status: 502 })
  }
}
