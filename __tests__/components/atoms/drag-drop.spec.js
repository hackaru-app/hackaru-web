import { mount } from '@vue/test-utils';
import DragDrop from '~/components/atoms/drag-drop';

describe('DragDrop', () => {
  let wrapper;

  jest.useFakeTimers();

  const touchEvent = { touches: [{}] };
  const factory = () => mount(DragDrop, { attachTo: document.body });

  describe('when mousedown', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('mousedown');
      jest.runOnlyPendingTimers();
    });

    it('emits start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when mousemove', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('mousedown', { pageX: 50, pageY: 50 });
      jest.runOnlyPendingTimers();
      wrapper.trigger('mousemove', { pageX: 70, pageY: 80 });
    });

    it('emits move', () => {
      expect(wrapper.emitted('move')).toBeTruthy();
    });

    it('has distance correctly', () => {
      expect(wrapper.emitted('move')[0][0].distance.x).toBe(20);
      expect(wrapper.emitted('move')[0][0].distance.y).toBe(30);
    });
  });

  describe('when mouseup', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('mousedown');
      jest.runOnlyPendingTimers();
      wrapper.trigger('mousemove');
      wrapper.trigger('mouseup');
    });

    it('emits end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when touchstart', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('touchstart', touchEvent);
      jest.runOnlyPendingTimers();
    });

    it('emits start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when touchmove', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('touchstart', touchEvent);
      jest.runOnlyPendingTimers();
      wrapper.trigger('touchmove', touchEvent);
    });

    it('emits move', () => {
      expect(wrapper.emitted('move')).toBeTruthy();
    });
  });

  describe('when touchend', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('touchstart', touchEvent);
      jest.runOnlyPendingTimers();
      wrapper.trigger('touchmove', touchEvent);
      wrapper.trigger('touchend', touchEvent);
    });

    it('emits end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when mousemove before delay completed', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('mousedown');
      wrapper.trigger('mousemove', { pageX: 500 });
      jest.runOnlyPendingTimers();
      wrapper.trigger('mousemove');
    });

    it('does not emit move', () => {
      expect(wrapper.emitted('move')).toBeFalsy();
    });
  });

  describe('when mouseup but mousemove not called', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.trigger('mousedown', { pageX: 10, pageY: 10 });
      jest.runOnlyPendingTimers();
      wrapper.trigger('mouseup');
    });

    it('distance x and y are zero', () => {
      expect(wrapper.emitted('end')[0][0].distance.x).toBe(0);
      expect(wrapper.emitted('end')[0][0].distance.y).toBe(0);
    });
  });
});
