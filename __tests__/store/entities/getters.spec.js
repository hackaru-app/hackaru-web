import { getters } from '@/store/entities';
import { schema } from 'normalizr';

const user = new schema.Entity('users', {
  comment: new schema.Entity('comments')
});

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

  describe('when call getDenormalized', () => {
    beforeEach(() => {
      params = {
        state: {
          data: {
            users: { 1: { comment: 2, id: 1, name: 'Example' } },
            comments: { 2: { id: 2, description: 'comment!' } }
          }
        }
      };
      result = getters.getDenormalized(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      )(1, user);
    });

    it('returns denormalized', () => {
      expect(result).toEqual({
        id: 1,
        name: 'Example',
        comment: {
          id: 2,
          description: 'comment!'
        }
      });
    });
  });
});
