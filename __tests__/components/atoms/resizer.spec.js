import { shallowMount } from '@vue/test-utils';
import Resizer from '@/components/atoms/resizer';

describe('Resizer', () => {
  let wrapper;

  const factory = () => shallowMount(Resizer);
  const dragEvent = (x, y) => ({
    e: { preventDefault: () => {} },
    distance: { x, y },
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('start', dragEvent());
    });

    it('emits start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('start', dragEvent());
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('move', dragEvent(0, 80));
    });

    it('emits resizing', () => {
      expect(wrapper.emitted('resizing')).toBeTruthy();
    });

    it('emits update:height', () => {
      expect(wrapper.emitted('update:height')[0][0]).toBe(80);
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('start', dragEvent());
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('move', dragEvent(70, 80));
      wrapper.findComponent({ ref: 'drag-drop' }).vm.$emit('end', dragEvent());
    });

    it('emits end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when drop but not moved', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('start', dragEvent(0, 0));
      wrapper
        .findComponent({ ref: 'drag-drop' })
        .vm.$emit('end', dragEvent(0, 0));
    });

    it('emits cancel', () => {
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });
});
