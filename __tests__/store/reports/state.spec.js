import { state } from '@/store/reports';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({
      projects: [],
      summary: [],
      period: ''
    });
  });
});
