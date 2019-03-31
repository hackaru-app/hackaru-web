import { mutations } from '@/store/activities';

describe('Mutations', () => {
  let state;

  describe('when commit MERGE_ACTIVITIES', () => {
    beforeEach(() => {
      state = { items: [1, 2] };
      mutations['MERGE_ACTIVITIES'](state, [1, 2, 3]);
    });

    it('merge ids', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit ADD_ACTIVITY', () => {
    beforeEach(() => {
      state = { items: [1, 2] };
      mutations['ADD_ACTIVITY'](state, 3);
    });

    it('add id', () => {
      expect(state.items).toEqual([3, 1, 2]);
    });
  });

  describe('when commit REMOVE_ACTIVITY', () => {
    beforeEach(() => {
      state = { items: [1, 2, 3] };
      mutations['REMOVE_ACTIVITY'](state, 2);
    });

    it('remove id', () => {
      expect(state.items).toEqual([1, 3]);
    });
  });
});
