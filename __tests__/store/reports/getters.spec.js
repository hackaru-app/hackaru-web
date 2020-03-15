import { getters } from '@/store/reports';

describe('Getters', () => {
  let result;

  describe('when call projects', () => {
    const state = {
      projects: []
    };

    beforeEach(() => {
      result = getters.projects(state);
    });

    it('returns projects', () => {
      expect(result).toEqual([]);
    });
  });

  describe('when call totals', () => {
    const state = {
      totals: {}
    };

    beforeEach(() => {
      result = getters.totals(state);
    });

    it('returns totals', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call previousTotals', () => {
    const state = {
      previousTotals: {}
    };

    beforeEach(() => {
      result = getters.previousTotals(state);
    });

    it('returns previousTotals', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call activityGroups', () => {
    const state = {
      activityGroups: []
    };

    beforeEach(() => {
      result = getters.activityGroups(state);
    });

    it('returns previousTotals', () => {
      expect(result).toEqual([]);
    });
  });

  describe('when call empty and totals is empty', () => {
    const state = {
      totals: {}
    };

    beforeEach(() => {
      result = getters.empty(state);
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when call empty and totals is not empty', () => {
    const state = {
      totals: {
        1: 100
      }
    };

    beforeEach(() => {
      result = getters.empty(state);
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when call barChartData ', () => {
    const state = {
      projects: [
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        },
        {
          id: 2,
          name: 'Review',
          color: '#f00'
        }
      ],
      labels: ['Jan', 'Feb'],
      sums: {
        1: [100, 200],
        2: [300, 400]
      }
    };

    beforeEach(() => {
      result = getters.barChartData(state);
    });

    it('returns labels correctly', () => {
      expect(result.labels).toEqual(['Jan', 'Feb']);
    });

    it('returns datasets correctly', () => {
      expect(result.datasets).toEqual([
        {
          label: 'Development',
          maxBarThickness: 40,
          backgroundColor: '#ff0',
          data: [100, 200]
        },
        {
          label: 'Review',
          maxBarThickness: 40,
          backgroundColor: '#f00',
          data: [300, 400]
        }
      ]);
    });
  });

  describe('when call doughnutChartData', () => {
    const state = {
      projects: [
        {
          id: 3,
          name: 'Working',
          color: '#f0f'
        },
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        },
        {
          id: 2,
          name: 'Review',
          color: '#f00'
        }
      ],
      totals: {
        1: 100,
        3: 300,
        2: 200
      }
    };

    beforeEach(() => {
      result = getters.doughnutChartData(state);
    });

    it('returns chart data', () => {
      expect(result).toEqual({
        labels: ['Working', 'Development', 'Review'],
        datasets: [
          {
            data: [300, 100, 200],
            borderWidth: 0,
            backgroundColor: ['#f0f', '#ff0', '#f00']
          }
        ]
      });
    });
  });
});
