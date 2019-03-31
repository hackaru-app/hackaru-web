import MockDate from 'mockdate';
import Factory from '@/__tests__/__setups__/factory';
import { parse } from 'date-fns';
import DatetimePicker from '@/components/molecules/datetime-picker';

describe('DatetimePicker', () => {
  let factory;
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    factory = new Factory(DatetimePicker);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when focus date', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('input[type=date]').trigger('focus');
    });

    it('emit input with current date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([`${new Date()}`]);
    });
  });

  describe('when focus date and date already input', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ value: `${parse('2018-03-03T01:23:45')}` });
      wrapper.find('input[type=date]').trigger('focus');
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        `${parse('2018-03-03T01:23:45')}`
      ]);
    });
  });

  describe('when focus time', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('input[type=time]').trigger('focus');
    });

    it('emit input with current date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([`${new Date()}`]);
    });
  });

  describe('when focus time but time already input', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ value: `${parse('2018-03-03T01:23:45')}` });
      wrapper.find('input[type=time]').trigger('focus');
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        `${parse('2018-03-03T01:23:45')}`
      ]);
    });
  });

  describe('when input value is invalid', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('input[type=date]').setValue('yay!');
      wrapper.find('input[type=time]').setValue('yay!');
    });

    it('emit input with undefined', () => {
      expect(wrapper.emitted('input')[0]).toEqual([undefined]);
      expect(wrapper.emitted('input')[1]).toEqual([undefined]);
    });
  });
});
