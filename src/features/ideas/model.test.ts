import { describe, expect, test } from 'bun:test';
import { ideas, starterIdea } from './catalog';
import { categories, defaultFilters, filterIdeas, pickIdea, scoreIdea } from './model';

describe('idea catalog', () => {
  test('covers every category with unique, fully described ideas', () => {
    expect(ideas.length).toBeGreaterThanOrEqual(36);
    expect(new Set(ideas.map((idea) => idea.id)).size).toBe(ideas.length);
    for (const category of categories) {
      expect(ideas.filter((idea) => idea.category === category).length).toBeGreaterThan(0);
    }
    for (const idea of ideas) {
      expect(idea.hours).toBeGreaterThan(0);
      expect(idea.budget[0]).toBeGreaterThanOrEqual(0);
      expect(idea.budget[1]).toBeGreaterThanOrEqual(idea.budget[0]);
      expect(idea.stack.length).toBeGreaterThan(0);
      for (const text of [
        idea.name,
        idea.problem,
        idea.audience,
        idea.solution,
        idea.monetization
      ]) {
        expect(text.trim()).not.toBe('');
      }
    }
  });
});

describe('idea filters', () => {
  test('all ideas match when filters are unset', () => {
    expect(filterIdeas(ideas, defaultFilters)).toEqual([...ideas]);
  });

  test('combines filters with inclusive time and maximum budget limits', () => {
    const filters = {
      ...defaultFilters,
      category: 'Developer tools',
      difficulty: 'Beginner',
      hours: 8,
      budget: 0
    } as const;
    expect(filterIdeas(ideas, filters).map((idea) => idea.id)).toEqual([
      'release-receipt',
      'json-pocket',
      'dependency-notebook'
    ]);
    expect(filterIdeas(ideas, { ...filters, hours: 4 }).map((idea) => idea.id)).toEqual([
      'json-pocket'
    ]);
  });

  test('excludes projects whose upper cost estimate exceeds the budget', () => {
    const filters = { ...defaultFilters, category: 'Local business' } as const;
    const ids = (budget: number) =>
      filterIdeas(ideas, { ...filters, budget }).map((idea) => idea.id);
    expect(ids(34)).not.toContain('opening-check');
    expect(ids(35)).toContain('opening-check');
  });

  test('does not widen an impossible query', () => {
    const filters = { ...defaultFilters, difficulty: 'Advanced', hours: 4, budget: 0 } as const;
    expect(filterIdeas(ideas, filters)).toEqual([]);
  });
});

describe('random selection', () => {
  const [first, second, third] = ideas;

  test('picks from the full remaining pool without immediately repeating the previous idea', () => {
    const matches = [first, second, third];
    expect(pickIdea(matches, first.id, () => 0)).toBe(second);
    expect(pickIdea(matches, first.id, () => 0.999)).toBe(third);
    expect(pickIdea(matches, 'outside-the-pool', () => 0)).toBe(first);
    expect(pickIdea(matches, second.id, () => 0)).toBe(first);
  });

  test('allows a repeat when only one idea matches and returns no idea for an empty pool', () => {
    expect(pickIdea([first], first.id, () => 0)).toBe(first);
    expect(pickIdea([], first.id, () => 0)).toBeUndefined();
  });
});

describe('feasibility', () => {
  test('shows the same score that the displayed factors add up to', () => {
    const { total, factors } = scoreIdea(starterIdea);
    expect(total).toBe(96);
    expect(factors.reduce((sum, factor) => sum + factor.max, 0)).toBe(100);
    expect(factors.reduce((sum, factor) => sum + factor.points, 0)).toBe(total);
    for (const idea of ideas) expect(scoreIdea(idea).total).toBeLessThanOrEqual(100);
  });
});
