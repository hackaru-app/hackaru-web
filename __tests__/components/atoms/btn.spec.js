import { factory } from '@/__tests__/__setups__/factory';
import Btn from '@/components/atoms/btn';

describe('Btn', () => {
  const shallow = factory(Btn);

  describe('when click button', () => {
    it('emit click event', () => {
      const wrapper = shallow();
      wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});
