import { mutations } from '@/store/reports';

describe('Mutations', () => {
  describe('when commit SET_REPORTS', () => {
    const state = {
      start: undefined,
      end: undefined,
      projects: [],
      summary: [],
      unit: ''
    };

    beforeEach(() => {
      mutations['SET_REPORTS'](state, {
        period: 'hour',
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
          }
        ]
      });
    });

    it('set projects', () => {
      expect(state.projects).toEqual([
        {
          id: 1,
          name: 'Review',
          color: '#f95959'
        }
      ]);
    });

    it('set period', () => {
      expect(state.period).toBe('hour');
    });

    it('set summary', () => {
      expect(state.summary).toEqual([
        {
          projectId: 1,
          duration: 100,
          date: '2019-01-01T00:00:00.000Z'
        }
      ]);
    });
  });
});
