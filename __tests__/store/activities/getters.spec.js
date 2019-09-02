import MockDate from 'mockdate';
import { getters } from '@/store/activities';
import { parseISO } from 'date-fns';

describe('Getters', () => {
  let result;

  MockDate.set('2019-01-31T01:23:45');

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

  describe('when call working', () => {
    const mockGetters = {
      all: [
        { id: 1, stoppedAt: '2019-01-01T01:23:45' },
        { id: 2, stoppedAt: null }
      ]
    };

    beforeEach(() => {
      result = getters.working({}, mockGetters, {}, {});
    });

    it('returns unstopped activity', () => {
      expect(result.id).toBe(2);
    });
  });

  describe('when call pastWeek', () => {
    const mockGetters = {
      all: [
        {
          id: 1,
          startedAt: '2019-01-30T00:00:00',
          stoppedAt: '2019-01-30T01:00:00',
          duration: 3600
        },
        {
          id: 2,
          startedAt: '2019-01-31T00:00:00',
          stoppedAt: '2019-01-31T01:00:00',
          duration: 3600
        },
        {
          id: 3,
          startedAt: '2019-01-31T03:00:00',
          stoppedAt: '2019-01-31T04:00:00',
          duration: 3600
        },
        {
          id: 4,
          startedAt: '2019-02-01T00:00:00',
          stoppedAt: '2019-02-01T01:00:00',
          duration: 3600
        }
      ]
    };

    beforeEach(() => {
      result = getters.pastWeek({}, mockGetters, {}, {});
    });

    it('group by day', () => {
      expect(result).toEqual({
        '2019-01-31': [
          {
            id: 3,
            startedAt: '2019-01-31T03:00:00',
            stoppedAt: '2019-01-31T04:00:00',
            duration: 3600
          },
          {
            id: 2,
            startedAt: '2019-01-31T00:00:00',
            stoppedAt: '2019-01-31T01:00:00',
            duration: 3600
          }
        ],
        '2019-01-30': [
          {
            id: 1,
            startedAt: '2019-01-30T00:00:00',
            stoppedAt: '2019-01-30T01:00:00',
            duration: 3600
          }
        ]
      });
    });

    it('does not contains out of range', () => {
      expect(result[parseISO('2019-02-01')]).toBeUndefined();
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
        '2019-01-01T00:00:00',
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
