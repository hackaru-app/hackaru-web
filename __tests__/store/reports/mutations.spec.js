import { mutations } from '@/store/reports';

describe('Mutations', () => {
  describe('when commit SET_REPORTS', () => {
    const state = {
      projects: [],
      totals: {},
      labels: [],
      sums: {}
    };

    beforeEach(() => {
      mutations['SET_REPORTS'](state, {
        projects: [
          {
            id: 1,
            name: 'Review',
            color: '#f95959'
          }
        ],
        totals: {
          1: 100
        },
        labels: ['Jan', 'Feb'],
        sums: {
          1: [100, 200]
        }
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

    it('set totals', () => {
      expect(state.totals).toEqual({
        1: 100
      });
    });

    it('set labels', () => {
      expect(state.labels).toEqual(['Jan', 'Feb']);
    });

    it('set sums', () => {
      expect(state.sums).toEqual({
        1: [100, 200]
      });
    });
  });

  describe('when commit SET_PREVIOUS_TOTALS', () => {
    const state = {
      projects: [],
      totals: {},
      labels: [],
      sums: {}
    };

    beforeEach(() => {
      mutations['SET_PREVIOUS_TOTALS'](state, {
        totals: {
          1: 100
        }
      });
    });

    it('set previousTotals', () => {
      expect(state.previousTotals).toEqual({
        1: 100
      });
    });
  });
});
