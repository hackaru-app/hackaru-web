import { mutations } from '@/store/user';

describe('Mutations', () => {
  describe('when commit SET_USER', () => {
    const state = {
      timeZone: 'Etc/UTC',
      receiveWeekReport: false,
      receiveMonthReport: false
    };

    beforeEach(() => {
      mutations['SET_USER'](state, {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true
      });
    });

    it('set user data', () => {
      expect(state.timeZone).toBe('Asia/Tokyo');
      expect(state.receiveWeekReport).toBe(true);
      expect(state.receiveMonthReport).toBe(true);
    });
  });
});
