import { state } from '@/store/projects';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ items: [] });
  });
});
