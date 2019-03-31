import { state } from '@/store/oauth';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ client: {} });
  });
});
