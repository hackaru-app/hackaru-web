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

  describe('when call empty and summary is empty', () => {
    const state = {
      summary: []
    };

    beforeEach(() => {
      result = getters.empty(state);
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when call empty and summary is not empty', () => {
    const state = {
      summary: [
        {
          projectId: 1,
          duration: 100,
          date: '2019-01-01T00:00:00'
        }
      ]
    };

    beforeEach(() => {
      result = getters.empty(state);
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when call barChartLabels and period is hour', () => {
    const state = {
      period: 'hour'
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual([
        '0:00',
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ]);
    });
  });

  describe('when call barChartLabels and period is day', () => {
    const state = {
      period: 'day',
      start: '2019-01-01',
      end: '2019-01-03'
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual(['01', '02', '03']);
    });
  });

  describe('when call barChartLabels and period is month', () => {
    const state = {
      period: 'month'
    };

    beforeEach(() => {
      result = getters.barChartLabels(state);
    });

    it('returns labels', () => {
      expect(result).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]);
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
