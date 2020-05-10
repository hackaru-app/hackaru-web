import { shallowMount, createLocalVue } from '@vue/test-utils';
import CoachTooltip from '@/components/atoms/coach-tooltip';

describe('CoachTooltip', () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.directive('tooltip', () => {});

  const factory = () =>
    shallowMount(CoachTooltip, {
      localVue,
      propsData: {
        name: 'example',
      },
    });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when user already seen', () => {
    beforeEach(() => {
      localStorage.setItem('coachTooltip/example', true);
      wrapper = factory();
    });

    it('does not show tooltip', () => {
      expect(wrapper.vm.params.show).toBe(false);
    });
  });

  describe('when user does not seen', () => {
    beforeEach(() => {
      wrapper = factory();
    });

    it('does not show tooltip', () => {
      expect(wrapper.vm.params.show).toBe(true);
    });
  });

  describe('when hide', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.vm.hide();
    });

    it('hide tooltip', () => {
      expect(wrapper.vm.params.show).toBe(false);
    });

    it('store hidden flag to local-storage', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'coachTooltip/example',
        true
      );
    });
  });
});
