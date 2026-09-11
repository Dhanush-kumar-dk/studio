'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Headphones, Square, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ArticleAudioPlayerProps = {
  title: string;
  content: string;
  author?: string;
};

// Strips HTML and markdown formatting for clean, natural speech
function cleanSpeechText(htmlOrMarkdown: string): string {
  if (typeof window === 'undefined') return htmlOrMarkdown;
  const temp = document.createElement('div');
  temp.innerHTML = htmlOrMarkdown;
  let text = temp.textContent || temp.innerText || '';
  // Remove markdown headers, bold, italics, links, images
  text = text
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .replace(/[#*_~`>]/g, '') // markdown tokens
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function ArticleAudioPlayer({ title, content, author }: ArticleAudioPlayerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fullTextRef = useRef<string>('');
  const currentCharIndexRef = useRef<number>(0);

  // Clean the text to be spoken
  const cleanText = useMemo(() => {
    const combined = `${title}. Published by ${author || 'Debt & Dominion'}. ${cleanSpeechText(content)}`;
    fullTextRef.current = combined;
    return combined;
  }, [title, content, author]);

  // Estimated reading duration (at ~145 words per minute)
  const estimatedDuration = useMemo(() => {
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    return Math.max(30, Math.round((wordCount / 145) * 60));
  }, [cleanText]);

  // Load speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices && availableVoices.length > 0) {
          // Filter to english or best natural voices
          const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));
          setVoices(englishVoices.length > 0 ? englishVoices : availableVoices);
          if (!selectedVoice) {
            // Prefer Google or Microsoft natural voices if available
            const preferred = englishVoices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'));
            setSelectedVoice(preferred ? preferred.name : (englishVoices[0]?.name || availableVoices[0]?.name || ''));
          }
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        window.speechSynthesis.cancel();
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, []);

  // Update timer during playback
  useEffect(() => {
    if (isPlaying && !isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          const pct = Math.min(100, (next / (estimatedDuration / rate)) * 100);
          setProgress(pct);
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, estimatedDuration, rate]);

  const speakFromIndex = (startIndex: number) => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();

    const textToSpeak = cleanText.slice(startIndex);
    if (!textToSpeak.trim()) {
      handleStop();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;

    if (selectedVoice) {
      const v = voices.find(voice => voice.name === selectedVoice);
      if (v) utterance.voice = v;
    }

    utterance.onboundary = (e) => {
      if (e.name === 'word' || e.name === 'sentence') {
        const absoluteIndex = startIndex + e.charIndex;
        currentCharIndexRef.current = absoluteIndex;
        const pct = Math.min(100, (absoluteIndex / cleanText.length) * 100);
        setProgress(pct);
        setCurrentTime(Math.round((pct / 100) * (estimatedDuration / rate)));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentTime(Math.round(estimatedDuration / rate));
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.error('Speech synthesis error:', e);
      }
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePlayPause = () => {
    if (!isSupported) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      speakFromIndex(currentCharIndexRef.current);
    }
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentTime(0);
    currentCharIndexRef.current = 0;
  };

  const handleRewind = () => {
    // Jump back ~15% or restart if near beginning
    const newPct = Math.max(0, progress - 15);
    const newIndex = Math.floor((newPct / 100) * cleanText.length);
    currentCharIndexRef.current = newIndex;
    setProgress(newPct);
    setCurrentTime(Math.round((newPct / 100) * (estimatedDuration / rate)));
    if (isPlaying) {
      speakFromIndex(newIndex);
    }
  };

  const handleForward = () => {
    // Jump forward ~15%
    const newPct = Math.min(98, progress + 15);
    const newIndex = Math.floor((newPct / 100) * cleanText.length);
    currentCharIndexRef.current = newIndex;
    setProgress(newPct);
    setCurrentTime(Math.round((newPct / 100) * (estimatedDuration / rate)));
    if (isPlaying) {
      speakFromIndex(newIndex);
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      speakFromIndex(currentCharIndexRef.current);
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    if (isPlaying && !isPaused) {
      speakFromIndex(currentCharIndexRef.current);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = !isMuted ? 0 : 1;
    }
  };

  const handleSeek = (value: number[]) => {
    const newPct = value[0];
    const newIndex = Math.floor((newPct / 100) * cleanText.length);
    currentCharIndexRef.current = newIndex;
    setProgress(newPct);
    setCurrentTime(Math.round((newPct / 100) * (estimatedDuration / rate)));
    if (isPlaying) {
      speakFromIndex(newIndex);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="my-6 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.04] via-background to-orange-500/[0.08] p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-orange-500/30">
      <div className="flex flex-col gap-3">
        {/* Top bar: Title & Audio indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  Listen to this Article
                </span>
                {isPlaying && !isPaused && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-full bg-orange-500 animate-pulse" />
                      <span className="w-0.5 h-2/3 bg-orange-500 animate-pulse [animation-delay:150ms]" />
                      <span className="w-0.5 h-4/5 bg-orange-500 animate-pulse [animation-delay:300ms]" />
                    </span>
                    Playing
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                AI Narration • ~{Math.ceil(estimatedDuration / 60)} min listen
              </p>
            </div>
          </div>

          {/* Settings / Speed Dropdown */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Speed Selector Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
                  {rate}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuLabel className="text-xs">Playback Speed</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[0.75, 1.0, 1.25, 1.5, 2.0].map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => handleRateChange(r)}
                    className={rate === r ? 'font-bold text-orange-600 dark:text-orange-400' : ''}
                  >
                    {r}x {r === 1.0 && '(Normal)'}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Voice Options */}
            {voices.length > 1 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 max-h-60 overflow-y-auto">
                  <DropdownMenuLabel className="text-xs">Select Voice</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {voices.map((v) => (
                    <DropdownMenuItem
                      key={v.name}
                      onClick={() => handleVoiceChange(v.name)}
                      className={`text-xs truncate ${selectedVoice === v.name ? 'font-bold text-orange-600 dark:text-orange-400' : ''}`}
                    >
                      {v.name.replace(/Google|Microsoft|Desktop|Natural/gi, '').trim() || v.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mute Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Interactive Progress Slider */}
        <div className="space-y-1.5 pt-1">
          <Slider
            value={[progress]}
            max={100}
            step={0.5}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(Math.round(estimatedDuration / rate))}</span>
          </div>
        </div>

        {/* Playback Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRewind}
            disabled={progress === 0 && !isPlaying}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-orange-500/10"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={handlePlayPause}
            className="h-11 w-11 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20 transition-transform active:scale-95"
            title={isPlaying && !isPaused ? 'Pause' : 'Play'}
          >
            {isPlaying && !isPaused ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleForward}
            disabled={progress >= 98 && !isPlaying}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-orange-500/10"
            title="Forward 15 seconds"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          {(isPlaying || progress > 0) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleStop}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
              title="Stop"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
