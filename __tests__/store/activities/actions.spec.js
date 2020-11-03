import { actions } from '@/store/activities';
import { activity } from '@/schemas';
import { parseISO } from 'date-fns';

describe('Actions', () => {
  describe('when dispatch fetchWorking', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetchWorking({ dispatch });
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        { url: '/v1/activities/working' },
        { root: true }
      );
    });

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      );
    });
  });

  describe('when dispatch fetchByRange', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetchByRange(
        { dispatch },
        {
          start: parseISO('2019-01-01T01:23:45'),
          end: parseISO('2019-01-01T02:23:45'),
        }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            start: parseISO('2019-01-01T01:23:45'),
            end: parseISO('2019-01-01T02:23:45'),
          },
        },
        { root: true }
      );
    });

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [activity],
        },
        { root: true }
      );
    });
  });

  describe('when dispatch add', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.add({ dispatch }, {});
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: {},
          },
        },
        { root: true }
      );
    });

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      );
    });
  });

  describe('when dispatch delete', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.delete({ dispatch }, 1);
    });

    it('dispatches entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'activities', id: 1 },
        { root: true }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'delete',
        },
        { root: true }
      );
    });
  });

  describe('when dispatch update', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.update({ dispatch }, { id: 1 });
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'put',
          data: {
            activity: { id: 1 },
          },
        },
        { root: true }
      );
    });

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      );
    });
  });
});
