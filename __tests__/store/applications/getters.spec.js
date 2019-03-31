import { getters } from '@/store/applications';
import { application } from '@/schemas';

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

  describe('when call getApplications', () => {
    beforeEach(() => {
      params = {
        state: { items: [1] },
        rootGetters: {
          'entities/getDenormalized': jest.fn(() => [
            {
              id: 1,
              name: 'Example1',
              uid: 'uid',
              redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
              scopes: ['projects:read', 'projects:write'],
              confidential: true,
              createdAt: '2019-01-22T07:06:53.159Z',
              updatedAt: '2019-01-22T07:06:53.159Z',
              ownerId: null,
              ownerType: null
            }
          ])
        }
      };
      result = getters.getApplications(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('call entities/getDenormalized', () => {
      expect(
        params.rootGetters['entities/getDenormalized']
      ).toHaveBeenCalledWith([1], [application]);
    });

    it('returns applications', () => {
      expect(result).toEqual([
        {
          id: 1,
          name: 'Example1',
          uid: 'uid',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scopes: ['projects:read', 'projects:write'],
          confidential: true,
          createdAt: '2019-01-22T07:06:53.159Z',
          updatedAt: '2019-01-22T07:06:53.159Z',
          ownerId: null,
          ownerType: null
        }
      ]);
    });
  });
});
