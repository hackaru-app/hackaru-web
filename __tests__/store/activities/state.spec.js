import { state } from '@/store/activities';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ items: [] });
  });
});
