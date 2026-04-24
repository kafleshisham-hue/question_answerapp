'use client'

import { useState, useRef, useEffect } from 'react'
import { COUNTRIES } from '@/lib/countries'

type Message = { role: 'user' | 'assistant' | 'error'; content: string }

const SUGGESTIONS = [
  'What is the capital of India?',
  'What does Egypt have famous?',
  'Tell me about France’s culture.',
  'What languages are spoken in Mexico?',
  'Where is South Africa located?',
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [showFacts, setShowFacts] = useState(true)
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 via-cyan-100 to-slate-100 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-xl text-white shadow-xl shadow-sky-300/30">
            🌍
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">World Knowledge Base</h1>
            <p className="text-sm text-slate-500">Bright country cards, AI answers, and interactive exploration.</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {COUNTRIES.slice(0, 8).map((c) => (
              <span
                key={c.name}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
              >
                {c.name}
              </span>
            ))}
            {COUNTRIES.length > 8 && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                +{COUNTRIES.length - 8} more
              </span>
            )}
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
              <p className="mt-2 text-sm text-slate-500">
                Explore facts for 12 countries including Nepal, India, Egypt, Mexico, France, China, and more.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowFacts((current) => !current)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-sky-300 hover:bg-sky-50"
              >
                {showFacts ? 'Hide country cards' : 'Show country cards'}
              </button>
            </div>
            {showFacts ? (
              <>
                <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {COUNTRIES.map((country) => (
                    <div
                      key={country.name}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{country.name}</h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                            {country.facts?.split('.')[0] || 'Country facts'}.
                          </p>
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(country.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          Open map
                        </a>
                      </div>
                      <div className="mt-4 h-28 overflow-hidden rounded-3xl bg-slate-100 p-3">
                        <div className="flex h-full items-center justify-center text-slate-400">
                          Click “Open map” to view {country.name} on Google Maps.
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                        <div><span className="font-semibold text-slate-700">Capital:</span> {country.capital || 'Unknown'}</div>
                        <div><span className="font-semibold text-slate-700">Population:</span> {country.population || 'Unknown'}</div>
                        <div><span className="font-semibold text-slate-700">Region:</span> {country.region || 'Unknown'}</div>
                        <div><span className="font-semibold text-slate-700">Languages:</span> {country.languages?.join(', ') || 'Unknown'}</div>
                        <div><span className="font-semibold text-slate-700">Facts:</span> {country.facts || 'No facts available'}</div>
                      </div>
                      <div className="mt-5 flex gap-3">
                        <button
                          onClick={() => handleAsk(`Tell me more about ${country.name}`)}
                          className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                        >
                          Ask AI
                        </button>
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(country.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Map link
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 w-full max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick suggestions</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleAsk(s)}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-slate-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid w-full max-w-4xl grid-cols-1 gap-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleAsk(s)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-slate-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
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
                      ? 'rounded-br-sm bg-slate-800 text-white shadow-lg shadow-slate-400/30'
                      : msg.role === 'error'
                        ? 'rounded-bl-sm border border-red-200 bg-red-50 text-red-700'
                        : 'rounded-bl-sm border border-slate-200 bg-white text-slate-900'
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center text-xs text-slate-500">
          <p>Powered by OpenAI GPT-4 • Built with Next.js</p>
        </div>
      </footer>

      {/* Input bar */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-slate-500 transition-colors hover:text-slate-900"
            >
              Clear
            </button>
          )}
          <input
            type="text"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20 disabled:opacity-40"
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
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-400/30 transition-all hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
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
