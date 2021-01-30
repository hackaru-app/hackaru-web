import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/reports';
import { parseISO } from 'date-fns';

describe('Actions', () => {
  const mock = new MockAdapter(axios);

  Intl.DateTimeFormat = () => ({
    resolvedOptions: () => ({
      timeZone: 'America/New_York',
    }),
  });

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch fetch', () => {
    const commit = jest.fn();

    beforeEach(async () => {
      mock
        .onGet('/v1/report', {
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            projectIds: [1],
            timeZone: 'America/New_York',
          },
        })
        .replyOnce(200, {
          projects: [],
          sums: [],
          totals: {},
          labels: [],
          activityGroups: [],
        });
      mock
        .onGet('/v1/report', {
          params: {
            start: parseISO('2019-12-29T00:00:00'),
            end: parseISO('2019-01-31T00:00:00'),
            projectIds: [1],
            timeZone: 'America/New_York',
          },
        })
        .replyOnce(200, {
          totals: {},
        });
      await actions.fetch(
        { commit },
        {
          current: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            projectIds: [1],
          },
          previous: {
            start: parseISO('2019-12-29T00:00:00'),
            end: parseISO('2019-01-31T00:00:00'),
            projectIds: [1],
          },
        }
      );
    });

    it('commits SET_REPORTS', () => {
      expect(commit).toHaveBeenCalledWith('SET_REPORTS', {
        projects: [],
        sums: [],
        totals: {},
        labels: [],
        activityGroups: [],
      });
    });

    it('commits SET_PREVIOUS_TOTALS', () => {
      expect(commit).toHaveBeenCalledWith('SET_PREVIOUS_TOTALS', {
        totals: {},
      });
    });
  });

  describe('when dispatch fetchPdf', () => {
    let result;

    beforeEach(async () => {
      mock
        .onGet('/v1/report.pdf', {
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            projectIds: [1],
            timeZone: 'America/New_York',
          },
        })
        .replyOnce(200, '%PDF-');
      result = await actions.fetchPdf(undefined, {
        start: parseISO('2019-01-01T00:00:00'),
        end: parseISO('2019-01-03T00:00:00'),
        projectIds: [1],
      });
    });

    it('requests api with blob responseType', () => {
      expect(mock.history.get[0].responseType).toBe('blob');
    });

    it('retuns pdf data', () => {
      expect(result).toBe('%PDF-');
    });
  });

  describe('when dispatch fetchCsv', () => {
    let result;

    beforeEach(async () => {
      mock
        .onGet('/v1/report.csv', {
          params: {
            start: parseISO('2019-01-01T00:00:00'),
            end: parseISO('2019-01-03T00:00:00'),
            projectIds: [1],
            timeZone: 'America/New_York',
          },
        })
        .replyOnce(200, 'a,b,c');
      result = await actions.fetchCsv(undefined, {
        start: parseISO('2019-01-01T00:00:00'),
        end: parseISO('2019-01-03T00:00:00'),
        projectIds: [1],
      });
    });

    it('requests api with blob responseType', () => {
      expect(mock.history.get[0].responseType).toBe('blob');
    });

    it('retuns csv data', () => {
      expect(result).toBe('a,b,c');
    });
  });
});
