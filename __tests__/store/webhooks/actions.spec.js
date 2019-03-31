import { actions } from '@/store/webhooks';
import { webhook } from '@/schemas';

describe('Actions', () => {
  let params;

  beforeEach(() => {
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getWebhooks', () => {
    beforeEach(() => {
      params.dispatch
        .mockReturnValueOnce({
          data: [
            {
              id: 1,
              userId: 1,
              targetUrl: 'http://www.example.com/1',
              event: 'activity:updated',
              createdAt: '2019-02-06T10:23:24.199Z',
              updatedAt: '2019-02-06T10:23:24.199Z'
            }
          ]
        })
        .mockReturnValueOnce({
          result: [1]
        });
      actions.getWebhooks(params);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        { url: '/v1/webhooks' },
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
              userId: 1,
              targetUrl: 'http://www.example.com/1',
              event: 'activity:updated',
              createdAt: '2019-02-06T10:23:24.199Z',
              updatedAt: '2019-02-06T10:23:24.199Z'
            }
          ],
          schema: [webhook]
        },
        { root: true }
      );
    });

    it('commit SET_WEBHOOKS', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_WEBHOOKS', [1]);
    });
  });

  describe('when dispatch getWebhooks but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getWebhooks(params);
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });

  describe('when dispatch addWebhook', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch
        .mockReturnValueOnce({
          data: {
            id: 1,
            userId: 1,
            targetUrl: 'http://www.example.com',
            event: 'activity:created',
            createdAt: '2019-02-06T10:23:24.199Z',
            updatedAt: '2019-02-06T10:23:24.199Z'
          }
        })
        .mockReturnValueOnce({
          result: 1
        });
      sucess = await actions.addWebhook(params, {
        event: 'activity:created',
        targetUrl: 'http://example.com'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/webhooks',
          method: 'post',
          data: {
            webhook: {
              event: 'activity:created',
              targetUrl: 'http://example.com'
            }
          }
        },
        { root: true }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: {
            id: 1,
            userId: 1,
            targetUrl: 'http://www.example.com',
            event: 'activity:created',
            createdAt: '2019-02-06T10:23:24.199Z',
            updatedAt: '2019-02-06T10:23:24.199Z'
          },
          schema: webhook
        },
        { root: true }
      );
    });

    it('commit ADD_WEBHOOK', () => {
      expect(params.commit).toHaveBeenCalledWith('ADD_WEBHOOK', 1);
    });

    it('returns true', () => {
      expect(sucess).toBe(true);
    });
  });

  describe('when dispatch addWebhook but throw error', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      sucess = await actions.addWebhook(params, {
        event: 'activity:created',
        targetUrl: 'http://example.com'
      });
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(sucess).toBe(false);
    });
  });

  describe('when dispatch deleteWebhook', () => {
    beforeEach(() => {
      params.dispatch.mockReturnValueOnce({
        id: 1,
        userId: 1,
        targetUrl: 'http://www.example.com',
        event: 'activity:created',
        createdAt: '2019-02-06T10:23:24.199Z',
        updatedAt: '2019-02-06T10:23:24.199Z'
      });
      actions.deleteWebhook(params, 1);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/webhooks/1',
          method: 'delete'
        },
        { root: true }
      );
    });

    it('commit REMOVE_WEBHOOK', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_WEBHOOK', 1);
    });
  });

  describe('when dispatch deleteWebhook but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.deleteWebhook(params, 1);
    });

    it('commit REMOVE_WEBHOOK', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_WEBHOOK', 1);
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
