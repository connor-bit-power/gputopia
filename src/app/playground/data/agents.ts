export const types = ['Mistral'] as const

export type ModelType = (typeof types)[number]

export interface Agent<Type = string> {
  id: string
  name: string
  instructions: string
  type: Type
}

export const agents = [
    {
      id: 'agent-1',
      name: 'Finance Agent',
      description: 'Specializes in financial advice.',
      type: 'Finance',
    },
    {
      id: 'agent-2',
      name: 'Agent 007',
      description: 'Specializes in espionage.',
      type: 'Espionage',
    },
    {
      id: 'agent-3',
      name: 'Coding Agent',
      description: 'Specializes in software development.',
      type: 'Development',
    },
    // ... more agents
  ];