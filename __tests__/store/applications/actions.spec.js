import { actions } from '@/store/applications';
import { application } from '@/schemas';

describe('Actions', () => {
  describe('when dispatch fetch', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetch({ dispatch });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorized_applications'
        },
        { root: true }
      );
    });

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [application]
        },
        { root: true }
      );
    });
  });

  describe('when dispatch delete', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.delete({ dispatch }, 1);
    });

    it('dispatch entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'applications', id: 1 },
        { root: true }
      );
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorized_applications/1',
          method: 'delete'
        },
        { root: true }
      );
    });
  });
});
