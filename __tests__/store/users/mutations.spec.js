import { mutations } from '~/store/user';

describe('Mutations', () => {
  describe('when commit SET_USER', () => {
    const state = {
      timeZone: 'Etc/UTC',
      receiveWeekReport: false,
      receiveMonthReport: false,
      startDay: 0,
    };

    beforeEach(() => {
      mutations.$i18n = {
        setLocale: jest.fn(),
      };
      mutations['SET_USER'](state, {
        timeZone: 'Asia/Tokyo',
        receiveWeekReport: true,
        receiveMonthReport: true,
        locale: 'ja',
        startDay: 1,
      });
    });

    it('sets user data', () => {
      expect(state.timeZone).toBe('Asia/Tokyo');
      expect(state.receiveWeekReport).toBe(true);
      expect(state.receiveMonthReport).toBe(true);
      expect(state.startDay).toBe(1);
    });

    it('sets locale', () => {
      expect(mutations.$i18n.setLocale).toHaveBeenCalledWith('ja');
    });
  });
});
