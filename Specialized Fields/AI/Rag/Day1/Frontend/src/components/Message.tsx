import type {Message as MessageType} from '../types';

interface MessageProps {
  msg: MessageType;
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

export default function Message({msg}: MessageProps) {
  const isChef = msg.role === 'assistant';
  return (
    <div className={`msg ${isChef ? 'chef' : 'user'}`}>
      <div className="msg-avatar">{isChef ? '👨‍🍳' : '🧑'}</div>
      <div
        className="bubble"
        dangerouslySetInnerHTML={{__html: formatText(msg.content)}}
      />
    </div>
  );
}

export function TypingDots() {
  return (
    <div className="typing-dots">
      <span />
      <span />
      <span />
    </div>
  );
}
