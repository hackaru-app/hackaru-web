import { getters } from '~/store/activity-calendar';

describe('Getters', () => {
  let result;

  describe('when call calendarUrl', () => {
    const state = {
      baseUrl: 'https://localhost',
      token: 'token',
      userId: 1,
    };

    beforeEach(() => {
      result = getters.calendarUrl(state);
    });

    it('returns url', () => {
      expect(result).toBe(
        'https://localhost/v1/activity_calendar?token=token&user_id=1'
      );
    });
  });
});
