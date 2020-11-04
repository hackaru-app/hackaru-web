import { actions } from '@/store/projects';
import { project } from '@/schemas';

describe('Actions', () => {
  describe('when dispatch fetch', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetch({ dispatch });
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects',
        },
        { root: true }
      );
    });

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [project],
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
          url: '/v1/projects',
          method: 'post',
          data: {
            project: {},
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
          schema: project,
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
        { name: 'projects', id: 1 },
        { root: true }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects/1',
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
          url: '/v1/projects/1',
          method: 'put',
          data: {
            project: { id: 1 },
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
          schema: project,
        },
        { root: true }
      );
    });
  });
});
