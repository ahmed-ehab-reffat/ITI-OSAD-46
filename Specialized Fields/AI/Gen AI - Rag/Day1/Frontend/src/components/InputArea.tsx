interface InputAreaProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  streaming: boolean;
  sendMessage: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function InputArea({
  input,
  setInput,
  loading,
  streaming,
  sendMessage,
  inputRef,
  handleKeyDown
}: InputAreaProps) {
  return (
    <div className="input-area">
      <div className="input-row">
        <textarea
          ref={inputRef}
          className="user-input"
          placeholder="Tell Chef Marco what you have in the kitchen…"
          rows={1}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height =
              Math.min(e.currentTarget.scrollHeight, 130) + 'px';
          }}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
        >
          {streaming ? 'Cooking…' : 'Send'}
        </button>
      </div>
      <p className="hint">Enter to send · Shift+Enter for new line</p>
    </div>
  );
}
