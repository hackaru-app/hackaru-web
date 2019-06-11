import { getters } from '@/store/activities';
import { parse } from 'date-fns';

describe('Getters', () => {
  let result;

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': jest.fn(() => ({}))
    };

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters);
    });

    it('returns result', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call workings', () => {
    const mockGetters = {
      all: [
        { id: 1, stoppedAt: '2019-01-01T01:23:45' },
        { id: 2, stoppedAt: null }
      ]
    };

    beforeEach(() => {
      result = getters.workings({}, mockGetters, {}, {});
    });

    it('returns unstopped activites', () => {
      expect(result.length).toBe(1);
    });
  });

  describe('when call getCalendar', () => {
    const toMin = px => px;
    const mockGetters = {
      all: [
        {
          id: 1,
          startedAt: '2019-01-01T01:00:00',
          stoppedAt: '2019-01-01T02:00:00',
          duration: 3600
        },
        {
          id: 2,
          startedAt: '2019-01-01T01:00:00',
          stoppedAt: '2019-01-01T03:00:00',
          duration: 7200
        },
        {
          id: 3,
          startedAt: '2019-01-01T05:00:00',
          stoppedAt: '2019-01-01T06:00:00',
          duration: 3600
        },
        {
          id: 4,
          startedAt: '2019-01-02T01:00:00',
          stoppedAt: '2019-01-02T02:00:00',
          duration: 3600
        }
      ]
    };

    beforeEach(() => {
      result = getters.getCalendar({}, mockGetters, {}, {})(
        parse('2019-01-01T00:00:00'),
        toMin
      );
    });

    it('returns correctly', () => {
      expect(result).toEqual([
        [
          {
            id: 1,
            startedAt: '2019-01-01T01:00:00',
            stoppedAt: '2019-01-01T02:00:00',
            duration: 3600
          },
          {
            id: 2,
            startedAt: '2019-01-01T01:00:00',
            stoppedAt: '2019-01-01T03:00:00',
            duration: 7200
          }
        ],
        [
          {
            id: 3,
            startedAt: '2019-01-01T05:00:00',
            stoppedAt: '2019-01-01T06:00:00',
            duration: 3600
          }
        ]
      ]);
    });
  });
});
