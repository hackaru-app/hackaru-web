import { mutations } from '~/store/auth';

describe('Mutations', () => {
  describe('when commit LOGIN', () => {
    const state = { id: undefined, email: '' };

    beforeEach(() => {
      mutations['LOGIN'](state, {
        id: 1,
        email: 'example@example.com',
      });
    });

    it('sets userId', () => {
      expect(state.id).toBe(1);
    });

    it('sets email', () => {
      expect(state.email).toBe('example@example.com');
    });

    it('sets loggedIn to true', () => {
      expect(state.loggedIn).toBe(true);
    });
  });

  describe('when commit LOGOUT', () => {
    const state = {
      id: 1,
      email: 'example@example.com',
      loggedIn: true,
    };

    beforeEach(() => {
      mutations['LOGOUT'](state);
    });

    it('clears userId', () => {
      expect(state.id).toBeUndefined();
    });

    it('clears email', () => {
      expect(state.email).toBe('');
    });

    it('sets loggedIn to false', () => {
      expect(state.loggedIn).toBe(false);
    });
  });

  describe('when commit SET_EMAIL', () => {
    const state = {
      email: '',
    };

    beforeEach(() => {
      mutations['SET_EMAIL'](state, 'example@example.com');
    });

    it('sets email', () => {
      expect(state.email).toBe('example@example.com');
    });
  });
});
