import { mutations } from '@/store/user';

describe('Mutations', () => {
  describe('when commit SET_USER', () => {
    const state = {
      timeZone: 'Etc/UTC',
      receiveWeekReport: false,
      receiveMonthReport: false,
      receiveReminder: false
    };

    beforeEach(() => {
      mutations.$i18n = {
        setLocale: jest.fn()
      };
      mutations['SET_USER'](state, {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
        receiveReminder: true,
        locale: 'ja'
      });
    });

    it('set user data', () => {
      expect(state.timeZone).toBe('Asia/Tokyo');
      expect(state.receiveWeekReport).toBe(true);
      expect(state.receiveMonthReport).toBe(true);
      expect(state.receiveReminder).toBe(true);
    });

    it('set locale', () => {
      expect(mutations.$i18n.setLocale).toHaveBeenCalledWith('ja');
    });
  });
});
