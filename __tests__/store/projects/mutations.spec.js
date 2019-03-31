import { mutations } from '@/store/projects';

describe('Mutations', () => {
  let state;

  describe('when commit SET_PROJECTS', () => {
    beforeEach(() => {
      state = { items: [4] };
      mutations['SET_PROJECTS'](state, [1, 2, 3]);
    });

    it('set ids', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit ADD_PROJECT', () => {
    beforeEach(() => {
      state = { items: [1, 2] };
      mutations['ADD_PROJECT'](state, 3);
    });

    it('add id', () => {
      expect(state.items).toEqual([1, 2, 3]);
    });
  });

  describe('when commit REMOVE_PROJECT', () => {
    beforeEach(() => {
      state = { items: [1, 2, 3] };
      mutations['REMOVE_PROJECT'](state, 2);
    });

    it('remove id', () => {
      expect(state.items).toEqual([1, 3]);
    });
  });
});
