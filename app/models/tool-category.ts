import type { Tool } from './tool'

export interface ToolCategory {
  title: string;
  url: string;
  tools: Tool[];
}