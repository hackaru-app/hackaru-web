import { shallowMount } from '@vue/test-utils';
import NavModal from '@/components/organisms/nav-modal';

const testId = (id) => `[data-test-id="${id}"]`;

describe('NavModal', () => {
  let wrapper;

  const initialComponent = { render: () => '<p>Content</p>' };
  const nextComponent = { render: () => '<p>Moved</p>' };

  const factory = () =>
    shallowMount(NavModal, {
      propsData: {
        name: 'example',
        initialComponent,
        keepAlives: [],
      },
    });

  describe('when emit before-open', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .find({ ref: 'base-modal' })
        .vm.$emit('before-open', { params: { foo: 'bar' } });
    });

    it('sets current component', () => {
      expect(wrapper.find(testId('current')).is(initialComponent)).toBe(true);
    });

    it('reset animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: '',
        leave: '',
      });
    });

    it('sets params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('when emit before-open with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'base-modal' }).vm.$emit('before-open', {});
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });

  describe('when emit push', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find(testId('current')).vm.$emit('push', {
        component: nextComponent,
        params: { foo: 'bar' },
      });
    });

    it('sets current component', () => {
      expect(wrapper.find(testId('current')).is(nextComponent)).toBe(true);
    });

    it('sets animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInRight',
        leave: 'fadeOutLeft',
      });
    });

    it('sets params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('when emit push with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper.find(testId('current')).vm.$emit('push', {
        component: nextComponent,
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
      wrapper
        .find(testId('current'))
        .vm.$emit('push', { component: nextComponent });
      wrapper.find(testId('current')).vm.$emit('pop', { foo: 'bar' });
    });

    it('move to previous component', () => {
      expect(wrapper.find(testId('current')).is(initialComponent)).toBe(true);
    });

    it('sets animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInLeft',
        leave: 'fadeOutRight',
      });
    });

    it('sets params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('when emit pop with empty params', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ current: initialComponent });
      wrapper
        .find(testId('current'))
        .vm.$emit('push', { component: nextComponent });
      wrapper.find(testId('current')).vm.$emit('pop');
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });
});
