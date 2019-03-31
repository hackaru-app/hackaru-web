import { actions } from '@/store/activities';
import { activity } from '@/schemas';
import { parse } from 'date-fns';

describe('Actions', () => {
  let params;

  beforeEach(() => {
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getWorkingActivities', () => {
    beforeEach(() => {
      params.dispatch
        .mockReturnValueOnce({
          data: [
            {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ]
        })
        .mockReturnValueOnce({
          result: [1]
        });
      actions.getWorkingActivities(params);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            working: true
          }
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
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ],
          schema: [activity]
        },
        { root: true }
      );
    });

    it('commit MERGE_ACTIVITIES', () => {
      expect(params.commit).toHaveBeenCalledWith('MERGE_ACTIVITIES', [1]);
    });
  });

  describe('when dispatch getWorkingActivities but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getWorkingActivities(params);
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

  describe('when dispatch getActivities', () => {
    beforeEach(() => {
      params.dispatch = jest
        .fn()
        .mockReturnValueOnce({
          data: [
            {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ]
        })
        .mockReturnValueOnce({
          result: [1]
        });
      actions.getActivities(params, {
        start: parse('2019-01-01T01:23:45'),
        end: parse('2019-01-02T01:23:45')
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            start: parse('2019-01-01T01:23:45'),
            end: parse('2019-01-02T01:23:45')
          }
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
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ],
          schema: [activity]
        },
        { root: true }
      );
    });

    it('commit MERGE_ACTIVITIES', () => {
      expect(params.commit).toHaveBeenCalledWith('MERGE_ACTIVITIES', [1]);
    });
  });

  describe('when dispatch getActivities but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getActivities(params, {
        start: parse('2019-01-01T01:23:45'),
        end: parse('2019-01-02T01:23:45')
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
  });

  describe('when dispatch addActivity', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch = jest
        .fn()
        .mockReturnValueOnce({
          data: {
            id: 1,
            description: 'Review',
            startedAt: '2019-01-01T01:23:45'
          }
        })
        .mockReturnValueOnce({
          result: 1
        });
      sucess = await actions.addActivity(params, {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-01T01:23:45'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
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
            description: 'Review',
            startedAt: '2019-01-01T01:23:45'
          },
          schema: activity
        },
        { root: true }
      );
    });

    it('commit ADD_ACTIVITY', () => {
      expect(params.commit).toHaveBeenCalledWith('ADD_ACTIVITY', 1);
    });

    it('returns true', () => {
      expect(sucess).toBe(true);
    });
  });

  describe('when dispatch addActivity but throw error', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      sucess = await actions.addActivity(params, {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-01T01:23:45'
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

  describe('when dispatch deleteActivity', () => {
    beforeEach(() => {
      params.dispatch.mockReturnValueOnce({
        data: {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      });
      actions.deleteActivity(params, 1);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'delete'
        },
        { root: true }
      );
    });

    it('commit REMOVE_ACTIVITY', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_ACTIVITY', 1);
    });
  });

  describe('when dispatch deleteActivity but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.deleteActivity(params, 1);
    });

    it('commit REMOVE_ACTIVITY', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_ACTIVITY', 1);
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });

  describe('when dispatch updateActivity', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch = jest
        .fn()
        .mockReturnValueOnce({
          data: {
            id: 1,
            description: 'Review',
            startedAt: '2019-01-01T01:23:45'
          }
        })
        .mockReturnValueOnce({
          result: 1
        });
      sucess = await actions.updateActivity(params, {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-01T01:23:45'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'put',
          data: {
            activity: {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
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
            description: 'Review',
            startedAt: '2019-01-01T01:23:45'
          },
          schema: activity
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(sucess).toBe(true);
    });
  });

  describe('when dispatch updateActivity but throw error', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      sucess = await actions.updateActivity(params, {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-01T01:23:45'
      });
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
});
