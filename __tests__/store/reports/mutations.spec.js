import { mutations } from '@/store/reports';

describe('Mutations', () => {
  describe('when commit SET_REPORTS', () => {
    const state = {
      projects: [],
      totals: {},
      labels: [],
      sums: {},
      activityGroups: [],
    };

    beforeEach(() => {
      mutations['SET_REPORTS'](state, {
        projects: [
          {
            id: 1,
            name: 'Review',
            color: '#f95959',
          },
        ],
        totals: {
          1: 100,
        },
        labels: ['Jan', 'Feb'],
        sums: {
          1: [100, 200],
        },
        activityGroups: [
          {
            description: 'Review code',
            duration: 3600,
            project: {
              id: 1,
              name: 'Review',
              color: '#f95959',
            },
          },
        ],
      });
    });

    it('sets projects', () => {
      expect(state.projects).toEqual([
        {
          id: 1,
          name: 'Review',
          color: '#f95959',
        },
      ]);
    });

    it('sets totals', () => {
      expect(state.totals).toEqual({
        1: 100,
      });
    });

    it('sets labels', () => {
      expect(state.labels).toEqual(['Jan', 'Feb']);
    });

    it('sets sums', () => {
      expect(state.sums).toEqual({
        1: [100, 200],
      });
    });

    it('sets activityGroups', () => {
      expect(state.activityGroups).toEqual([
        {
          description: 'Review code',
          duration: 3600,
          project: {
            id: 1,
            name: 'Review',
            color: '#f95959',
          },
        },
      ]);
    });
  });

  describe('when commit SET_PREVIOUS_TOTALS', () => {
    const state = {
      projects: [],
      totals: {},
      labels: [],
      sums: {},
    };

    beforeEach(() => {
      mutations['SET_PREVIOUS_TOTALS'](state, {
        totals: {
          1: 100,
        },
      });
    });

    it('sets previousTotals', () => {
      expect(state.previousTotals).toEqual({
        1: 100,
      });
    });
  });
});
