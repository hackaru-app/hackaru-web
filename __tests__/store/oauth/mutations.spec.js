import { mutations } from '~/store/oauth';

describe('Mutations', () => {
  describe('when commit SET_CLIENT', () => {
    const state = { client: {} };

    beforeEach(() => {
      mutations['SET_CLIENT'](state, {
        clientName: 'Hackaru for Desktop',
        scope: 'activity:create activity:update',
        responseType: 'code',
        state: 'state',
      });
    });

    it('sets client', () => {
      expect(state.client).toEqual({
        name: 'Hackaru for Desktop',
        scopes: ['activity:create', 'activity:update'],
        responseType: 'code',
        state: 'state',
      });
    });
  });

  describe('when commit SET_DECIDED_RESPONSE with redirectUri', () => {
    const state = { decided: false, redirectUri: '', redirectQuery: {} };

    beforeEach(() => {
      mutations['SET_DECIDED_RESPONSE'](state, {
        status: 'redirect',
        redirectUri: 'http://example.com?code=code',
      });
    });

    it('sets decided is true', () => {
      expect(state.decided).toBe(true);
    });

    it('sets redirectUri', () => {
      expect(state.redirectUri).toBe('http://example.com?code=code');
    });

    it('sets redirectQuery is empty', () => {
      expect(state.redirectQuery).toEqual({});
    });
  });

  describe('when commit SET_DECIDED_RESPONSE with code', () => {
    const state = { decided: false, redirectUri: '', redirectQuery: {} };

    beforeEach(() => {
      mutations['SET_DECIDED_RESPONSE'](state, {
        status: 'redirect',
        redirectUri: {
          action: 'show',
          code: 'code',
        },
      });
    });

    it('sets decided is true', () => {
      expect(state.decided).toBe(true);
    });

    it('removes redirectUri', () => {
      expect(state.redirectUri).toBe('');
    });

    it('sets redirectQuery', () => {
      expect(state.redirectQuery).toEqual({
        code: 'code',
        access_token: undefined,
        error_description: undefined,
      });
    });
  });

  describe('when commit SET_DECIDED_RESPONSE with accessToken', () => {
    const state = { decided: false, redirectUri: '', redirectQuery: {} };

    beforeEach(() => {
      mutations['SET_DECIDED_RESPONSE'](state, {
        status: 'redirect',
        redirectUri: {
          controller: 'doorkeeper/token_info',
          action: 'show',
          accessToken: 'accessToken',
        },
      });
    });

    it('sets decided is true', () => {
      expect(state.decided).toBe(true);
    });

    it('removes redirectUri', () => {
      expect(state.redirectUri).toBe('');
    });

    it('sets redirectQuery', () => {
      expect(state.redirectQuery).toEqual({
        code: undefined,
        access_token: 'accessToken',
        error_description: undefined,
      });
    });
  });

  describe('when commit SET_DECIDED_RESPONSE with errorDescription', () => {
    const state = { decided: false, redirectUri: '', redirectQuery: {} };

    beforeEach(() => {
      mutations['SET_DECIDED_RESPONSE'](state, {
        error: 'access_denied',
        errorDescription: 'errorDescription',
      });
    });

    it('sets decided is true', () => {
      expect(state.decided).toBe(true);
    });

    it('removes redirectUri', () => {
      expect(state.redirectUri).toBe('');
    });

    it('sets redirectQuery', () => {
      expect(state.redirectQuery).toEqual({
        code: undefined,
        access_token: undefined,
        error_description: 'errorDescription',
      });
    });
  });
});
