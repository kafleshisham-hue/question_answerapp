'use client'

import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant' | 'error'; content: string }

const COUNTRIES = ['Nepal', 'Canada', 'Japan', 'Brazil', 'Germany']

const SUGGESTIONS = [
  'What is the capital of Nepal?',
  'How many people live in Japan?',
  'What languages are spoken in Canada?',
  'What is Brazil known for?',
  'Where is Germany located?',
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleAsk(q = question) {
    const text = q.trim()
    if (!text || streaming) return

    const userMsg: Message = { role: 'user', content: text }
    const history = messages
      .filter((m) => m.role !== 'error')
      .map(({ role, content }) => ({ role, content }))

    const next = [...messages, userMsg]
    setMessages([...next, { role: 'assistant', content: '' }])
    setQuestion('')
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: text }],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        setMessages([...next, { role: 'error', content: err || 'Something went wrong.' }])
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages([...next, { role: 'assistant', content: accumulated }])
      }
    } catch {
      setMessages([...next, { role: 'error', content: 'Something went wrong. Please try again.' }])
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-lg shadow-lg shadow-blue-500/30">
            🌍
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">World Knowledge Base</h1>
            <p className="text-xs text-blue-300/70">Powered by Gemini 2.5 Flash</p>
          </div>
          <div className="ml-auto flex gap-2">
            {COUNTRIES.map((c) => (
              <span
                key={c}
                className="hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/60 sm:inline"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-6">

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">🗺️</div>
              <h2 className="text-2xl font-bold tracking-tight">Ask about any country</h2>
              <p className="mt-2 text-sm text-blue-200/60">
                Explore facts about Nepal, Canada, Japan, Brazil, and Germany
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleAsk(s)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 transition-all hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex flex-1 flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-sm">
                    {msg.role === 'error' ? '⚠️' : '🌍'}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-sm bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : msg.role === 'error'
                        ? 'rounded-bl-sm border border-red-500/30 bg-red-500/10 text-red-300'
                        : 'rounded-bl-sm border border-white/10 bg-white/5 text-white/90'
                  }`}
                >
                  {msg.content || (streaming && i === messages.length - 1
                    ? <span className="inline-block w-2 animate-pulse rounded-sm bg-blue-400">▋</span>
                    : null
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* Input bar */}
      <div className="sticky bottom-0 border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Clear
            </button>
          )}
          <input
            type="text"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-40"
            placeholder="Ask about a country…"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            disabled={streaming}
            autoFocus
          />
          <button
            onClick={() => handleAsk()}
            disabled={streaming || !question.trim()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/50 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {streaming ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

    </div>
  )
}
