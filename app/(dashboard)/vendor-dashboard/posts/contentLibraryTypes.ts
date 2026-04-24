export type TopicChannel = 'blog' | 'blog+linkedin';

export interface LibraryTopic {
  id: string;
  title: string;
  pillar: string;
  tactic: string;
  mustInclude: string[];
  namedEntities: string[];
  primaryDataHook: string;
  wordCount: number;
  channel: TopicChannel;
  linkedInHookType?: string;
  rationale: string;
}

export interface LibraryPillar {
  id: string;
  name: string;
  whyItMatters: string;
  topics: LibraryTopic[];
}

export interface ContentLibraryResponse {
  success: boolean;
  vendorType: string;
  pillars: LibraryPillar[];
  linkedInHookTypes?: Record<string, string>;
  universalRules?: string[];
}
