import { getters } from '~/store/projects';

describe('Getters', () => {
  let result;

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': () => [
        { name: 'B' },
        { name: 'C' },
        { name: 'A' },
      ],
    };

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters);
    });

    it('returns projects sorted by name', () => {
      expect(result).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
    });
  });
});
