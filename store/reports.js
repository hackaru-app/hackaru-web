import groupBy from 'lodash.groupby';

export const SET_REPORTS = 'SET_REPORTS';
export const SET_PREVIOUS_TOTALS = 'SET_PREVIOUS_TOTALS';

export const state = () => ({
  projects: [],
  totals: {},
  previousTotals: {},
  labels: [],
  sums: {},
  activityGroups: [],
});

export const actions = {
  async fetch({ commit }, payload) {
    const request = async (payload) =>
      await this.$api.request({
        url: '/v1/report',
        withCredentials: true,
        params: {
          start: payload.start,
          end: payload.end,
          projectIds: payload.projectIds,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      });

    const [current, previous] = await Promise.all([
      await request({
        start: payload.current.start,
        end: payload.current.end,
        projectIds: payload.current.projectIds,
      }),
      await request({
        start: payload.previous.start,
        end: payload.previous.end,
        projectIds: payload.previous.projectIds,
      }),
    ]);
    commit(SET_REPORTS, {
      projects: current.data.projects,
      totals: current.data.totals,
      labels: current.data.labels,
      sums: current.data.sums,
      activityGroups: current.data.activityGroups,
    });
    commit(SET_PREVIOUS_TOTALS, {
      totals: previous.data.totals,
    });
  },
  async fetchPdf(_, payload) {
    const res = await this.$api.request(
      {
        url: '/v1/report.pdf',
        withCredentials: true,
        responseType: 'blob',
        params: {
          start: payload.start,
          end: payload.end,
          projectIds: payload.projectIds,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      },
      { root: true }
    );
    return res.data;
  },
  async fetchCsv(_, payload) {
    const res = await this.$api.request(
      {
        url: '/v1/report.csv',
        withCredentials: true,
        responseType: 'blob',
        params: {
          start: payload.start,
          end: payload.end,
          projectIds: payload.projectIds,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      },
      { root: true }
    );
    return res.data;
  },
};

export const mutations = {
  [SET_REPORTS](state, payload) {
    state.projects = payload.projects;
    state.totals = payload.totals;
    state.labels = payload.labels;
    state.sums = payload.sums;
    state.start = payload.start;
    state.end = payload.end;
    state.activityGroups = payload.activityGroups;
  },
  [SET_PREVIOUS_TOTALS](state, payload) {
    state.previousTotals = payload.totals;
  },
};

export const getters = {
  projects: (state) => {
    return state.projects
      .slice()
      .sort((a, b) => state.totals[b.id] - state.totals[a.id]);
  },
  totals: (state) => {
    return state.totals;
  },
  previousTotals: (state) => {
    return state.previousTotals;
  },
  activityGroups: (state) => {
    return groupBy(state.activityGroups, ({ project }) => project.id);
  },
  empty: (state) => {
    return !Object.values(state.totals).find((value) => value > 0);
  },
  barChartData: (state) => {
    return {
      labels: state.labels,
      datasets: state.projects.map((project) => ({
        maxBarThickness: 40,
        label: project.name,
        backgroundColor: project.color,
        data: state.sums[project.id],
      })),
    };
  },
  doughnutChartData: (state) => {
    const projects = state.projects;
    return {
      labels: projects.map(({ name }) => name),
      datasets: [
        {
          data: projects.map(({ id }) => state.totals[id]),
          borderWidth: 0,
          backgroundColor: projects.map(({ color }) => color),
        },
      ],
    };
  },
};
