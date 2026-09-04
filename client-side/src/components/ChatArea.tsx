import { useEffect, useRef, useState } from 'react';
import { FiFeather, FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import type { Message } from '../type/Message';

const MOCK_AI_REPLY = "I've received your message. This is a mock response — the real AI integration will be connected once the backend is available.";

const SUGGESTIONS = ['Research a topic', 'Write something', 'Review my code', 'Make a plan'];

const TypingDots = () => (
    <div className='flex gap-3'>
        <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)]'>
            <FiFeather size={12} />
        </div>
        <div className='flex items-center gap-1 py-2'>
            {[0, 150, 300].map(delay => (
                <span
                    key={delay}
                    className='h-1.5 w-1.5 rounded-full bg-[var(--text-muted)] animate-bounce'
                    style={{ animationDelay: `${delay}ms` }}
                />
            ))}
        </div>
    </div>
);

const ChatArea = () => {
    const { selectedConversation } = useSelector((state: any) => state.conversation);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setMessages([]);
        setIsTyping(false);
        setInput('');
    }, [selectedConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const resizeTextarea = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    };

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isTyping) return;

        const userMsg: Message = {
            _id: `msg-${Date.now()}`,
            conversationId: selectedConversation?._id ?? '',
            role: 'user',
            content: text,
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 600));
        setIsTyping(false);
        setMessages(prev => [
            ...prev,
            {
                _id: `msg-${Date.now()}-ai`,
                conversationId: selectedConversation?._id ?? '',
                role: 'assistant',
                content: MOCK_AI_REPLY,
                createdAt: new Date().toISOString(),
            },
        ]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const inputBar = (
        <div className='flex items-end gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150
                        border-[var(--input-border)] bg-[var(--input-bg)] focus-within:border-[var(--input-focus)]'>
            <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => { setInput(e.target.value); resizeTextarea(); }}
                onKeyDown={handleKeyDown}
                placeholder='Message Friday…'
                className='flex-1 resize-none bg-transparent text-[13px] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none'
                style={{ maxHeight: '160px' }}
            />
            <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition
                           bg-[var(--btn-bg)] text-[var(--btn-text)] hover:opacity-80 disabled:opacity-30'
            >
                <FiSend size={13} />
            </button>
        </div>
    );

    const inputHint = (
        <p className='mt-2 text-center text-[11px] text-[var(--text-muted)]'>
            <kbd className='rounded border px-1 py-0.5 text-[10px] border-[var(--border)]'>Enter</kbd> to send
            {' · '}
            <kbd className='rounded border px-1 py-0.5 text-[10px] border-[var(--border)]'>Shift+Enter</kbd> for new line
        </p>
    );

    // No conversation selected — welcome screen
    if (!selectedConversation) {
        return (
            <div className='flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--icon-bg)] text-[var(--icon-text)]'>
                    <FiFeather size={24} />
                </div>
                <div>
                    <p className='text-[15px] font-semibold text-[var(--text-heading)]'>Friday AI</p>
                    <p className='mt-1 text-sm text-[var(--text-muted)]'>Select a conversation or start a new one from the sidebar</p>
                </div>
                <div className='flex flex-wrap justify-center gap-2'>
                    {SUGGESTIONS.map(label => (
                        <span
                            key={label}
                            className='rounded-full border px-3 py-1.5 text-[12px] text-[var(--text-muted)] border-[var(--border)] bg-[var(--surface)] select-none'
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    // Empty new conversation — centered input
    if (messages.length === 0 && !isTyping) {
        return (
            <div className='flex flex-1 flex-col items-center justify-center gap-5 px-6'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--icon-bg)] text-[var(--icon-text)]'>
                    <FiFeather size={20} />
                </div>
                <p className='text-[15px] font-semibold text-[var(--text-heading)]'>What can I help with?</p>
                <div className='w-full max-w-2xl'>
                    {inputBar}
                    {inputHint}
                </div>
                <div className='flex max-w-2xl flex-wrap justify-center gap-2'>
                    {SUGGESTIONS.map(label => (
                        <button
                            key={label}
                            type='button'
                            onClick={() => { setInput(label); textareaRef.current?.focus(); }}
                            className='rounded-full border px-3 py-1.5 text-[12px] transition
                                       border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]
                                       hover:bg-[var(--list-hover)] hover:text-[var(--text)]'
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Active conversation with messages
    return (
        <div className='flex flex-1 flex-col'>
            {/* Header */}
            <div className='flex flex-none items-center border-b px-5 py-3.5 border-[var(--app-border)]'>
                <p className='truncate text-sm font-medium text-[var(--text)]'>{selectedConversation.title}</p>
            </div>

            {/* Messages */}
            <div className='min-h-0 flex-1 overflow-y-auto px-5 py-5 space-y-5'>
                {messages.map((msg) => (
                    <div key={msg._id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)]'>
                                <FiFeather size={12} />
                            </div>
                        )}
                        <div
                            className={`max-w-[72%] text-[13px] leading-6
                                ${msg.role === 'user'
                                    ? 'rounded-2xl rounded-tr-sm px-4 py-2.5 bg-[var(--user-msg-bg)] text-[var(--user-msg-text)]'
                                    : 'text-[var(--text)]'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && <TypingDots />}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className='flex-none px-5 pb-5 pt-3'>
                {inputBar}
                {inputHint}
            </div>
        </div>
    );
};

export default ChatArea;
