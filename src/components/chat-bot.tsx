'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am the Debt & Dominion AI assistant. How can I help you navigate the complex worlds of finance and power today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please try again later.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, there was a problem connecting to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button 
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-xl transition-transform hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="w-[350px] sm:w-[400px] h-[500px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            
            {/* Header */}
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-headline font-bold">Debt & Dominion AI</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-orange-700 hover:text-white rounded-full h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-sm' 
                      : 'bg-card text-foreground border border-border rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card text-foreground border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border/50">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input 
                  placeholder="Ask me anything..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="rounded-full focus-visible:ring-orange-500"
                />
                <Button type="submit" size="icon" disabled={isLoading} className="rounded-full bg-orange-600 hover:bg-orange-700 text-white">
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
