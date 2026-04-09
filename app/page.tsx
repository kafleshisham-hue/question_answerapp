'use client'

import { useState } from 'react'

type Message = { role: 'user' | 'assistant' | 'error'; content: string }

const SOFT_WARN_CHARS = 50_000

export default function Home() {
  const [doc, setDoc] = useState('')
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)

  function handleDocChange(val: string) {
    setDoc(val)
    if (messages.length > 0) setMessages([])
  }

  async function handleAsk() {
    if (!question.trim() || !doc.trim() || streaming) return

    const userMsg: Message = { role: 'user', content: question }
    const history = messages
      .filter((m) => m.role !== 'error')
      .map(({ role, content }) => ({ role: role as 'user' | 'assistant', content }))
    const next = [...messages, userMsg]

    setMessages([...next, { role: 'assistant', content: '' }])
    setQuestion('')
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: doc, messages: [...history, { role: 'user', content: userMsg.content }] }),
      })

      if (!res.ok) {
        const text = await res.text()
        setMessages([...next, { role: 'error', content: text || 'Something went wrong. Please try again.' }])
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
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Left panel — Document */}
      <div className="flex w-1/2 flex-col gap-3 border-r border-gray-200 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Document
        </h2>
        <textarea
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your document text here…"
          value={doc}
          onChange={(e) => handleDocChange(e.target.value)}
        />
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{doc.length.toLocaleString()} characters</span>
          {doc.length > SOFT_WARN_CHARS && (
            <span className="text-amber-500">
              Large document — response quality may vary
            </span>
          )}
        </div>
      </div>

      {/* Right panel — Chat */}
      <div className="flex w-1/2 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Chat
          </h2>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear chat
            </button>
          )}
        </div>

        {/* Message history */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="mt-12 text-center text-sm text-gray-400">
              Paste a document, then ask a question.
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : msg.role === 'error'
                        ? 'border border-red-200 bg-red-50 text-red-600'
                        : 'border border-gray-200 bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {msg.content ||
                    (streaming && i === messages.length - 1 ? (
                      <span className="animate-pulse">▋</span>
                    ) : null)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Ask a question about your document…"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            disabled={streaming}
          />
          <button
            onClick={handleAsk}
            disabled={streaming || !question.trim() || !doc.trim()}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {streaming ? 'Asking…' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  )
}
