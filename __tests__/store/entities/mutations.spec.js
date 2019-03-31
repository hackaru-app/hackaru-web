import { mutations } from '@/store/entities';

describe('Mutations', () => {
  let state;
  let data;

  describe('when commit MERGE_ENTITIES', () => {
    beforeEach(() => {
      data = {
        users: {
          1: { id: 1, name: 'Name1', tags: ['orange'] }
        }
      };
      state = { data };
      mutations['MERGE_ENTITIES'](state, {
        users: {
          1: { name: 'NewName', age: 20, tags: ['apple'] },
          2: { id: 2, name: 'Name2' }
        }
      });
    });

    it('merge entities', () => {
      expect(state.data).toEqual({
        users: {
          1: { id: 1, name: 'NewName', age: 20, tags: ['apple'] },
          2: { id: 2, name: 'Name2' }
        }
      });
    });

    it('is not shallow copy', () => {
      expect(data).not.toBe(state.data);
    });
  });
});
