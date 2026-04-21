import type {Message as MessageType} from '../types';
import Message, {TypingDots} from './Message';

interface ChatProps {
  messages: MessageType[];
  sendMessage: (text?: string) => void;
  suggestions: string[];
  chatRef: React.RefObject<HTMLDivElement | null>;
}

export default function Chat({
  messages,
  sendMessage,
  suggestions,
  chatRef
}: ChatProps) {
  return (
    <div className="chat" ref={chatRef}>
      {messages.length === 0 && (
        <div className="welcome">
          <h2>Benvenuto nella cucina!</h2>
          <p>
            Tell me what ingredients you have — or what kind of meal you're in
            the mood for.
            <br />
            I'll guide you to something delicious, one step at a time.
          </p>
          <div className="suggestions">
            {suggestions.map((s) => (
              <button
                key={s}
                className="suggestion-btn"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg) =>
        msg.streaming && msg.content === '' ? (
          <div key={msg.id} className="msg chef">
            <div className="msg-avatar">👨‍🍳</div>
            <div className="bubble">
              <TypingDots />
            </div>
          </div>
        ) : (
          <Message key={msg.id} msg={msg} />
        )
      )}
    </div>
  );
}
