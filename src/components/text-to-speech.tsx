'use client';

import { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TextToSpeechProps = {
  text: string;
};

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      // Cleanup when unmounting
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const toggleSpeech = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Create a temporary element to parse and strip HTML tags if text contains HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleSpeech}
      className={`h-9 gap-1.5 border-border/80 text-xs font-medium transition-colors ${
        isPlaying ? "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 hover:text-orange-700 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-400" : "hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
      }`}
    >
      {isPlaying ? <Square className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
      <span>{isPlaying ? 'Stop Audio' : 'Listen to Article'}</span>
    </Button>
  );
}
