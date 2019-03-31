import { state } from '@/store/webhooks';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ items: [] });
  });
});
