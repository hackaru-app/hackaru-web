import { shallowMount } from '@vue/test-utils';
import DeltaIcon from '@/components/molecules/delta-icon';

const testId = (id) => `[data-test-id="${id}"]`;

describe('DeltaIcon', () => {
  let wrapper;

  const factory = () =>
    shallowMount(DeltaIcon, {
      propsData: {
        current: 0,
        previous: 0,
      },
    });

  describe('when delta is up', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 200,
      });
    });

    it('has name is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('icon')).classes()).toContain('up');
    });
  });

  describe('when delta is down', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 400,
      });
    });

    it('has name is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('icon')).classes()).toContain('down');
    });
  });

  describe('when delta is even', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 300,
      });
    });

    it('has name is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'minus-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('icon')).classes()).toContain('even');
    });
  });
});
