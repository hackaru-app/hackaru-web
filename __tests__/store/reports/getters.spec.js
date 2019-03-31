import { getters } from '@/store/reports';

describe('Getters', () => {
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

  describe('when call getProjects', () => {
    beforeEach(() => {
      params = {
        state: {
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
          ]
        }
      };
      result = getters.getProjects(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns projects', () => {
      expect(result).toEqual([
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
      ]);
    });
  });

  describe('when call getSummary', () => {
    beforeEach(() => {
      params = {
        state: {
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
        }
      };
      result = getters.getSummary(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns summary', () => {
      expect(result).toEqual({
        1: 300,
        2: 200
      });
    });
  });

  describe('when call getDoughnutChartData', () => {
    beforeEach(() => {
      params.state = {
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
      params.getters = {
        getSummary: {
          1: 100,
          2: 200
        }
      };
      result = getters.getDoughnutChartData(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
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

  describe('when call getBarChartLabels and period is hour', () => {
    beforeEach(() => {
      params.state = {
        period: 'hour',
        summary: [
          { projectId: 1, duration: 0, date: '2019-01-01T01:00:00' },
          { projectId: 1, duration: 0, date: '2019-01-02T02:00:00' },
          { projectId: 2, duration: 0, date: '2019-01-01T01:00:00' },
          { projectId: 2, duration: 0, date: '2019-01-02T02:00:00' }
        ]
      };
      result = getters.getBarChartLabels(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns labels', () => {
      expect(result).toEqual(['1:00', '2:00']);
    });
  });

  describe('when call getBarChartLabels and period is day', () => {
    beforeEach(() => {
      params.state = {
        period: 'day',
        summary: [
          { projectId: 1, duration: 0, date: '2019-01-01' },
          { projectId: 1, duration: 0, date: '2019-01-02' },
          { projectId: 2, duration: 0, date: '2019-01-01' },
          { projectId: 2, duration: 0, date: '2019-01-02' }
        ]
      };
      result = getters.getBarChartLabels(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns labels', () => {
      expect(result).toEqual(['01', '02']);
    });
  });

  describe('when call getBarChartLabels and period is month', () => {
    beforeEach(() => {
      params.state = {
        period: 'month',
        summary: [
          { projectId: 1, duration: 0, date: '2019-01' },
          { projectId: 1, duration: 0, date: '2019-02' },
          { projectId: 2, duration: 0, date: '2019-01' },
          { projectId: 2, duration: 0, date: '2019-02' }
        ]
      };
      result = getters.getBarChartLabels(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
    });

    it('returns labels', () => {
      expect(result).toEqual(['Jan', 'Feb']);
    });
  });

  describe('when call getBarChartData ', () => {
    beforeEach(() => {
      params.getters = {
        getBarChartLabels: ['01/01', '01/02']
      };
      params.state = {
        labelFormat: 'MM/DD',
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
      result = getters.getBarChartData(
        params.state,
        params.getters,
        params.rootState,
        params.rootGetters
      );
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
});
