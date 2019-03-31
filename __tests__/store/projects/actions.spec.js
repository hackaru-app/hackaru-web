import { actions } from '@/store/projects';
import { project } from '@/schemas';

describe('Actions', () => {
  let params;

  beforeEach(() => {
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getProjects', () => {
    beforeEach(() => {
      params.dispatch
        .mockReturnValueOnce({
          data: [
            {
              id: 1,
              name: 'Development',
              color: '#ff0'
            }
          ]
        })
        .mockReturnValueOnce({
          result: [1]
        });
      actions.getProjects(params);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        { url: '/v1/projects' },
        { root: true }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: [
            {
              id: 1,
              name: 'Development',
              color: '#ff0'
            }
          ],
          schema: [project]
        },
        { root: true }
      );
    });

    it('commit SET_PROJECTS', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_PROJECTS', [1]);
    });
  });

  describe('when dispatch getProjects but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.getProjects(params);
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });

  describe('when dispatch addProject', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch
        .mockReturnValueOnce({
          data: {
            id: 1,
            name: 'Development',
            color: '#ff0'
          }
        })
        .mockReturnValueOnce({
          result: 1
        });
      sucess = await actions.addProject(params, {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects',
          method: 'post',
          data: {
            project: {
              id: 1,
              name: 'Development',
              color: '#ff0'
            }
          }
        },
        { root: true }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: {
            id: 1,
            name: 'Development',
            color: '#ff0'
          },
          schema: project
        },
        { root: true }
      );
    });

    it('commit ADD_PROJECT', () => {
      expect(params.commit).toHaveBeenCalledWith('ADD_PROJECT', 1);
    });

    it('returns true', () => {
      expect(sucess).toBe(true);
    });
  });

  describe('when dispatch addProject but throw error', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      sucess = await actions.addProject(params, {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(sucess).toBe(false);
    });
  });

  describe('when dispatch deleteProject', () => {
    beforeEach(() => {
      params.dispatch.mockReturnValueOnce({
        data: {
          id: 1,
          name: 'Development',
          color: '#ff0'
        }
      });
      actions.deleteProject(params, 1);
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects/1',
          method: 'delete'
        },
        { root: true }
      );
    });

    it('commit REMOVE_PROJECT', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_PROJECT', 1);
    });
  });

  describe('when dispatch deleteProject but throw error', () => {
    beforeEach(() => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      actions.deleteProject(params, 1);
    });

    it('commit REMOVE_PROJECT', () => {
      expect(params.commit).toHaveBeenCalledWith('REMOVE_PROJECT', 1);
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });
  });

  describe('when dispatch updateProject', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch
        .mockReturnValueOnce({
          data: {
            id: 1,
            name: 'Development',
            color: '#ff0'
          }
        })
        .mockReturnValueOnce({
          result: 1
        });
      sucess = await actions.updateProject(params, {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects/1',
          method: 'put',
          data: {
            project: {
              id: 1,
              name: 'Development',
              color: '#ff0'
            }
          }
        },
        { root: true }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: {
            id: 1,
            name: 'Development',
            color: '#ff0'
          },
          schema: project
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(sucess).toBe(true);
    });
  });

  describe('when dispatch updateProject but throw error', () => {
    let sucess;

    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      sucess = await actions.updateProject(params, {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(sucess).toBe(false);
    });
  });
});
