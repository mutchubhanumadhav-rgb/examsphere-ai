import React, { useState, useRef, useEffect } from 'react';
import {
  Brain,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  X,
  Loader2,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api.ts';
import { SourceCitation } from '../../types/index.ts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: SourceCitation[];
  timestamp: string;
}

interface ExamSphereTutorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

export const ExamSphereTutor: React.FC<ExamSphereTutorProps> = ({
  isOpen,
  onClose,
  initialContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome to **ExamSphere Tutor**! I am your AI academic mentor and entrance-exam specialist.

Ask me about:
- **Conceptual Clarification**: Calculus, Physics mechanics, Organic reaction mechanisms, Genetics.
- **Syllabus & Weightage**: JEE Main, AP EAPCET, NEET, SAT Digital, GATE.
- **Real-Time Exam Notifications**: Verified application deadlines and official dates (powered by Google Search grounding).
- **Study Strategy**: Revision schedules and high-yield topic prioritization.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext && isOpen) {
      setInput(`What are the high-yield topics and official syllabus details for ${initialContext}?`);
    }
  }, [initialContext, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const newMessages: Message[] = [
      ...messages,
      {
        role: 'user',
        content: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await api.askTutor(userText, initialContext, history);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          citations: res.citations,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Tutor chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I had trouble connecting to the real-time tutor engine. Please verify your connection or try asking a standard conceptual question.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  ExamSphere Tutor
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Web Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official Source Priority · No Hallucinated Rules · Mathematical Reasoning
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-slate-50/50 dark:bg-transparent">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-300 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Brain className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : 'bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">{m.content}</div>

                  {/* Citations Box */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-[11px]">
                      <div className="font-mono text-cyan-700 dark:text-cyan-400 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        <span>Real-Time Citations ({m.citations.length}):</span>
                      </div>
                      <div className="space-y-1">
                        {m.citations.map((c, cIdx) => (
                          <div key={cIdx} className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                            <span className="truncate max-w-[200px]">{c.title}</span>
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-600 dark:text-cyan-300 hover:underline flex items-center gap-1 font-mono text-[10px]"
                            >
                              <span>{c.domain}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-right font-mono text-slate-400 dark:text-slate-500">
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-300 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs flex items-center gap-2 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-600 dark:text-cyan-400" />
                <span>Grounding with official exam portals & calculating explanation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about formulas, exam deadlines, question steps, or syllabi..."
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-md shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
