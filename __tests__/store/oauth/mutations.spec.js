import { mutations } from '@/store/oauth';

describe('Mutations', () => {
  let state;

  describe('when commit SET_CLIENT', () => {
    beforeEach(() => {
      state = { client: {} };
      mutations['SET_CLIENT'](state, {
        clientName: 'Example',
        scope: 'activity:create activity:update',
        responseType: 'token',
        state: 'state'
      });
    });

    it('set client', () => {
      expect(state.client).toEqual({
        name: 'Example',
        scopes: ['activity:create', 'activity:update'],
        responseType: 'token',
        state: 'state'
      });
    });
  });
});
