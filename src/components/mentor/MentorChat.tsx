import React, { useState, useRef, useEffect } from 'react';
import { Project, MentorMessage } from '../../types';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import kuchuPuchuAvatar from '../../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Code,
  Lightbulb,
  HelpCircle,
  Bug,
  Compass,
  ArrowRight,
  Award
} from 'lucide-react';

interface MentorChatProps {
  project: Project;
}

export const MentorChat: React.FC<MentorChatProps> = ({ project }) => {
  const { mentorMessages, addMentorMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = mentorMessages[project.id] || [
    {
      id: 'default_welcome',
      sender: 'mentor',
      text: `Hello! I'm **Kuchu Puchu**, your dedicated AI Project Mentor for **${project.title}** 🎓\n\nI have reviewed your required competencies (**${project.requiredSkills.join(
        ', '
      )}**) and your tech stack (**${project.technologies.slice(0, 4).join(', ')}**).\n\nWhether you need help debugging backend code, explaining architecture to your guide, or acing your external Viva, ask me anything!`,
      timestamp: 'Now',
      suggestedActions: [
        'How should I implement the core feature?',
        'What will examiners ask in Viva?',
        'Help me debug an error',
        'Suggest high-scoring improvements'
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const studentMsg: MentorMessage = {
      id: `student_${Date.now()}`,
      sender: 'student',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    addMentorMessage(project.id, studentMsg);
    if (!queryText) setInputText('');
    setIsTyping(true);

    try {
      const response = await aiService.mentorChat(
        project,
        textToSend,
        messages.map((m) => ({ sender: m.sender, text: m.text }))
      );

      const mentorMsg: MentorMessage = {
        id: `mentor_${Date.now()}`,
        sender: 'mentor',
        text: response.text,
        timestamp: 'Just now',
        codeSnippet: response.codeSnippet,
        suggestedActions: response.suggestedActions
      };

      addMentorMessage(project.id, mentorMsg);
    } catch (err) {
      console.error(err);
      addMentorMessage(project.id, {
        id: `mentor_err_${Date.now()}`,
        sender: 'mentor',
        text: 'Kuchu Puchu encountered a momentary hiccup connecting to the AI inference service. Please try asking again!',
        timestamp: 'Just now'
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const quickPromptButtons = [
    { label: 'Explain architecture', icon: HelpCircle, prompt: 'Can you explain the core system architecture and data flow step-by-step?' },
    { label: 'Give backend code', icon: Code, prompt: 'Give me a complete, production-ready code example for the core backend endpoint.' },
    { label: 'Viva defense tips', icon: Award, prompt: 'What tough questions will external examiners ask about this project during Viva?' },
    { label: 'What to build next?', icon: Compass, prompt: 'What should I build next based on my current development progress?' },
    { label: 'Debug API error', icon: Bug, prompt: 'Help me debug a CORS and payload validation error in my API.' }
  ];

  return (
    <div className="flex flex-col h-[760px] max-h-[82vh] rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Header: Kuchu Puchu Persona & Project Context */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 rounded-2xl overflow-hidden ring-2 ring-indigo-400/60 shadow-lg shadow-indigo-500/20 shrink-0 bg-slate-800">
            <img
              src={kuchuPuchuAvatar}
              alt="Kuchu Puchu"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Kuchu Puchu</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI Project Mentor
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Your 24/7 Academic Co-pilot • Architecture, Coding, & Viva Defense Guide
            </p>
          </div>
        </div>

        {/* Project Snapshot Badges */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/80">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Project</p>
            <p className="font-semibold text-white max-w-[140px] truncate">{project.title}</p>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Skills</p>
            <p className="font-semibold text-slate-200 truncate max-w-[130px]">
              {project.requiredSkills.slice(0, 3).join(', ')}
            </p>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Progress</p>
            <p className="font-bold text-indigo-400">{project.progress || 68}%</p>
          </div>
        </div>
      </div>

      {/* Quick Action Prompt Chips */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Ask Kuchu Puchu:
        </span>
        {quickPromptButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.label}
              onClick={() => handleSend(btn.prompt)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 transition-colors whitespace-nowrap shadow-2xs"
            >
              <Icon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40">
        {messages.map((msg) => {
          const isStudent = msg.sender === 'student';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isStudent ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              {isStudent ? (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold bg-indigo-600 text-white shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 ring-1 ring-indigo-300 shadow-xs bg-slate-800">
                  <img
                    src={kuchuPuchuAvatar}
                    alt="Kuchu Puchu"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Bubble */}
              <div className="space-y-3 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isStudent
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Code snippet if provided */}
                  {msg.codeSnippet && (
                    <div className="mt-3 rounded-xl bg-slate-900 text-slate-100 overflow-hidden border border-slate-800">
                      <div className="bg-slate-800/90 px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span>{msg.codeSnippet.language}</span>
                        <button
                          onClick={() => handleCopyCode(msg.codeSnippet!.code, msg.id)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          {copiedCodeId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3.5 overflow-x-auto text-xs font-mono text-indigo-100 leading-relaxed">
                        <code>{msg.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Suggested follow-up prompt chips */}
                {!isStudent && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-indigo-50/90 hover:bg-indigo-100 text-indigo-800 border border-indigo-200/80 transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 max-w-lg mr-auto animate-in fade-in">
            <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 ring-1 ring-indigo-300 shadow-xs bg-slate-800">
              <img
                src={kuchuPuchuAvatar}
                alt="Kuchu Puchu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 rounded-tl-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-medium text-slate-400 ml-1">
                Kuchu Puchu is thinking & composing advice...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Kuchu Puchu anything (e.g., 'How do I justify FastAPI over Django in my Viva?')..."
          className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="px-4 sm:px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <span>Ask Kuchu Puchu</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
