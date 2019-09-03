import { mount } from '@vue/test-utils';
import WindowScroll from '@/components/atoms/window-scroll';

describe('WindowScroll', () => {
  let wrapper;

  jest.useFakeTimers();

  const factory = () => mount(WindowScroll, { attachToDocument: true });

  describe('when scroll', () => {
    beforeEach(() => {
      wrapper = factory();
      window.dispatchEvent(new CustomEvent('scroll'));
      window.dispatchEvent(new CustomEvent('scroll'));
      window.dispatchEvent(new CustomEvent('scroll'));
    });

    it('emit start only once', () => {
      expect(wrapper.emitted('start').length).toBe(1);
    });

    it('emit scroll', () => {
      expect(wrapper.emitted('scroll').length).toBe(3);
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
