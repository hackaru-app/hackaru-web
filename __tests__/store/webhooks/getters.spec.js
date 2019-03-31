import { getters } from '@/store/webhooks';
import { webhook } from '@/schemas';

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

  describe('when call getWebhooks', () => {
    beforeEach(() => {
      params = {
        state: { items: [1] },
        rootGetters: {
          'entities/getDenormalized': jest.fn(() => [
            {
              id: 1,
              userId: 1,
              targetUrl: 'http://www.example.com',
              event: 'activity:created',
              createdAt: '2019-02-06T10:23:24.199Z',
              updatedAt: '2019-02-06T10:23:24.199Z'
            }
          ])
        }
      };
      result = getters.getWebhooks(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('call entities/getDenormalized', () => {
      expect(
        params.rootGetters['entities/getDenormalized']
      ).toHaveBeenCalledWith([1], [webhook]);
    });

    it('returns webhooks', () => {
      expect(result).toEqual([
        {
          id: 1,
          userId: 1,
          targetUrl: 'http://www.example.com',
          event: 'activity:created',
          createdAt: '2019-02-06T10:23:24.199Z',
          updatedAt: '2019-02-06T10:23:24.199Z'
        }
      ]);
    });
  });
});
