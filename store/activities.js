import { activity } from '@/schemas';
import groupBy from 'lodash.groupby';
import {
  isWithinRange,
  startOfDay,
  areRangesOverlapping,
  addMinutes,
  compareDesc,
  isSameWeek
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
  getByRange: (state, getters) => (start, end) => {
    return getters.all
      .filter(({ stoppedAt }) => stoppedAt)
      .filter(({ startedAt }) => isWithinRange(startedAt, start, end))
      .sort((a, b) => compareDesc(a.startedAt, b.startedAt));
  },
  weekly: (state, getters) => {
    const weekly = getters.all
      .filter(({ stoppedAt }) => stoppedAt)
      .filter(({ startedAt }) => isSameWeek(startedAt, new Date()))
      .sort((a, b) => compareDesc(a.startedAt, b.startedAt));
    return groupBy(weekly, ({ startedAt }) => startOfDay(startedAt));
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
  return (
    stoppedAt &&
    isWithinRange(
      startOfDay(date),
      startOfDay(startedAt),
      startOfDay(stoppedAt)
    )
  );
}

function isOverlapped(a, b, toMin) {
  return areRangesOverlapping(
    a.startedAt,
    addMinutes(a.startedAt, Math.max(toMin(20), a.duration / 60)),
    b.startedAt,
    addMinutes(b.startedAt, Math.max(toMin(20), b.duration / 60))
  );
}

function findOverppedRow(rows, b, toMin) {
  return rows.findIndex(row => row.find(a => isOverlapped(a, b, toMin)));
}
