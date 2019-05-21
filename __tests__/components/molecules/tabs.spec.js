import { shallowMount } from '@vue/test-utils';
import Tabs from '@/components/molecules/tabs';

describe('Tabs', () => {
  let wrapper;

  const factory = () =>
    shallowMount(Tabs, {
      propsData: {
        items: ['Home', 'Reports', 'Calendar']
      }
    });

  describe('when click item', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findAll('li')
        .at(1)
        .trigger('click');
    });

    it('emit change', () => {
      expect(wrapper.emitted('change')[0][0]).toBe(1);
    });
  });
});
