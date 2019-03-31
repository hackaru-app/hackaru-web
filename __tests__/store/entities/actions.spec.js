import { actions } from '@/store/entities';
import { schema } from 'normalizr';

const user = new schema.Entity('users', {
  comment: new schema.Entity('comments')
});

describe('Actions', () => {
  let params;
  let result;

  beforeEach(() => {
    params = { commit: jest.fn() };
  });

  describe('when dispatch normalize', () => {
    beforeEach(async () => {
      result = await actions.normalize(params, {
        schema: user,
        json: {
          id: 1,
          name: 'Example',
          comment: {
            id: 2,
            description: 'comment!'
          }
        }
      });
    });

    it('commit MERGE_ENTITIES', () => {
      expect(params.commit).toHaveBeenCalledWith('MERGE_ENTITIES', {
        users: { 1: { comment: 2, id: 1, name: 'Example' } },
        comments: { 2: { id: 2, description: 'comment!' } }
      });
    });

    it('returns normalized data', () => {
      expect(result).toEqual({
        entities: {
          users: { 1: { comment: 2, id: 1, name: 'Example' } },
          comments: { 2: { id: 2, description: 'comment!' } }
        },
        result: 1
      });
    });
  });
});
