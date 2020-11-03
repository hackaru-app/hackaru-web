import { shallowMount } from '@vue/test-utils';
import Dragger from '@/components/atoms/dragger';

describe('Dragger', () => {
  let wrapper;

  const factory = () => shallowMount(Dragger);
  const dragEvent = (x, y) => ({
    e: { preventDefault: () => {} },
    distance: { x, y },
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.drag-drop').vm.$emit('start', dragEvent());
    });

    it('emits start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.drag-drop').vm.$emit('start', dragEvent());
      wrapper.find('.drag-drop').vm.$emit('move', dragEvent(70, 80));
    });

    it('emits moving', () => {
      expect(wrapper.emitted('moving')).toBeTruthy();
    });

    it('emits update:left', () => {
      expect(wrapper.emitted('update:left')[0][0]).toBe(70);
    });

    it('emits update:top', () => {
      expect(wrapper.emitted('update:top')[0][0]).toBe(80);
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.drag-drop').vm.$emit('start', dragEvent());
      wrapper.find('.drag-drop').vm.$emit('move', dragEvent(70, 80));
      wrapper.find('.drag-drop').vm.$emit('end', dragEvent());
    });

    it('emits end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when drop but not moved', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.drag-drop').vm.$emit('start', dragEvent(0, 0));
      wrapper.find('.drag-drop').vm.$emit('end', dragEvent(0, 0));
    });

    it('emits cancel', () => {
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });
});
