import { state } from '@/store/auth';

describe('State', () => {
  it('has initial state correctly', () => {
    expect(state()).toEqual({
      id: undefined,
      email: '',
      refreshToken: '',
      clientId: '',
      accessToken: ''
    });
  });
});
