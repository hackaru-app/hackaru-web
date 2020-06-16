import { shallowMount } from '@vue/test-utils';
import DatetimePicker from '@/components/molecules/datetime-picker';
import dayjs from 'dayjs';

describe('DatetimePicker', () => {
  let wrapper;

  const factory = () => shallowMount(DatetimePicker);

  describe('when input value is invalid', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.date').setValue('foo');
      wrapper.find('.time').setValue('bar');
    });

    it('emit input with undefined', () => {
      expect(wrapper.emitted('input')[0]).toEqual([undefined]);
      expect(wrapper.emitted('input')[1]).toEqual([undefined]);
    });
  });

  describe('when input date is valid', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ value: '2019-03-03T11:22:33' });
      wrapper.find('.date').setValue('2019-01-01');
    });

    it('emit input with datetime', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        dayjs('2019-01-01 11:22:33').format(),
      ]);
    });
  });

  describe('when input time is valid', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ value: '2019-03-03T11:22:33' });
      wrapper.find('.time').setValue('22:33:44');
    });

    it('emit input with datetime', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        dayjs('2019-03-03 22:33:44').format(),
      ]);
    });
  });
});
