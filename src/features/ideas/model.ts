export const categories = [
  'Developer tools',
  'Productivity',
  'Creator tools',
  'Local business',
  'Learning',
  'Personal life',
  'Community'
] as const;

export const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type Category = (typeof categories)[number];
export type Difficulty = (typeof difficulties)[number];

export type Idea = {
  id: string;
  name: string;
  category: Category;
  problem: string;
  audience: string;
  solution: string;
  difficulty: Difficulty;
  hours: number;
  budget: readonly [min: number, max: number];
  monetization: string;
  stack: readonly string[];
  dependencies: 'None' | 'One integration' | 'Multiple integrations';
};

export type Filters = {
  category: Category | '';
  difficulty: Difficulty | '';
  hours: number | null;
  budget: number | null;
};

export const defaultFilters: Filters = {
  category: '',
  difficulty: '',
  hours: null,
  budget: null
};

export function filterIdeas(ideas: readonly Idea[], filters: Filters) {
  return ideas.filter(
    (idea) =>
      (!filters.category || idea.category === filters.category) &&
      (!filters.difficulty || idea.difficulty === filters.difficulty) &&
      (filters.hours === null || idea.hours <= filters.hours) &&
      (filters.budget === null || idea.budget[1] <= filters.budget)
  );
}

export function pickIdea(
  matches: readonly Idea[],
  previousId: string,
  random = Math.random
): Idea | undefined {
  const pool = matches.length > 1 ? matches.filter((idea) => idea.id !== previousId) : matches;
  return pool[Math.floor(random() * pool.length)];
}

const scopePoints: Record<Difficulty, number> = { Beginner: 30, Intermediate: 24, Advanced: 16 };
const dependencyPoints: Record<Idea['dependencies'], number> = {
  None: 20,
  'One integration': 14,
  'Multiple integrations': 8
};

export function scoreIdea(idea: Idea) {
  const [, maxBudget] = idea.budget;
  const factors = [
    {
      name: 'Build complexity',
      label: idea.difficulty,
      points: scopePoints[idea.difficulty],
      max: 30
    },
    {
      name: 'Build time',
      label: `${idea.hours} hours`,
      points:
        idea.hours <= 4
          ? 30
          : idea.hours <= 8
            ? 26
            : idea.hours <= 16
              ? 22
              : idea.hours <= 32
                ? 16
                : 10,
      max: 30
    },
    {
      name: 'Startup cost',
      label: maxBudget === 0 ? 'Free' : `Up to $${maxBudget}`,
      points: maxBudget === 0 ? 20 : maxBudget <= 25 ? 16 : maxBudget <= 50 ? 12 : 8,
      max: 20
    },
    {
      name: 'External dependencies',
      label: idea.dependencies,
      points: dependencyPoints[idea.dependencies],
      max: 20
    }
  ];

  return { total: factors.reduce((total, factor) => total + factor.points, 0), factors };
}
