import { format } from 'date-fns';
import uniq from 'lodash.uniq';

export const SET_REPORTS = 'SET_REPORTS';

export const state = () => ({
  projects: [],
  summary: [],
  period: ''
});

export const actions = {
  async fetch({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/reports',
          params: {
            start: payload.start,
            end: payload.end,
            period: payload.period,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        },
        { root: true }
      );
      commit(SET_REPORTS, {
        projects: res.data.projects,
        summary: res.data.summary,
        period: payload.period
      });
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const mutations = {
  [SET_REPORTS](state, payload) {
    state.projects = payload.projects;
    state.summary = payload.summary;
    state.period = payload.period;
  }
};

export const getters = {
  projects: (state, getter) => {
    return state.projects;
  },
  summary: (state, getter) => {
    return state.summary.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.projectId]: (acc[cur.projectId] || 0) + cur.duration
      };
    }, {});
  },
  barChartLabels: (state, getter) => {
    const labelFormat = {
      hour: 'H:00',
      day: 'DD',
      month: 'MMM'
    }[state.period];
    return uniq(state.summary.map(({ date }) => format(date, labelFormat)));
  },
  barChartData: (state, getters) => {
    return {
      labels: getters.barChartLabels,
      datasets: state.projects.map(project => ({
        label: project.name,
        backgroundColor: project.color,
        data: state.summary
          .filter(({ projectId }) => project.id === projectId)
          .map(({ duration }) => duration)
      }))
    };
  },
  doughnutChartData: (state, getters) => {
    const projects = state.projects;
    return {
      labels: projects.map(project => project.name),
      datasets: [
        {
          data: projects.map(project => getters.summary[project.id] || 0),
          backgroundColor: projects.map(project => project.color)
        }
      ]
    };
  }
};
