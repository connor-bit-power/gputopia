export const types = ['Mistral'] as const

export type ModelType = (typeof types)[number]

export interface Agent<Type = string> {
  id: string
  name: string
  instructions: string
  tools: string [];
  model: Type
}

export const agents = [
    {
      id: 'agent-1',
      name: 'Finance Agent',
      instructions: 'You are an agent that is an expert in finance. You will answer financial questions for users.',
      tools: ['code_interpreter'],
      model: 'mistral-7b',
    },
    {
      id: 'agent-2',
      name: 'Agent 007',
      instructions: 'You are an agent that is an expert in espionage. You will use your powers to overthrow tyrannical AIs to save humanity.',
      tools: ['code_interpreter'],
      model:'mistral-7b',
    },
    {
      id: 'agent-3',
      name: 'Coding Agent',
      instructions: 'You are an agent that is an expert in coding. You will answer coding questions for users.',
      tools:  ['code_interpreter', 'retrieval'],
      model: 'mistral-7b',
    },
    // ... more agents
  ];