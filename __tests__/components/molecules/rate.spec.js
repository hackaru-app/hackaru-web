import { shallowMount } from '@vue/test-utils';
import Rate from '~/components/molecules/rate';
import testId from '~/__tests__/__helpers__/test-id';

describe('Rate', () => {
  let wrapper;

  const factory = () =>
    shallowMount(Rate, {
      propsData: {
        current: 0,
        previous: 0,
      },
    });

  describe('when rate is increasing', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 200,
      });
    });

    it('has percent is correctly', () => {
      expect(wrapper.find(testId('percent')).text()).toEqual('+50%');
    });

    it('has icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('rate')).classes()).toContain('up');
    });
  });

  describe('when rate is decreasing', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 400,
      });
    });

    it('has percent is correctly', () => {
      expect(wrapper.find(testId('percent')).text()).toEqual('-25%');
    });

    it('has icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'arrow-up-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('rate')).classes()).toContain('down');
    });
  });

  describe('when rate is no change', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 300,
        previous: 300,
      });
    });

    it('has percent is correctly', () => {
      expect(wrapper.find(testId('percent')).text()).toEqual('0%');
    });

    it('has icon is correctly', () => {
      expect(wrapper.find(testId('icon')).attributes().name).toContain(
        'minus-icon'
      );
    });

    it('has class is correctly', () => {
      expect(wrapper.find(testId('rate')).classes()).toContain('even');
    });
  });

  describe('when rate is indivisible', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 1,
        previous: 3,
      });
    });

    it('has rounded percent', () => {
      expect(wrapper.find(testId('percent')).text()).toEqual('-66.7%');
    });
  });

  describe('when rate is over 1000', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        current: 10000000,
        previous: 1,
      });
    });

    it('adds commas to a percent', () => {
      expect(wrapper.find(testId('percent')).text()).toEqual('+999,999,900%');
    });
  });
});
