import { getters } from '@/store/activities';
import { activity } from '@/schemas';
import { parse } from 'date-fns';

describe('Getters', () => {
  const toMin = px => px * (40 / 60);

  let params;
  let result;

  beforeEach(() => {
    params = {
      state: {},
      getters: {},
      rootState: {},
      rootGetters: {}
    };
  });

  describe('when call getActivities', () => {
    beforeEach(() => {
      params = {
        state: { items: [1] },
        rootGetters: {
          'entities/getDenormalized': jest.fn(() => [
            {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ])
        }
      };
      result = getters.getActivities(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('call entities/getDenormalized', () => {
      expect(
        params.rootGetters['entities/getDenormalized']
      ).toHaveBeenCalledWith([1], [activity]);
    });

    it('returns activities', () => {
      expect(result).toEqual([
        {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ]);
    });
  });

  describe('when call getWorkingActivities', () => {
    beforeEach(() => {
      params = {
        getters: {
          getActivities: [
            {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            },
            {
              id: 2,
              description: 'Development',
              startedAt: '2019-01-01T01:23:45',
              stoppedAt: '2019-01-02T01:23:45'
            }
          ]
        }
      };
      result = getters.getWorkingActivities(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns working activities', () => {
      expect(result).toEqual([
        {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ]);
    });
  });

  describe('when call getArchivesByDay', () => {
    beforeEach(() => {
      params = {
        getters: {
          getActivities: [
            {
              id: 2,
              description: 'Development',
              startedAt: '2019-01-01T00:00:00',
              stoppedAt: '2019-01-02T00:00:00'
            },
            {
              id: 3,
              description: 'Development',
              startedAt: '2019-01-03T01:23:45',
              stoppedAt: '2019-01-04T01:23:45'
            }
          ]
        }
      };
      result = getters.getArchivesByDay(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      )(parse('2019-01-01T00:00:00'));
    });

    it('returns correctly', () => {
      expect(result).toEqual([
        {
          id: 2,
          description: 'Development',
          startedAt: '2019-01-01T00:00:00',
          stoppedAt: '2019-01-02T00:00:00'
        }
      ]);
    });
  });

  describe('when call getArchivesByDay but activities are working', () => {
    beforeEach(() => {
      params = {
        getters: {
          getActivities: [
            {
              id: 1,
              description: 'Review',
              startedAt: '2019-01-01T01:23:45'
            }
          ]
        }
      };
      result = getters.getArchivesByDay(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      )(parse('2019-01-01T00:00:00'));
    });

    it('returns empty', () => {
      expect(result).toEqual([]);
    });
  });

  describe('when call getCalendar', () => {
    beforeEach(() => {
      params = {
        getters: {
          getArchivesByDay: jest.fn().mockReturnValue([
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
            }
          ])
        }
      };
      result = getters.getCalendar(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      )(parse('2019-01-01T00:00:00'), toMin);
    });

    it('call getArchivesByDay', () => {
      expect(params.getters.getArchivesByDay).toHaveBeenCalledWith(
        parse('2019-01-01T00:00:00')
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
