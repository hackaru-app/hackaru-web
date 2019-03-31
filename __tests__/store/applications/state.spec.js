import { state } from '@/store/applications';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ items: [] });
  });
});
