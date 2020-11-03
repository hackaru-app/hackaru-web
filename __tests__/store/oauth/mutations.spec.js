import { mutations } from '@/store/oauth';

describe('Mutations', () => {
  describe('when commit SET_CLIENT', () => {
    const state = { client: {} };

    beforeEach(() => {
      mutations['SET_CLIENT'](state, {
        clientName: 'Hackaru for Desktop',
        scope: 'activity:create activity:update',
        responseType: 'token',
        state: 'state',
      });
    });

    it('sets client', () => {
      expect(state.client).toEqual({
        name: 'Hackaru for Desktop',
        scopes: ['activity:create', 'activity:update'],
        responseType: 'token',
        state: 'state',
      });
    });
  });
});
