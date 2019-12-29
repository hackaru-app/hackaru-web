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
        sums: [],
        totals: {},
        labels: []
      }
    }));

    beforeEach(() => {
      actions.fetch(
        { dispatch, commit },
        {
          current: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00')
          },
          previous: {
            start: parseISO('2019-12-29T00:00:00'),
            end: parseISO('2019-01-31T00:00:00')
          }
        }
      );
    });

    it('dispatch current auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/report',
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            timeZone: 'America/New_York'
          }
        },
        { root: true }
      );
    });

    it('dispatch previous auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/report',
          params: {
            start: parseISO('2019-12-29T00:00:00'),
            end: parseISO('2019-01-31T00:00:00'),
            timeZone: 'America/New_York'
          }
        },
        { root: true }
      );
    });

    it('commit SET_REPORTS', () => {
      expect(commit).toHaveBeenCalledWith('SET_REPORTS', {
        projects: [],
        sums: [],
        totals: {},
        labels: []
      });
    });

    it('commit SET_PREVIOUS_TOTALS', () => {
      expect(commit).toHaveBeenCalledWith('SET_PREVIOUS_TOTALS', {
        totals: {}
      });
    });
  });

  describe('when dispatch fetchPdf', () => {
    let result;

    const dispatch = jest.fn(() => ({ data: '%PDF-' }));

    beforeEach(async () => {
      result = await actions.fetchPdf(
        { dispatch },
        {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-01-03T00:00:00')
        }
      );
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/report.pdf',
          responseType: 'blob',
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            timeZone: 'America/New_York'
          }
        },
        { root: true }
      );
    });

    it('retuns data', () => {
      expect(result).toBe('%PDF-');
    });
  });
});
