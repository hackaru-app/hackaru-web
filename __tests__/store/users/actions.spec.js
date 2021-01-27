import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/user';

describe('Actions', () => {
  let result;

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch fetch', () => {
    const commit = jest.fn();

    beforeEach(async () => {
      mock.onGet('/v1/user').replyOnce(200, {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
      });
      result = await actions.fetch({ commit });
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

    beforeEach(async () => {
      mock
        .onPut('/v1/user', {
          user: {
            timeZone: 'Asia/Tokyo',
            receiveWeekReport: true,
            receiveMonthReport: true,
          },
        })
        .replyOnce(200, {
          timeZone: 'Asia/Tokyo',
          receiveWeekReport: true,
          receiveMonthReport: true,
        });
      result = await actions.update(
        { commit },
        {
          timeZone: 'Asia/Tokyo',
          receiveWeekReport: true,
          receiveMonthReport: true,
        }
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
