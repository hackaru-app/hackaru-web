import { shallowMount } from '@vue/test-utils';
import ColorSelect from '~/components/molecules/color-select';

describe('ColorSelect', () => {
  let wrapper;

  const factory = () => shallowMount(ColorSelect);

  describe('when select color', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.setProps({ colors: ['#ff0', '#f00', '#0ff'] });
      wrapper.findAll('button').at(2).trigger('click');
    });

    it('emits update:value', () => {
      expect(wrapper.emitted('update:value')[0]).toEqual(['#0ff']);
    });
  });
});
