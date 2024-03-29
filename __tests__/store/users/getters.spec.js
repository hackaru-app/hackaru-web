import { getters } from '~/store/user';

describe('Getters', () => {
  let result;

  describe('when call timeZone', () => {
    const state = { timeZone: 'Asia/Tokyo' };

    beforeEach(() => {
      result = getters.timeZone(state);
    });

    it('returns time zone', () => {
      expect(result).toBe('Asia/Tokyo');
    });
  });

  describe('when call receiveWeekReport', () => {
    const state = { receiveWeekReport: true };

    beforeEach(() => {
      result = getters.receiveWeekReport(state);
    });

    it('returns receiveWeekReport', () => {
      expect(result).toBe(true);
    });
  });

  describe('when call receiveMonthReport', () => {
    const state = { receiveMonthReport: true };

    beforeEach(() => {
      result = getters.receiveMonthReport(state);
    });

    it('returns receiveMonthReport', () => {
      expect(result).toBe(true);
    });
  });

  describe('when call startDay', () => {
    const state = { startDay: 0 };

    beforeEach(() => {
      result = getters.startDay(state);
    });

    it('returns startDay', () => {
      expect(result).toBe(0);
    });
  });
});
