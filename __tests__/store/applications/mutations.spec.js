import { mutations } from '@/store/applications';

describe('Mutations', () => {
  let state;

  describe('when commit MERGE_APPLICATIONS', () => {
    beforeEach(() => {
      state = { items: [1, 2] };
      mutations['MERGE_APPLICATIONS'](state, [1, 2, 3]);
    });

    it('merge ids', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit REMOVE_APPLICATION', () => {
    beforeEach(() => {
      state = { items: [1, 2, 3] };
      mutations['REMOVE_APPLICATION'](state, 2);
    });

    it('remove id', () => {
      expect(state.items).toEqual([1, 3]);
    });
  });
});
