import { actions } from '@/store/reports';
import { parseISO } from 'date-fns';

describe('Actions', () => {
  Intl.DateTimeFormat = () => ({
    resolvedOptions: () => ({
      timeZone: 'America/New_York'
    })
  });

  describe('when dispatch fetch', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        projects: [],
        summary: []
      }
    }));

    beforeEach(() => {
      actions.fetch(
        { dispatch, commit },
        {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-01-03T00:00:00'),
          period: 'day'
        }
      );
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/reports',
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            period: 'day',
            timeZone: 'America/New_York'
          }
        },
        { root: true }
      );
    });

    it('commit SET_REPORTS', () => {
      expect(commit).toHaveBeenCalledWith('SET_REPORTS', {
        period: 'day',
        projects: [],
        summary: [],
        start: parseISO('2019-01-01T00:00:00'),
        end: parseISO('2019-01-03T00:00:00')
      });
    });
  });
});
