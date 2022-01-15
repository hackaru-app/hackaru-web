import { shallowMount } from '@vue/test-utils';
import Delta from '~/components/molecules/delta';
import testId from '~/__tests__/__helpers__/test-id';

describe('Delta', () => {
  let wrapper;

  const factory = () =>
    shallowMount(Delta, {
      propsData: {
        current: 0,
        previous: 0,
      },
    });

  describe('when a duration is less than a minute', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 59,
        previous: 0,
      });
    });

    it('shows a duration in seconds', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+59s');
    });
  });

  describe('when a duration is less than an hour', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 3599,
        previous: 0,
      });
    });

    it('shows a duration in minutes', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+60min');
    });
  });

  describe('when a duration is greater than an hour', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 3600,
        previous: 0,
      });
    });

    it('shows a duration in hours', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+1h');
    });
  });

  describe('when a duration is greater than a day', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 86400,
        previous: 0,
      });
    });

    it('shows a duration in hours', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+24h');
    });
  });

  describe('when a duration is indivisible', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 5400,
        previous: 0,
      });
    });

    it('shows a rounded duration', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+1.5h');
    });
  });

  describe('when a duration is positive', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 20,
        previous: 10,
      });
    });

    it('has a duration is correctly', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+10s');
    });

    it('has an icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has a class is correctly', () => {
      expect(wrapper.find(testId('delta')).classes()).toContain('up');
    });
  });

  describe('when a duration is negative', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 10,
        previous: 20,
      });
    });

    it('has a duration is correctly', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('-10s');
    });

    it('has an icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has a class is correctly', () => {
      expect(wrapper.find(testId('delta')).classes()).toContain('down');
    });
  });

  describe('when a duration is zero', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 10,
        previous: 10,
      });
    });

    it('has a duration is correctly', () => {
      expect(wrapper.find(testId('duration')).text()).toEqual('+0s');
    });

    it('has an icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'minus-icon'
      );
    });

    it('has a class is correctly', () => {
      expect(wrapper.find(testId('delta')).classes()).toContain('even');
    });
  });

  describe('when a current and a previous are zero', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 0,
        previous: 0,
      });
    });

    it('has an icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'minus-icon'
      );
    });

    it('hides a duration', () => {
      expect(wrapper.find(testId('duration')).exists()).toEqual(false);
    });
  });
});
