import { shallowMount } from '@vue/test-utils';
import DatetimePicker from '@/components/molecules/datetime-picker';
import { formatISO, parseISO } from 'date-fns';
import testId from '@/__tests__/__helpers__/test-id';

describe('DatetimePicker', () => {
  let wrapper;

  const factory = () => shallowMount(DatetimePicker);

  describe('when input value is invalid', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('date')).setValue('foo');
      wrapper.find(testId('time')).setValue('bar');
    });

    it('emits input with undefined', () => {
      expect(wrapper.emitted('input')[0]).toEqual([undefined]);
      expect(wrapper.emitted('input')[1]).toEqual([undefined]);
    });
  });

  describe('when input date is valid', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.setProps({ value: '2019-03-03T11:22:33' });
      wrapper.find(testId('date')).setValue('2019-01-01');
    });

    it('emits input with datetime', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        formatISO(parseISO('2019-01-01T11:22:33')),
      ]);
    });
  });

  describe('when input time is valid', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.setProps({ value: '2019-03-03T11:22:33' });
      wrapper.find(testId('time')).setValue('22:33:44');
    });

    it('emits input with datetime', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        formatISO(parseISO('2019-03-03T22:33:44')),
      ]);
    });
  });
});
