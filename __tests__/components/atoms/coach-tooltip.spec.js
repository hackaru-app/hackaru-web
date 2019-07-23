import { shallowMount, createLocalVue } from '@vue/test-utils';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import Tooltip from '@/plugins/v-tooltip';

describe('CoachTooltip', () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.directive('tooltip', Tooltip);

  const factory = () =>
    shallowMount(CoachTooltip, {
      localVue,
      stubs: ['v-tooltip'],
      propsData: {
        name: 'example'
      }
    });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when user already seen', () => {
    beforeEach(() => {
      localStorage.setItem('coach-tooltip/example', true);
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
        'coach-tooltip/example',
        true
      );
    });
  });
});
