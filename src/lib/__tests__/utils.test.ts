import { cn } from '../utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class', { 'conditional-class': true });
    expect(result).toContain('base-class');
    expect(result).toContain('additional-class');
    expect(result).toContain('conditional-class');
  });

  it('handles conditional classes', () => {
    const result = cn('base-class', { 'true-class': true, 'false-class': false });
    expect(result).toContain('base-class');
    expect(result).toContain('true-class');
    expect(result).not.toContain('false-class');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });
});