import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { ARTIST_INFO, ARTWORKS, CATEGORIES } from '../data/artworks';

interface ChatbotProps {
  onOpenContact: () => void;
}

interface ChatMessage {
  id: number;
  role: 'assistant' | 'visitor';
  text: string;
  showContactAction?: boolean;
}

interface ChatAnswer {
  text: string;
  showContactAction?: boolean;
}

const suggestedQuestions = ['What do you create?', 'Where are you based?'];

function answerQuestion(question: string): ChatAnswer {
  const normalizedQuestion = question.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

  if (/\b(price|prices|cost|costs|available|availability|delivery|shipping)\b/.test(normalizedQuestion)) {
    return {
      text: "I don't know that from the information on this website. Please contact the artist.",
      showContactAction: true,
    };
  }

  if (/\b(hi|hello|hey)\b/.test(normalizedQuestion)) {
    return { text: `Hello! Welcome to ${ARTIST_INFO.brandName}. What would you like to know?` };
  }

  if (/\b(contact|phone|whatsapp|email|instagram|reach)\b/.test(normalizedQuestion)) {
    return {
      text: 'Please contact the artist using the contact options below.',
      showContactAction: true,
    };
  }

  const artwork = ARTWORKS.find((item) =>
    normalizedQuestion.includes(item.title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')),
  );

  if (artwork) {
    const details = [
      artwork.description,
      artwork.medium && `Medium: ${artwork.medium}.`,
      artwork.dimensions && `Dimensions: ${artwork.dimensions}.`,
    ].filter(Boolean);

    return { text: `${artwork.title} (${artwork.category}): ${details.join(' ')}` };
  }

  if (/\b(where|location|located|based|city)\b/.test(normalizedQuestion)) {
    return { text: `${ARTIST_INFO.brandName} is based in ${ARTIST_INFO.location}.` };
  }

  if (/\b(who|artist|about|story)\b/.test(normalizedQuestion)) {
    return { text: `${ARTIST_INFO.aboutHeadline} ${ARTIST_INFO.aboutBio}` };
  }

  if (/\b(custom|personalized|personalised|commission)\b/.test(normalizedQuestion)) {
    return {
      text: 'The portfolio says artwork can be created according to individual ideas and requirements. Please contact the artist to discuss details.',
      showContactAction: true,
    };
  }

  const category = CATEGORIES.find((item) =>
    normalizedQuestion.includes(item.name.toLowerCase()) ||
    (item.id === 'ganesh-idols' && normalizedQuestion.includes('ganesh')),
  );

  if (category) {
    const artworkTitles = ARTWORKS
      .filter((item) => item.categorySlug === category.id)
      .map((item) => item.title)
      .join(', ');

    return {
      text: `${category.shortDesc} The portfolio includes ${category.count} ${category.name.toLowerCase()} artworks, including ${artworkTitles}.`,
    };
  }

  if (/\b(create|make|craft|art|artwork|work|portfolio|category|categories|types)\b/.test(normalizedQuestion)) {
    return {
      text: CATEGORIES.map((item) => `${item.name}: ${item.shortDesc}`).join('\n'),
    };
  }

  return {
    text: "I don't know that from the information on this website. Please contact the artist.",
    showContactAction: true,
  };
}

export function Chatbot({ onOpenContact }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'assistant',
      text: `Hello! I'm here to answer questions about ${ARTIST_INFO.brandName}.`,
    },
  ]);
  const nextMessageId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendQuestion = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const answer = answerQuestion(trimmedQuestion);
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextMessageId.current++, role: 'visitor', text: trimmedQuestion },
      {
        id: nextMessageId.current++,
        role: 'assistant',
        text: answer.text,
        showContactAction: answer.showContactAction,
      },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-labelledby="chatbot-title"
          className="flex max-h-[min(34rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-[#35343a] bg-[#111116] shadow-2xl shadow-black/40 animate-fadeIn"
          id="chatbot-panel"
          role="dialog"
        >
          <header className="flex items-center justify-between border-b border-[#272733] bg-charcoal-850 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                <MessageCircle aria-hidden="true" size={18} />
              </span>
              <div>
                <h2 id="chatbot-title" className="text-sm font-semibold text-cream-100">
                  {ARTIST_INFO.brandName}
                </h2>
                <p className="text-xs text-cream-400">Portfolio assistant</p>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="rounded p-2 text-cream-400 transition-colors hover:bg-white/5 hover:text-cream-100 focus-visible:outline-2 focus-visible:outline-gold-400"
              onClick={() => {
                setIsOpen(false);
                launcherRef.current?.focus();
              }}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex min-h-48 flex-1 flex-col gap-3 overflow-y-auto p-4"
            ref={messageListRef}
            role="log"
          >
            {messages.map((message) => (
              <div
                className={`max-w-[90%] rounded-lg px-3.5 py-2.5 text-sm leading-5 ${
                  message.role === 'visitor'
                    ? 'self-end bg-gold-500 text-[#17130b]'
                    : 'self-start border border-[#2d2c33] bg-charcoal-800 text-cream-200'
                }`}
                key={message.id}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.showContactAction && (
                  <button
                    className="mt-2 inline-flex items-center gap-1.5 font-medium text-gold-300 underline decoration-gold-300/50 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-gold-400"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenContact();
                    }}
                    type="button"
                  >
                    Contact the artist
                  </button>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    className="rounded-full border border-[#45434a] px-3 py-1.5 text-left text-xs text-[#ded7c8] transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-gold-400"
                    key={question}
                    onClick={() => sendQuestion(question)}
                    type="button"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="flex items-center gap-2 border-t border-[#272733] p-3" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chatbot-message">
              Ask a question
            </label>
            <input
              autoComplete="off"
              className="min-w-0 flex-1 rounded border border-[#35343a] bg-[#0a0a0d] px-3 py-2.5 text-sm text-cream-200 placeholder:text-[#817c72] focus:border-gold-500 focus:outline-none"
              id="chatbot-message"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the artwork..."
              ref={inputRef}
              value={input}
            />
            <button
              aria-label="Send question"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gold-500 text-[#17130b] transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!input.trim()}
              type="submit"
            >
              <Send aria-hidden="true" size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        aria-controls="chatbot-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/40 bg-gold-500 text-[#17130b] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
        onClick={() => setIsOpen((open) => !open)}
        ref={launcherRef}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={22} /> : <MessageCircle aria-hidden="true" size={23} />}
      </button>
    </div>
  );
}