import React, {useState, useEffect, useRef, useCallback} from 'react';
import type {Message, ChatMessage, Model} from './types';
import Header from './components/Header';
import SettingsBar from './components/SettingsBar';
import Chat from './components/Chat';
import InputArea from './components/InputArea';

const SUGGESTIONS: string[] = [
  'I have chicken, garlic & pasta',
  'Quick 20-minute dinner',
  'Something vegetarian tonight',
  'I have leftovers to use up'
];

const TEMP_LABELS: string[] = [
  'By the book',
  'Classic',
  'Balanced',
  'Inspired',
  'Wild & creative'
];

const MODELS: Model[] = [
  {value: 'gpt-4o-mini', label: 'GPT-4o Mini'},
  {value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo'}
];

// Main App
export default function App(): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(65);
  const [model, setModel] = useState<string>('gpt-4o-mini');

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController>(null);
  const hasGreeted = useRef<boolean>(false);

  const tempValue = parseFloat((temperature / 100).toFixed(2));

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Stream handler
  const fetchReply = useCallback(
    async (history: ChatMessage[]) => {
      setLoading(true);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // Add a placeholder for streaming
      const placeholderId = Date.now() + 1; // Offset to avoid duplicate keys with the user message
      setMessages((prev) => [
        ...prev,
        {id: placeholderId, role: 'assistant', content: '', streaming: true}
      ]);

      try {
        const res = await fetch('http://127.0.0.1:8000/api/chat/stream', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          signal: controller.signal,
          body: JSON.stringify({
            messages: history,
            temperature: tempValue,
            model
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || `HTTP ${res.status}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, {stream: true});

          setMessages((prev) =>
            prev.map((m) =>
              m.id === placeholderId ? {...m, content: accumulated} : m
            )
          );
        }

        // Finalize — remove streaming flag
        setMessages((prev) =>
          prev.map((m) =>
            m.id === placeholderId
              ? {...m, content: accumulated, streaming: false}
              : m
          )
        );

        return accumulated;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === placeholderId
              ? {
                  ...m,
                  content: `⚠️ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
                  streaming: false
                }
              : m
          )
        );
      } finally {
        setLoading(false);
        setStreaming(false);
        inputRef.current?.focus();
      }
    },
    [tempValue, model]
  );

  // Greet on load
  useEffect(() => {
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      fetchReply([
        {role: 'user', content: "Hello Chef, I'm ready to cook something!"}
      ]);
    }
  }, [fetchReply]);

  // Send message
  const sendMessage = useCallback(
    async (text?: string) => {
      const trimmed = (text || input).trim();
      if (!trimmed || loading) return;

      setInput('');
      const userMsg: Message = {id: Date.now(), role: 'user', content: trimmed};
      const nextHistory: ChatMessage[] = [...messages, userMsg].map(
        ({role, content}) => ({
          role,
          content
        })
      );
      setMessages((prev) => [...prev, userMsg]);
      await fetchReply(nextHistory);
    },
    [input, loading, messages, fetchReply]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <Header />
      <SettingsBar
        temperature={temperature}
        setTemperature={setTemperature}
        model={model}
        setModel={setModel}
        tempLabels={TEMP_LABELS}
        models={MODELS}
      />
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        suggestions={SUGGESTIONS}
        chatRef={chatRef}
      />
      <InputArea
        input={input}
        setInput={setInput}
        loading={loading}
        streaming={streaming}
        sendMessage={sendMessage}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
