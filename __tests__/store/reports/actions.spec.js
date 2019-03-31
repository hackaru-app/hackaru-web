import { actions } from '@/store/reports';
import { parse } from 'date-fns';

describe('Actions', () => {
  let params;

  beforeEach(() => {
    Intl.DateTimeFormat = () => ({
      resolvedOptions: () => ({
        timeZone: 'America/New_York'
      })
    });
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getReports', () => {
    beforeEach(() => {
      params.dispatch = jest.fn().mockReturnValueOnce({
        data: {
          projects: [
            {
              id: 1,
              name: 'Review',
              color: '#f95959'
            }
          ],
          summary: [
            {
              projectId: 1,
              duration: 100,
              date: '2019-01-01T00:00:00.000Z'
            },
            {
              projectId: 1,
              duration: 200,
              date: '2019-01-02T00:00:00.000Z'
            }
          ]
        }
      });
      actions.getReports(params, {
        start: parse('2019-01-01T00:00:00'),
        end: parse('2019-01-03T00:00:00'),
        period: 'day'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/reports',
          params: {
            start: parse('2019-01-01T00:00:00'),
            end: parse('2019-01-03T00:00:00'),
            period: 'day',
            timeZone: 'America/New_York'
          }
        },
        { root: true }
      );
    });

    it('commit SET_REPORTS', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_REPORTS', {
        period: 'day',
        projects: [
          {
            id: 1,
            name: 'Review',
            color: '#f95959'
          }
        ],
        summary: [
          {
            projectId: 1,
            duration: 100,
            date: '2019-01-01T00:00:00.000Z'
          },
          {
            projectId: 1,
            duration: 200,
            date: '2019-01-02T00:00:00.000Z'
          }
        ]
      });
    });
  });

  describe('when dispatch getReports but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getReports(params, {
        start: parse('2019-01-01T00:00:00'),
        end: parse('2019-01-02T00:00:00'),
        period: 'day'
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
});
