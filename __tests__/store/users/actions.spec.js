import { actions } from '@/store/user';

describe('Actions', () => {
  let result;

  describe('when dispatch fetch', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
      },
    }));

    beforeEach(async () => {
      result = await actions.fetch({ commit, dispatch });
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/user',
          method: 'get',
        },
        { root: true }
      );
    });

    it('commits SET_USER', () => {
      expect(commit).toHaveBeenCalledWith('SET_USER', {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch update', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
      },
    }));

    beforeEach(async () => {
      result = await actions.update(
        { commit, dispatch },
        {
          timeZone: 'Asia/Tokyo',
          receiveWeekReport: true,
          receiveMonthReport: true,
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/user',
          method: 'put',
          data: {
            user: {
              timeZone: 'Asia/Tokyo',
              receiveWeekReport: true,
              receiveMonthReport: true,
            },
          },
        },
        { root: true }
      );
    });

    it('commits SET_USER', () => {
      expect(commit).toHaveBeenCalledWith('SET_USER', {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });
});
