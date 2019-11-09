export const SET_REPORTS = 'SET_REPORTS';

export const state = () => ({
  projects: [],
  totals: {},
  labels: [],
  sums: {},
  start: undefined,
  end: undefined
});

export const actions = {
  async fetch({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/report',
          params: {
            start: payload.start,
            end: payload.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        },
        { root: true }
      );
      commit(SET_REPORTS, {
        projects: res.data.projects,
        totals: res.data.totals,
        labels: res.data.labels,
        sums: res.data.sums,
        start: payload.start,
        end: payload.end
      });
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async fetchPdf({ dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/report.pdf',
          responseType: 'blob',
          params: {
            start: payload.start,
            end: payload.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        },
        { root: true }
      );
      return res.data;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const mutations = {
  [SET_REPORTS](state, payload) {
    state.projects = payload.projects;
    state.totals = payload.totals;
    state.labels = payload.labels;
    state.sums = payload.sums;
    state.start = payload.start;
    state.end = payload.end;
  }
};

export const getters = {
  projects: state => {
    return state.projects;
  },
  totals: state => {
    return state.totals;
  },
  empty: state => {
    return !Object.values(state.totals).find(value => value > 0);
  },
  barChartData: state => {
    return {
      labels: state.labels,
      datasets: state.projects.map(project => ({
        label: project.name,
        backgroundColor: project.color,
        data: state.sums[project.id]
      }))
    };
  },
  doughnutChartData: state => {
    const projects = state.projects;
    return {
      labels: projects.map(({ name }) => name),
      datasets: [
        {
          data: projects.map(({ id }) => state.totals[id]),
          backgroundColor: projects.map(({ color }) => color)
        }
      ]
    };
  }
};
