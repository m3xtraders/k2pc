"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  Phone,
  RotateCcw,
  CheckCircle2,
  Bot,
  ShieldCheck,
  ChevronDown,
  Clock,
} from "lucide-react";

interface ChatWidgetProps {
  companyDetails?: any;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  leadCaptured?: {
    id: string;
    name: string;
    phone: string;
    service?: string;
    city?: string;
  };
}

export function ChatWidget({ companyDetails }: ChatWidgetProps) {
  const isEnabled = companyDetails?.chatbotEnabled ?? true;
  const botName = companyDetails?.chatbotName || "K2 Pest Assistant";
  const phone = companyDetails?.phone || "(416) 555-0199";
  const phoneRaw = companyDetails?.phoneRaw || "4165550199";

  const initialGreeting =
    companyDetails?.chatbotGreeting ||
    "👋 Hello! I'm your 24/7 K2 Pest Control assistant. How can I help you today? Ask about pricing, safe treatments, or book a fast inspection!";

  const quickPrompts: string[] = companyDetails?.chatbotQuickPrompts || [
    "💰 How much does pest removal cost?",
    "🚨 Do you offer 24/7 emergency service?",
    "🐜 How do I prepare for ant treatment?",
    "📅 Can I book a pest inspection?",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      text: initialGreeting,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  if (!isEnabled) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: messageContent,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setLoading(true);
    setHasInteracted(true);

    try {
      // Map history for Gemini API
      const apiMessages = newHistory.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.response || "Our team is here to help! Please call us at " + phone,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        leadCaptured: data.leadCaptured,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: `I'm having trouble connecting right now. Please call our 24/7 emergency dispatch directly at **${phone}**!`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        text: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Helper to render formatted markdown-like text
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={partIdx} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");

      return (
        <p key={lineIdx} className={`${isBullet ? "pl-3 text-stone-700" : ""} ${lineIdx > 0 ? "mt-1.5" : ""}`}>
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-3">
        {!isOpen && !hasInteracted && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-stone-900/95 text-white text-xs font-medium rounded-full shadow-xl border border-stone-700/50 backdrop-blur-sm animate-bounce cursor-pointer hover:bg-stone-800 transition-colors"
               onClick={() => setIsOpen(true)}>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Need Fast Pest Help? Chat 24/7</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Chat Assistant" : "Open 24/7 AI Pest Assistant"}
          className={`relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 ${
            isOpen
              ? "w-12 h-12 bg-stone-800 text-stone-200 hover:bg-stone-900 border border-stone-700"
              : "w-14 h-14 bg-gradient-to-tr from-[#BE2320] to-[#E53E3E] text-white hover:shadow-[#BE2320]/30 hover:scale-105"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {/* Online Pulse Badge */}
              <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 md:bottom-22 right-3 md:right-6 z-50 w-[calc(100vw-24px)] sm:w-[420px] h-[580px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-stone-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-labelledby="chat-title"
        >
          {/* Header */}
          <div className="bg-stone-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-stone-800 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#BE2320] flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-stone-900 rounded-full"></span>
              </div>
              <div>
                <h3 id="chat-title" className="font-bold text-sm text-stone-100 flex items-center gap-1.5 leading-tight">
                  {botName}
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
                    24/7 AI
                  </span>
                </h3>
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Licensed Exterminator Advice
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`tel:${phoneRaw}`}
                title={`Call ${phone}`}
                className="p-1.5 text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold px-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Call</span>
              </a>

              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                aria-label="Minimize Chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/60 text-sm">
            {/* Security & License Notice Banner */}
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-stone-700 text-xs flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Need 2-Hour Emergency Dispatch? Call{" "}
                <a href={`tel:${phoneRaw}`} className="font-bold text-[#BE2320] underline">
                  {phone}
                </a>{" "}
                or chat with our AI below for instant quotes!
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#BE2320] text-white rounded-br-none"
                      : "bg-white text-stone-800 border border-stone-200/80 rounded-bl-none"
                  }`}
                >
                  {renderFormattedText(msg.text)}

                  {/* Lead Captured Confirmation Card */}
                  {msg.leadCaptured && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Inspection Request Dispatched!</span>
                      </div>
                      <p className="text-[11px] text-emerald-800/90 leading-tight">
                        We have logged your request for <strong>{msg.leadCaptured.name}</strong> ({msg.leadCaptured.phone}). A licensed GTA exterminator is reviewing your file.
                      </p>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-stone-200/80 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2 text-xs text-stone-500">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BE2320]" />
                  <span>{botName} is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          {messages.length <= 2 && !loading && (
            <div className="px-3 py-2 bg-stone-100/80 border-t border-stone-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 text-[11px] font-medium bg-white hover:bg-stone-50 text-stone-700 hover:text-[#BE2320] px-2.5 py-1.5 rounded-lg border border-stone-200/90 shadow-2xs transition-all hover:border-[#BE2320]/40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or book inspection..."
              disabled={loading}
              className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BE2320] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#BE2320] hover:bg-[#961c1a] text-white rounded-xl shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Disclaimer */}
          <div className="bg-stone-50 px-3 py-1 text-[10px] text-stone-400 text-center border-t border-stone-100">
            Powered by Google AI • 24/7 Dispatch Hotline: <a href={`tel:${phoneRaw}`} className="underline text-stone-600">{phone}</a>
          </div>
        </div>
      )}
    </>
  );
}
