import { shallowMount } from '@vue/test-utils';
import NavModal from '@/components/organisms/nav-modal';

describe('NavModal', () => {
  let wrapper;

  const initialComponent = { render: () => '<p>Content</p>' };
  const nextComponent = { render: () => '<p>Moved</p>' };

  const factory = () =>
    shallowMount(NavModal, {
      propsData: {
        name: 'example',
        initialComponent,
        keepAlives: []
      }
    });

  describe('when emit before-open', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .find('.base-modal')
        .vm.$emit('before-open', { params: { foo: 'bar' } });
    });

    it('set current component', () => {
      expect(wrapper.find('.current').is(initialComponent)).toBe(true);
    });

    it('reset animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: '',
        leave: ''
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit before-open with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.base-modal').vm.$emit('before-open', {});
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });

  describe('when emit push', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find('.current').vm.$emit('push', {
        component: nextComponent,
        params: { foo: 'bar' }
      });
    });

    it('set current component', () => {
      expect(wrapper.find('.current').is(nextComponent)).toBe(true);
    });

    it('set animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInRight',
        leave: 'fadeOutLeft'
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit push with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find('.current').vm.$emit('push', {
        component: nextComponent
      });
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });

  describe('when emit pop', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find('.current').vm.$emit('pop', {
        component: nextComponent,
        params: { foo: 'bar' }
      });
    });

    it('set current component', () => {
      expect(wrapper.find('.current').is(nextComponent)).toBe(true);
    });

    it('set animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInLeft',
        leave: 'fadeOutRight'
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit pop with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find('.current').vm.$emit('pop', {
        component: nextComponent
      });
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });
});
