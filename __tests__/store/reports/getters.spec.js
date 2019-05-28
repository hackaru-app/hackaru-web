import { getters } from '@/store/reports';

describe('Getters', () => {
  let result;

  describe('when call projects', () => {
    const state = {
      projects: [
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        }
      ]
    };

    beforeEach(() => {
      result = getters.projects(state);
    });

    it('returns projects', () => {
      expect(result).toEqual([
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        }
      ]);
    });
  });

  describe('when call summary', () => {
    const state = {
      summary: [
        {
          projectId: 1,
          duration: 100,
          date: '2019-01-01T00:00:00'
        },
        {
          projectId: 1,
          duration: 200,
          date: '2019-01-02T00:00:00'
        },
        {
          projectId: 2,
          duration: 200,
          date: '2019-01-02T00:00:00'
        }
      ]
    };

    beforeEach(() => {
      result = getters.summary(state);
    });

    it('returns summary', () => {
      expect(result).toEqual({
        1: 300,
        2: 200
      });
    });
  });

  describe('when call barChartLabels and period is hour', () => {
    const state = {
      period: 'hour',
      summary: [
        { date: '2019-01-01T01:00:00' },
        { date: '2019-01-02T03:00:00' }
      ]
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual(['1:00', '3:00']);
    });
  });

  describe('when call barChartLabels and period is day', () => {
    const state = {
      period: 'day',
      summary: [{ date: '2019-01-01' }, { date: '2019-01-03' }]
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual(['01', '03']);
    });
  });

  describe('when call barChartLabels and period is month', () => {
    const state = {
      period: 'month',
      summary: [{ date: '2019-01' }, { date: '2019-03' }]
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual(['Jan', 'Mar']);
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
      summary: [
        {
          projectId: 1,
          duration: 100,
          date: '2019-01-01'
        },
        {
          projectId: 1,
          duration: 200,
          date: '2019-01-02'
        },
        {
          projectId: 2,
          duration: 0,
          date: '2019-01-01'
        },
        {
          projectId: 2,
          duration: 100,
          date: '2019-01-02'
        }
      ]
    };

    const mockGetters = {
      barChartLabels: ['01/01', '01/02']
    };

    beforeEach(() => {
      result = getters.barChartData(state, mockGetters);
    });

    it('returns labels correctly', () => {
      expect(result.labels).toEqual(['01/01', '01/02']);
    });

    it('returns datasets correctly', () => {
      expect(result.datasets).toEqual([
        {
          label: 'Development',
          backgroundColor: '#ff0',
          data: [100, 200]
        },
        {
          label: 'Review',
          backgroundColor: '#f00',
          data: [0, 100]
        }
      ]);
    });
  });

  describe('when call doughnutChartData', () => {
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
        },
        {
          id: 3,
          name: 'Coding',
          color: '#f0f'
        }
      ]
    };

    const mockGetters = {
      summary: {
        1: 100,
        2: 200
      }
    };

    beforeEach(() => {
      result = getters.doughnutChartData(state, mockGetters);
    });

    it('returns chart data', () => {
      expect(result).toEqual({
        labels: ['Development', 'Review', 'Coding'],
        datasets: [
          {
            data: [100, 200, 0],
            backgroundColor: ['#ff0', '#f00', '#f0f']
          }
        ]
      });
    });
  });
});
