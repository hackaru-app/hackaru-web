import { getters } from '~/store/activity-calendar';

describe('Getters', () => {
  let result;

  describe('when call webcalUrl', () => {
    const state = {
      baseUrl: 'webcal://localhost',
      token: 'token',
      userId: 1,
    };

    beforeEach(() => {
      result = getters.webcalUrl(state);
    });

    it('returns url', () => {
      expect(result).toBe(
        'webcal://localhost/v1/activity_calendar?token=token&user_id=1'
      );
    });
  });

  describe('when call googleCalendarUrl', () => {
    const mockGetters = {
      webcalUrl:
        'webcal://localhost/v1/activity_calendar?token=token&user_id=1',
    };

    beforeEach(() => {
      result = getters.googleCalendarUrl({}, mockGetters);
    });

    it('returns url', () => {
      expect(result).toBe(
        'https://www.google.com/calendar/render?cid=webcal%3A%2F%2Flocalhost%2Fv1%2Factivity_calendar%3Ftoken%3Dtoken%26user_id%3D1'
      );
    });
  });
});
