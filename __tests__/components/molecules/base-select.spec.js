import { shallowMount } from '@vue/test-utils';
import BaseSelect from '@/components/molecules/base-select';

describe('BaseSelect', () => {
  let wrapper;

  const factory = () =>
    shallowMount(BaseSelect, {
      propsData: {
        value: 'apple',
      },
      slots: {
        default: `
        <option value="apple">apple</option>
        <option value="orange">orange</option>
        <option value="lemon">lemon</option>
      `,
      },
    });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.findAll('option').at(1).setSelected();
    });

    it('emits change', () => {
      expect(wrapper.emitted('change')[0][0]).toBe('orange');
    });
  });
});
