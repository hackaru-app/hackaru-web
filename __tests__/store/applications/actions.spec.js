import { actions } from '@/store/applications';
import { application } from '@/schemas';

describe('Actions', () => {
  let params;

  beforeEach(() => {
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getApplications', () => {
    beforeEach(() => {
      params.dispatch
        .mockReturnValueOnce({
          data: [
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
          ]
        })
        .mockReturnValueOnce({
          result: [1]
        });
      actions.getApplications(params);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorized_applications'
        },
        { root: true }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: [
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
          ],
          schema: [application]
        },
        { root: true }
      );
    });

    it('commit MERGE_APPLICATIONS', () => {
      expect(params.commit).toHaveBeenCalledWith('MERGE_APPLICATIONS', [1]);
    });
  });

  describe('when dispatch getApplications but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getApplications(params, 1);
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });

  describe('when dispatch deleteApplication', () => {
    beforeEach(() => {
      params.dispatch.mockReturnValueOnce({
        data: {
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
      });
      actions.deleteApplication(params, 1);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorized_applications/1',
          method: 'delete'
        },
        { root: true }
      );
    });

    it('commit REMOVE_APPLICATION', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_APPLICATION', 1);
    });
  });

  describe('when dispatch deleteApplication but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.deleteApplication(params, 1);
    });

    it('commit REMOVE_APPLICATION', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_APPLICATION', 1);
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });
});
