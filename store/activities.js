import { activity } from '@/schemas';
import groupBy from 'lodash.groupby';
import {
  isWithinInterval,
  startOfDay,
  areIntervalsOverlapping,
  addMinutes,
  compareDesc,
  isSameWeek,
  parseISO,
  format
} from 'date-fns';

export const actions = {
  async fetchWorking({ dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        { url: '/v1/activities/working' },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async fetchByRange({ dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            start: payload.start,
            end: payload.end
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: [activity] },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async add({ dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async delete({ dispatch }, id) {
    try {
      dispatch('entities/delete', { name: 'activities', id }, { root: true });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'delete'
        },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async update({ dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${payload.id}`,
          method: 'put',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('activities', [activity]);
  },
  working(state, getters) {
    return getters.all.find(({ stoppedAt }) => !stoppedAt);
  },
  weekly: (state, getters) => {
    const weekly = getters.all
      .filter(({ startedAt }) => isSameWeek(parseISO(startedAt), new Date()))
      .sort((a, b) =>
        compareDesc(parseISO(a.startedAt), parseISO(b.startedAt))
      );
    return groupBy(weekly, ({ startedAt }) =>
      format(parseISO(startedAt), 'yyyy-MM-dd')
    );
  },
  getCalendar: (state, getters) => (date, toMin) => {
    const rows = [];
    const addNewRow = () => rows.push([]) - 1;

    getters.all
      .filter(activity => isRange(activity, date))
      .forEach(activity => {
        const overlappedIndex = findOverppedRow(rows, activity, toMin);
        const index = overlappedIndex > -1 ? overlappedIndex : addNewRow();
        rows[index].push(activity);
      });
    return rows;
  }
};

function isRange({ startedAt, stoppedAt }, date) {
  const start = startOfDay(parseISO(startedAt));
  const end = startOfDay(parseISO(stoppedAt));
  return (
    stoppedAt && isWithinInterval(startOfDay(parseISO(date)), { start, end })
  );
}

function isOverlapped(a, b, toMin) {
  const toRange = activity => {
    const start = parseISO(activity.startedAt);
    const duration = Math.max(toMin(20), activity.duration / 60);
    return { start, end: addMinutes(start, duration) };
  };
  return areIntervalsOverlapping(toRange(a), toRange(b));
}

function findOverppedRow(rows, b, toMin) {
  return rows.findIndex(row => row.find(a => isOverlapped(a, b, toMin)));
}
