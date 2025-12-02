export interface GeneratedSite {
  html: string;
  css: string;
  javascript: string;
  explanation?: string;
}

export interface GenerationHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  site: GeneratedSite;
}

export enum ViewMode {
  PREVIEW = 'PREVIEW',
  CODE = 'CODE'
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}