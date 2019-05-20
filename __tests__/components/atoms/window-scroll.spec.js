import { mount } from '@vue/test-utils';
import WindowScroll from '@/components/atoms/window-scroll';

jest.useFakeTimers();

describe('WindowScroll', () => {
  let wrapper;

  const factory = () => mount(WindowScroll, { attachToDocument: true });

  describe('when scroll', () => {
    beforeEach(() => {
      wrapper = factory();
      window.dispatchEvent(new CustomEvent('scroll'));
    });

    it('emit scroll', () => {
      expect(wrapper.emitted('scroll')).toBeTruthy();
    });
  });

  describe('when stop scrolling', () => {
    beforeEach(() => {
      wrapper = factory();
      window.dispatchEvent(new CustomEvent('scroll'));
      jest.runOnlyPendingTimers();
    });

    it('emit end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });
});
