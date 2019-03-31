import union from 'lodash.union';
import { activity } from '@/schemas';
import {
  isWithinRange,
  startOfDay,
  areRangesOverlapping,
  addMinutes
} from 'date-fns';

export const MERGE_ACTIVITIES = 'MERGE_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

export const state = () => ({
  items: []
});

export const actions = {
  async getWorkingActivities({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            working: true
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [activity] },
        { root: true }
      );
      commit(MERGE_ACTIVITIES, data.result);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },

  async getActivities({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
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
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [activity] },
        { root: true }
      );
      commit(MERGE_ACTIVITIES, data.result);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },

  async addActivity({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: {
              ...payload
            }
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: activity },
        { root: true }
      );
      commit(ADD_ACTIVITY, data.result);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },

  async deleteActivity({ commit, dispatch }, id) {
    try {
      commit(REMOVE_ACTIVITY, id);
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

  async updateActivity({ commit, dispatch }, payload) {
    const { id } = payload;
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'put',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      await dispatch(
        'entities/normalize',
        { json: res.data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const mutations = {
  [MERGE_ACTIVITIES](state, payload) {
    state.items = union(state.items, payload);
  },
  [ADD_ACTIVITY](state, payload) {
    state.items = [payload, ...state.items];
  },
  [REMOVE_ACTIVITY](state, payload) {
    state.items = state.items.filter(id => id !== payload);
  }
};

export const getters = {
  getActivities(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [activity]);
  },
  getWorkingActivities(state, getters) {
    return getters.getActivities.filter(({ stoppedAt }) => !stoppedAt);
  },
  getArchivesByDay: (state, getters) => date => {
    return getters.getActivities.filter(
      ({ stoppedAt, startedAt }) =>
        stoppedAt &&
        isWithinRange(
          startOfDay(date),
          startOfDay(startedAt),
          startOfDay(stoppedAt)
        )
    );
  },
  getCalendar: (state, getters) => (date, toMin) => {
    const packs = [];

    const isDuplicate = (a, b) => {
      return areRangesOverlapping(
        a.startedAt,
        addMinutes(a.startedAt, Math.max(toMin(20), a.duration / 60)),
        b.startedAt,
        addMinutes(b.startedAt, Math.max(toMin(20), b.duration / 60))
      );
    };
    const getDuplicatePackIndex = activity => {
      const index = packs.findIndex(pack =>
        pack.find(item => isDuplicate(item, activity))
      );
      if (index > -1) return index;
      return packs.push([]) - 1; // create new pack
    };
    getters.getArchivesByDay(date).forEach(activity => {
      packs[getDuplicatePackIndex(activity)].push(activity);
    });
    return packs;
  }
};
