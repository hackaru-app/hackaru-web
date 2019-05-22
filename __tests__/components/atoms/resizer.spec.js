import { shallowMount } from '@vue/test-utils';
import Resizer from '@/components/atoms/resizer';

describe('Resizer', () => {
  let wrapper;

  const factory = () => shallowMount(Resizer);
  const dragEvent = (x, y) => ({
    e: { preventDefault: () => {} },
    distance: { x, y }
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('start', dragEvent());
    });

    it('emit start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('start', dragEvent());
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('move', dragEvent(0, 80));
    });

    it('emit resizing', () => {
      expect(wrapper.emitted('resizing')).toBeTruthy();
    });

    it('emit update:height', () => {
      expect(wrapper.emitted('update:height')[0][0]).toBe(80);
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('start', dragEvent());
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('move', dragEvent(70, 80));
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('end', dragEvent());
    });

    it('emit end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when drop but not moved', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('start', dragEvent(0, 0));
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('end', dragEvent(0, 0));
    });

    it('emit cancel', () => {
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });
});
