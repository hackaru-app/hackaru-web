import { activity } from '~/schemas';
import groupBy from 'lodash.groupby';
import {
  isWithinInterval,
  startOfDay,
  endOfDay,
  areIntervalsOverlapping,
  addMinutes,
  compareDesc,
  parseISO,
  formatISO,
  addDays,
} from 'date-fns';

export const actions = {
  async fetchWorking({ dispatch }) {
    const res = await this.$api.request({
      url: '/v1/activities/working',
      withCredentials: true,
    });
    dispatch(
      'entities/merge',
      { json: res.data, schema: activity },
      { root: true }
    );
  },
  async fetchByRange({ dispatch }, payload) {
    const res = await this.$api.request({
      url: '/v1/activities',
      withCredentials: true,
      params: {
        start: payload.start,
        end: payload.end,
      },
    });
    dispatch(
      'entities/merge',
      { json: res.data, schema: [activity] },
      { root: true }
    );
  },
  async add({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: '/v1/activities',
        withCredentials: true,
        method: 'post',
        data: {
          activity: payload,
        },
      });
      dispatch(
        'entities/merge',
        { json: res.data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  async delete({ dispatch }, id) {
    dispatch('entities/delete', { name: 'activities', id }, { root: true });
    await this.$api.request({
      url: `/v1/activities/${id}`,
      method: 'delete',
      withCredentials: true,
    });
  },
  async update({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: `/v1/activities/${payload.id}`,
        method: 'put',
        withCredentials: true,
        data: {
          activity: payload,
        },
      });
      dispatch(
        'entities/merge',
        { json: res.data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const getters = {
  all(_state, _getters, _rootState, rootGetters) {
    return rootGetters['entities/getEntities']('activities', [activity]);
  },
  working(_state, getters) {
    return getters.all.find(({ stoppedAt }) => !stoppedAt);
  },
  pastWeek: (_state, getters) => {
    const weekly = getters.all
      .filter(({ stoppedAt }) => stoppedAt)
      .filter(({ startedAt }) => isWithinPastWeek(parseISO(startedAt)))
      .sort((a, b) =>
        compareDesc(parseISO(a.startedAt), parseISO(b.startedAt))
      );
    return groupBy(weekly, ({ startedAt }) =>
      formatISO(parseISO(startedAt), { representation: 'date' })
    );
  },
  getCalendar: (_state, getters) => (date, toMin) => {
    const rows = [];
    const addNewRow = () => rows.push([]) - 1;

    getters.all
      .filter((activity) => isRange(activity, date))
      .forEach((activity) => {
        const overlappedIndex = findOverppedRow(rows, activity, toMin);
        const index = overlappedIndex > -1 ? overlappedIndex : addNewRow();
        rows[index].push(activity);
      });
    return rows;
  },
};

function isWithinPastWeek(date) {
  return isWithinInterval(date, {
    start: startOfDay(addDays(new Date(), -7)),
    end: endOfDay(new Date()),
  });
}

function isRange({ startedAt, stoppedAt }, date) {
  const start = startOfDay(parseISO(startedAt));
  const end = startOfDay(parseISO(stoppedAt));
  return (
    stoppedAt && isWithinInterval(startOfDay(parseISO(date)), { start, end })
  );
}

function isOverlapped(a, b, toMin) {
  const toRange = (activity) => {
    const start = parseISO(activity.startedAt);
    const duration = Math.max(toMin(20), activity.duration / 60);
    return { start, end: addMinutes(start, duration) };
  };
  return areIntervalsOverlapping(toRange(a), toRange(b));
}

function findOverppedRow(rows, b, toMin) {
  return rows.findIndex((row) => row.find((a) => isOverlapped(a, b, toMin)));
}
