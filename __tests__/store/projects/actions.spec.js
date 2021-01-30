import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/projects';
import { project } from '@/schemas';

describe('Actions', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch fetch', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      mock.onGet('/v1/projects').replyOnce(200, {});
      actions.fetch({ dispatch });
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
    const dispatch = jest.fn();

    beforeEach(() => {
      mock.onPost('/v1/projects').replyOnce(200, {});
      actions.add({ dispatch }, {});
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
      mock.onDelete('/v1/projects/1').replyOnce(200, {});
      actions.delete({ dispatch }, 1);
    });

    it('dispatches entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'projects', id: 1 },
        { root: true }
      );
    });

    it('requests api', () => {
      expect(mock.history.delete.length).toBe(1);
    });
  });

  describe('when dispatch update', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      mock.onPut('/v1/projects/1', { project: { id: 1 } }).replyOnce(200, {});
      actions.update({ dispatch }, { id: 1 });
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
