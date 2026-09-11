'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};

const SUGGESTIONS = [
  'What are the latest articles?',
  'Explain the global debt crisis',
  'Summarize recent tech regulations',
  'What is happening with climate policy?',
];

// Simple markdown formatter that transforms links into clickable tags
function renderFormattedMessage(text: string) {
  // Regex to match [title](url)
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkTitle = match[1];
    const linkHref = match[2];
    parts.push(
      <Link
        key={match.index}
        href={linkHref}
        className="font-medium underline text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 inline-flex items-center gap-0.5 mx-0.5"
      >
        <span>{linkTitle}</span>
        <ExternalLink className="h-3 w-3 inline" />
      </Link>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: 'Hello! I am your Debt & Dominion News AI Analyst. Ask me about our latest published articles, macroeconomic trends, or geopolitical power shifts.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText.trim();
    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: updatedMessages.slice(-6), // Send last 6 turns for context
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', text: data.error || 'Sorry, I encountered an error. Please try again in a moment.' },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, there was a problem connecting to the news intelligence server.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'ai',
        text: 'Chat cleared. How can I help you analyze the news or our latest articles today?',
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-600/30 transition-transform hover:scale-105 active:scale-95"
            title="Open Debt & Dominion News AI"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="w-[360px] sm:w-[420px] h-[540px] bg-background border border-border/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-3.5 text-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline font-bold text-sm">Debt & Dominion News AI</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[11px] text-white/80">Open news intelligence & article insights</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full h-7 w-7"
                  onClick={handleClear}
                  title="Reset conversation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full h-7 w-7"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-muted/20 text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-orange-600 text-white rounded-tr-sm font-medium'
                        : 'bg-card text-foreground border border-border/80 rounded-tl-sm'
                    }`}
                  >
                    {msg.role === 'ai' ? renderFormattedMessage(msg.text) : msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card text-foreground border border-border/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                    <span className="text-xs text-muted-foreground ml-2">Analyzing news...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Shown when only 1 message or user wants quick answers) */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-muted/30 border-t border-border/40 flex flex-wrap gap-1.5">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground w-full mb-0.5">
                  <Sparkles className="h-3 w-3 text-orange-500" />
                  <span>Suggested Questions</span>
                </div>
                {SUGGESTIONS.map((sugg, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(sugg)}
                    disabled={isLoading}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-background border border-border/70 hover:border-orange-500/50 hover:bg-orange-500/10 text-foreground transition-colors"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-background border-t border-border/60">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  placeholder="Ask about debt, geopolitics, articles..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="rounded-full text-sm focus-visible:ring-orange-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white shrink-0 shadow-sm transition-transform active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
