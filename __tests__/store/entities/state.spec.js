import { state } from '@/store/entities';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({ data: {} });
  });
});
