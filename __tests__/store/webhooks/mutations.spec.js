import { mutations } from '@/store/webhooks';

describe('Mutations', () => {
  let state;

  describe('when commit SET_WEBHOOKS', () => {
    beforeEach(() => {
      state = { items: [4] };
      mutations['SET_WEBHOOKS'](state, [1, 2, 3]);
    });

    it('set ids', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit ADD_WEBHOOK', () => {
    beforeEach(() => {
      state = { items: [1, 2] };
      mutations['ADD_WEBHOOK'](state, 3);
    });

    it('add id', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit REMOVE_WEBHOOK', () => {
    beforeEach(() => {
      state = { items: [1, 2, 3] };
      mutations['REMOVE_WEBHOOK'](state, 2);
    });

    it('remove id', () => {
      expect(state.items).toEqual([1, 3]);
    });
  });
});
