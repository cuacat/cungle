export interface Ritual {
  id: string;
  title: string;
  description: string;
  preparation?: string[];
  prayer: string;
  notes?: string;
  category: 'recurring' | 'lunar-year' | 'death-anniversary' | 'cleaning' | 'mantra';
}

export interface Mantra {
  id: string;
  title: string;
  content: string;
  description: string;
}
