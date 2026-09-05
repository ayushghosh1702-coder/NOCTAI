import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import kuchuPuchuAvatar from '../../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  Minimize2,
  Maximize2,
  HelpCircle,
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'kuchu' | 'user';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    path: string;
  };
}

export const KuchuPuchuAssistant: React.FC = () => {
  const { user, activeProject, projects } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'quickTips' | 'vivaPrep'>('chat');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const studentName = user?.name ? user.name.split(' ')[0] : 'there';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'kuchu',
      text: `Hello ${studentName}! 👋 I am **Kuchu Puchu**, your AI Project Mentor & Viva Buddy! I'm here to help you turn your final-year college idea into an A+ capstone project. What would you like to work on right now?`,
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    {
      label: '🎯 What will examiners ask in Viva?',
      query: 'What are the top 3 tough questions external evaluators ask for this project?'
    },
    {
      label: '⚡ How to choose the best tech stack?',
      query: 'Explain why this tech stack was chosen and how to defend it to our project guide.'
    },
    {
      label: '📋 Give me an SRS checklist',
      query: 'What IEEE standard sections must be in my SRS and synopsis documentation?'
    },
    {
      label: '🚀 Suggest a killer unique feature',
      query: 'Suggest an innovative high-impact feature that will make our project stand out from others.'
    }
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate Kuchu Puchu intelligent reasoning
    setTimeout(() => {
      let reply = '';
      let actionButton: ChatMessage['actionButton'] = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('viva') || lower.includes('examiner') || lower.includes('questions')) {
        reply = `🎓 **Kuchu Puchu's Viva Defense Strategy:**\n\n1. **Core Architecture Flow**: Evaluators always ask: *"What happens when a user clicks submit?"* Trace the request from React frontend -> API gateway -> Backend worker -> Database -> Response.\n2. **Database Justification**: Be ready with why you chose relational vs NoSQL. For instance, ACID compliance and structured foreign key relations.\n3. **Trade-offs**: Acknowledge your project's limits before they point it out! Say: *"While our MVP handles single-node instances, our Phase 2 roadmap introduces Redis caching for concurrent scaling."*\n\nWant to practice interactive mock Viva flashcards?`;
        if (activeProject) {
          actionButton = {
            label: `Open ${activeProject.title} Viva Prep`,
            path: `/projects/${activeProject.id}/viva`
          };
        }
      } else if (lower.includes('tech stack') || lower.includes('technologies') || lower.includes('fastapi') || lower.includes('django')) {
        reply = `💡 **Kuchu Puchu's Guide-Proof Justification:**\n\nWhen professors ask *"Why not standard PHP or Java?"*, tell them:\n- **Type-Safety & Velocity**: TypeScript and Python Pydantic eliminate 60% of runtime data corruption bugs.\n- **Modern Industry Standard**: Top tech enterprises build on asynchronous microservices.\n- **Scalable Decoupling**: Having a separate frontend and RESTful API ensures you can swap web for mobile without rewriting business logic!`;
      } else if (lower.includes('srs') || lower.includes('synopsis') || lower.includes('document')) {
        reply = `📝 **IEEE-Compliant SRS Checklist from Kuchu Puchu:**\n\n1. **Functional Requirements (FRs)**: Explicit user roles, authentication, CRUD actions.\n2. **Non-Functional Requirements (NFRs)**: Sub-second response latency, encryption at rest, 99% uptime.\n3. **UML Diagrams**: Class diagram, Sequence flow, and Component topology.\n\nYou can generate and export pre-written drafts right inside ProjectMentor!`;
        if (activeProject) {
          actionButton = {
            label: 'View Documentation Generator',
            path: `/projects/${activeProject.id}/documentation`
          };
        }
      } else if (lower.includes('feature') || lower.includes('innovative') || lower.includes('unique')) {
        reply = `✨ **Kuchu Puchu's Differentiator Recommendation:**\n\nAdd an **Offline-First PWA Sync** or **Real-Time Anomaly Audit Logger**! Evaluators love projects that solve unexpected real-world edge cases (like network drops or malicious payload injection).`;
        if (activeProject) {
          actionButton = {
            label: 'Explore Project Improvements',
            path: `/projects/${activeProject.id}/improvements`
          };
        }
      } else if (lower.includes('roadmap') || lower.includes('timeline') || lower.includes('deadline')) {
        reply = `📅 **Sprint Advice from Kuchu Puchu:**\n\nFocus strictly on your **MVP deliverables** first! Finish the core pipeline before polishing UI animations. Once your main data loop works, you have a defensible project even if external APIs have downtime.`;
        if (activeProject) {
          actionButton = {
            label: 'Review 8-Week Roadmap',
            path: `/projects/${activeProject.id}/roadmap`
          };
        }
      } else {
        reply = `🤖 **Kuchu Puchu here!** I analyzed your inquiry. For your **${activeProject?.title || 'capstone project'}**, always emphasize measurable results in your presentation: cite latency reduction, extraction precision percentage, and clear system boundaries. Anything specific you'd like me to draft or review?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `kuchu_${Date.now()}`,
          sender: 'kuchu',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionButton
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Mascot Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-center gap-3 select-none animate-pop-in">
          {/* Welcome Speech Bubble with subtle bounce animation */}
          {showWelcomeBubble && (
            <div
              onClick={() => {
                setIsOpen(true);
                setShowWelcomeBubble(false);
              }}
              className="relative hidden sm:flex flex-col bg-white/95 backdrop-blur-md p-3.5 pr-8 rounded-2xl shadow-xl border border-indigo-200/90 max-w-[280px] text-left cursor-pointer group hover:border-indigo-400 transition-colors animate-welcome-bubble animate-float-subtle"
            >
              {/* Dismiss button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcomeBubble(false);
                }}
                className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Dismiss welcome note"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Kuchu Puchu AI Mentor
                </span>
              </div>

              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                👋 Welcome, <strong className="text-indigo-950 font-bold">{studentName}</strong>! I'm here to guide your project and ace your Viva defense!
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setShowWelcomeBubble(false);
                    handleSendMessage('What top 3 questions will external examiners ask in my Viva defense?');
                  }}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
                >
                  🎯 Viva Defense
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setShowWelcomeBubble(false);
                    handleSendMessage('Explain why this tech stack was chosen for my project.');
                  }}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                >
                  ⚡ Architecture
                </button>
              </div>
            </div>
          )}

          {/* Floating Avatar with subtle idle bounce motion */}
          <div className="relative animate-float-subtle">
            <button
              onClick={() => {
                setIsOpen(true);
                setShowWelcomeBubble(false);
              }}
              className="group relative flex items-center justify-center h-15 w-15 sm:h-16 sm:w-16 rounded-full p-0.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-2xl hover:shadow-indigo-500/35 transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-white focus:outline-none"
              aria-label="Open Kuchu Puchu AI Assistant"
            >
              {/* Subtle background glow effect */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xs group-hover:opacity-60 transition-opacity" />

              <div className="relative h-full w-full rounded-full overflow-hidden bg-slate-900 ring-1 ring-white/30">
                <img
                  src={kuchuPuchuAvatar}
                  alt="Kuchu Puchu AI Assistant"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Online Indicator Badge */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white items-center justify-center text-[9px] text-white font-bold">
                  ✓
                </span>
              </span>

              {/* Sparkle Badge */}
              <span className="absolute -top-1 -left-1 flex h-5 w-5 rounded-full bg-indigo-600 ring-2 ring-white items-center justify-center text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transition-all duration-300 animate-pop-in ${
            isMinimized
              ? 'w-80 h-16'
              : 'w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 px-4 flex items-center justify-between border-b border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full ring-2 ring-indigo-400/40 overflow-hidden bg-slate-800">
                <img
                  src={kuchuPuchuAvatar}
                  alt="Kuchu Puchu"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">Kuchu Puchu</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                    AI Mentor
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span>Online</span>
                  <span>•</span>
                  <span>Ready to ace your Viva 🎓</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Secondary Navigation Tabs */}
              <div className="flex items-center border-b border-slate-100 bg-slate-50/80 px-3 py-1.5 gap-2 text-xs">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('quickTips')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    activeTab === 'quickTips'
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quick Tips
                </button>
                <button
                  onClick={() => setActiveTab('vivaPrep')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    activeTab === 'vivaPrep'
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Viva Simulator
                </button>
              </div>

              {/* Chat View */}
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'kuchu' && (
                          <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-indigo-200">
                            <img
                              src={kuchuPuchuAvatar}
                              alt="Kuchu Puchu"
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div
                          className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-xs'
                              : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                          }`}
                        >
                          <div className="whitespace-pre-line space-y-1.5">
                            {msg.text}
                          </div>

                          {msg.actionButton && (
                            <div className="mt-2.5 pt-2 border-t border-slate-100">
                              <button
                                onClick={() => {
                                  if (msg.actionButton) {
                                    navigate(msg.actionButton.path);
                                    setIsOpen(false);
                                  }
                                }}
                                className="w-full py-1.5 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-between text-[11px] transition-colors"
                              >
                                <span>{msg.actionButton.label}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          <div
                            className={`text-[10px] mt-1 text-right ${
                              msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-2.5 items-center">
                        <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 ring-1 ring-indigo-200">
                          <img
                            src={kuchuPuchuAvatar}
                            alt="Kuchu Puchu"
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs px-3.5 py-2 shadow-xs flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-500 font-medium">Kuchu Puchu is thinking</span>
                          <span className="flex gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Preset Prompt Pills */}
                  <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
                    {quickPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(p.query)}
                        className="whitespace-nowrap shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/70 transition-all hover:border-indigo-300"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Input Box */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="p-2.5 bg-white border-t border-slate-200/80 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Kuchu Puchu about architecture, viva, tech..."
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors shadow-xs"
                      aria-label="Send message"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Quick Tips Tab */}
              {activeTab === 'quickTips' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
                  <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl">
                    <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Kuchu Puchu's Golden Rules for College Projects
                    </h4>
                    <p className="text-indigo-800/90 leading-relaxed text-[11px]">
                      Follow these 4 cardinal rules to make professors and recruiters applaud your final year capstone:
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                      <p className="font-bold text-slate-800">1. Clear Problem Statement</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Never say "we built an app". Say: "We solved the 75% ATS rejection rate for college applicants via NLP extraction."
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                      <p className="font-bold text-slate-800">2. Real Architectural Diagram</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Have your Component Flow diagram and Database Schema ready on slide 4. Evaluators check data flow before UI.
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                      <p className="font-bold text-slate-800">3. Live Demo Resilience</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Always have a recorded 60-second backup video of your working project in case college WiFi drops!
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                      <p className="font-bold text-slate-800">4. Quantifiable Metric</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Mention at least one metric: e.g. "reduced parsing time from 15s to 1.2s" or "92% accuracy on 50 test samples".
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Viva Prep Tab */}
              {activeTab === 'vivaPrep' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
                  <div className="p-3 bg-purple-50/80 border border-purple-100 rounded-xl">
                    <h4 className="font-bold text-purple-900 mb-1 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-purple-600" />
                      Mock Viva Examiner Simulation
                    </h4>
                    <p className="text-purple-800/90 text-[11px]">
                      Kuchu Puchu simulates your actual external evaluator. Click any prompt to test your defense!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        handleSendMessage('Simulate an examiner asking me: What is the main security risk in your architecture and how did you prevent it?');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all shadow-xs group"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 block">
                        🛡️ Security & Vulnerability Question
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        "What happens if an attacker uploads a malicious binary payload?"
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        handleSendMessage('Simulate an examiner asking me: What database concurrency issues could occur under 1000 concurrent users?');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all shadow-xs group"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 block">
                        ⚡ Scalability & Concurrency Question
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        "How does your backend scale if 1,000 students upload simultaneously?"
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        handleSendMessage('Simulate an examiner asking: Why did you pick this specific algorithm over simpler approaches?');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all shadow-xs group"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 block">
                        🧠 Algorithm & Mathematical Rationale
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        "Why did you choose this algorithm over simpler heuristic models?"
                      </span>
                    </button>
                  </div>

                  {activeProject && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          navigate(`/projects/${activeProject.id}/viva`);
                          setIsOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>Open Full Viva Question Bank</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
