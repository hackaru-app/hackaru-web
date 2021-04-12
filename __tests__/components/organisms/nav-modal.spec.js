import { shallowMount } from '@vue/test-utils';
import NavModal from '~/components/organisms/nav-modal';
import testId from '~/__tests__/__helpers__/test-id';

describe('NavModal', () => {
  let wrapper;

  const initialComponent = {
    props: {
      params: {
        type: Object,
        default: undefined,
      },
    },
    render: (h) => h,
  };

  const nextComponent = {
    props: {
      params: {
        type: Object,
        default: undefined,
      },
    },
    render: (h) => h,
  };

  const $nuxt = { $on: () => {} };

  const factory = () =>
    shallowMount(NavModal, {
      mocks: {
        $nuxt,
      },
    });

  describe('when mounted', () => {
    beforeEach(() => {
      wrapper = factory();
    });

    it('does not set component', () => {
      expect(wrapper.find(testId('current')).exists()).toBe(false);
    });
  });

  describe('when emits show-modal', () => {
    beforeEach(async () => {
      wrapper = factory();
      wrapper.vm.show({ component: initialComponent });
    });

    it('sets component', () => {
      expect(wrapper.findComponent(initialComponent).exists()).toBe(true);
    });
  });

  describe('when push', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.vm.show({ component: initialComponent });
      wrapper.find(testId('current')).vm.$emit('push', {
        component: nextComponent,
        params: { foo: 'bar' },
      });
    });

    it('sets component', () => {
      expect(wrapper.findComponent(nextComponent).exists()).toBe(true);
    });

    it('sets params', () => {
      expect(wrapper.findComponent(nextComponent).props('params')).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('when pop and has prev component', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.vm.show({ component: initialComponent });
      const current = wrapper.find(testId('current'));
      current.vm.$emit('push', { component: nextComponent });
      current.vm.$emit('pop', { foo: 'bar' });
    });

    it('sets params', () => {
      expect(wrapper.findComponent(initialComponent).props('params')).toEqual({
        foo: 'bar',
      });
    });

    it('restores prev component', () => {
      expect(wrapper.findComponent(initialComponent).exists()).toBe(true);
    });
  });

  describe('when pop and does not have prev component', () => {
    const callback = jest.fn();

    beforeEach(async () => {
      wrapper = factory();
      await wrapper.vm.show({ component: initialComponent, callback });
      wrapper.find(testId('current')).vm.$emit('pop', { foo: 'bar' });
    });

    it('calls callback', () => {
      expect(callback).toHaveBeenCalledWith({ foo: 'bar' });
    });
  });
});
