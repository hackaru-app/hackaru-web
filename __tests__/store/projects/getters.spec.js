import { getters } from '@/store/projects';
import { project } from '@/schemas';

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

  describe('when call getProjects', () => {
    beforeEach(() => {
      params = {
        state: { items: [1] },
        rootGetters: {
          'entities/getDenormalized': jest.fn(() => [
            {
              id: 1,
              name: 'Development',
              color: '#ff0'
            }
          ])
        }
      };
      result = getters.getProjects(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('call entities/getDenormalized', () => {
      expect(
        params.rootGetters['entities/getDenormalized']
      ).toHaveBeenCalledWith([1], [project]);
    });

    it('returns projects', () => {
      expect(result).toEqual([
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        }
      ]);
    });
  });
});
