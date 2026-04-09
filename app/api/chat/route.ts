import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  const body = await request.json()
  const { document, messages } = body

  if (!document) {
    return new Response('document is required', { status: 400 })
  }

  const systemPrompt =
    `You are a document Q&A assistant. Answer questions strictly based on the provided document. ` +
    `If the answer cannot be found in the document, say so explicitly.\n\nDocument:\n${document}`

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
  })

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
