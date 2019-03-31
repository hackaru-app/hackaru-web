import { getters } from '@/store/oauth';

describe('Getters', () => {
  let params;
  let result;

  beforeEach(() => {
    params = {
      state: {},
      getters: {},
      rootState: {},
      rootGetters: {}
    };
  });

  describe('when call getClient', () => {
    beforeEach(() => {
      params = {
        state: {
          client: {
            name: 'Example',
            scopes: ['activity:create', 'activity:update'],
            responseType: 'token',
            state: 'state'
          }
        }
      };
      result = getters.getClient(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns client', () => {
      expect(result).toEqual({
        name: 'Example',
        scopes: ['activity:create', 'activity:update'],
        responseType: 'token',
        state: 'state'
      });
    });
  });
});
