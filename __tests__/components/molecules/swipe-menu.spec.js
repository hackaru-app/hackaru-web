import { shallowMount } from '@vue/test-utils';
import SwipeMenu from '~/components/molecules/swipe-menu';
import testId from '~/__tests__/__helpers__/test-id';

describe('SwipeMenu', () => {
  let wrapper;

  jest.useFakeTimers();

  const dragEvent = (x, y) => ({
    e: { preventDefault: () => {} },
    distance: { x, y },
  });

  const factory = () =>
    shallowMount(SwipeMenu, {
      slots: {
        left: '<span>Left</span>',
        default: '<p>Content</p>',
        right: '<span>Right</span>',
      },
    });

  describe('when scroll window', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('window-scroll')).vm.$emit('scroll');
    });

    it('disable swipe menu', () => {
      expect(wrapper.find(testId('content')).props().enabled).toBe(false);
    });
  });

  describe('when scroll window', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('window-scroll')).vm.$emit('end');
    });

    it('enable swipe menu', () => {
      expect(wrapper.find(testId('content')).props().enabled).toBe(true);
    });
  });

  describe('when swiping left', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('content')).vm.$emit('start');
      wrapper.find(testId('content')).vm.$emit('move', dragEvent(100, 0));
    });

    it('sets left style', () => {
      expect(wrapper.find(testId('left-menu')).attributes().style).toBe(
        'width: 100px; animation-name: none;'
      );
    });

    it('unset right style', () => {
      expect(wrapper.find(testId('right-menu')).attributes().style).toBe(
        'width: 0px; animation-name: none;'
      );
    });
  });

  describe('when swiping right', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('content')).vm.$emit('start');
      wrapper.find(testId('content')).vm.$emit('move', dragEvent(-100, 0));
    });

    it('unset left style', () => {
      expect(wrapper.find(testId('left-menu')).attributes().style).toBe(
        'width: 0px; animation-name: none;'
      );
    });

    it('sets right style', () => {
      expect(wrapper.find(testId('right-menu')).attributes().style).toBe(
        'width: 100px; animation-name: none;'
      );
    });
  });

  describe('when left swiped', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('content')).vm.$emit('start');
      wrapper.find(testId('content')).vm.$emit('move', dragEvent());
      wrapper.find(testId('content')).vm.$emit('end', dragEvent(200, 0));
      jest.runOnlyPendingTimers();
    });

    it('sets left style', () => {
      expect(wrapper.find(testId('left-menu')).attributes().style).toBe(
        'width: 100%; animation-name: none; transition: width 300ms;'
      );
    });

    it('emits swipe-left', () => {
      expect(wrapper.emitted('swipe-left')).toBeTruthy();
    });
  });

  describe('when right swiped', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('content')).vm.$emit('start');
      wrapper.find(testId('content')).vm.$emit('move', dragEvent());
      wrapper.find(testId('content')).vm.$emit('end', dragEvent(-200, 0));
      jest.runOnlyPendingTimers();
    });

    it('sets right style', () => {
      expect(wrapper.find(testId('right-menu')).attributes().style).toBe(
        'width: 100%; animation-name: none; transition: width 300ms;'
      );
    });

    it('emits swipe-right', () => {
      expect(wrapper.emitted('swipe-right')).toBeTruthy();
    });
  });

  describe('when swiped but distance is too low', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('content')).vm.$emit('start');
      wrapper.find(testId('content')).vm.$emit('move', dragEvent());
      wrapper.find(testId('content')).vm.$emit('end', dragEvent(3, 0));
    });

    it('unset left style', () => {
      expect(wrapper.find(testId('left-menu')).attributes().style).toBe(
        'width: 0px; animation-name: none; transition: width 300ms;'
      );
    });

    it('unset right style', () => {
      expect(wrapper.find(testId('right-menu')).attributes().style).toBe(
        'width: 0px; animation-name: none; transition: width 300ms;'
      );
    });
  });
});
