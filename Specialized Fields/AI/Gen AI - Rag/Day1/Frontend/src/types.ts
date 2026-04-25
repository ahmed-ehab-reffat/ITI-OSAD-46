export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Model {
  value: string;
  label: string;
}
