import MockDate from 'mockdate';
import Factory from '@/__tests__/__setups__/factory';
import DateHeader, { periods } from '@/components/organisms/date-header';
import { parse } from 'date-fns';

describe('DateHeader', () => {
  let factory;
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    factory = new Factory(DateHeader, {
      stubs: ['v-date-picker', 'no-ssr'],
      propsData: {
        date: '2018-01-01',
        periods: [periods.day, periods.week, periods.month, periods.year]
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when does not has today', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ periodIndex: 0 });
    });

    it('show today button', () => {
      expect(wrapper.contains('.today-button')).toBe(true);
    });
  });

  describe('when has today', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ periodIndex: 0, date: new Date() });
    });

    it('hide today button', () => {
      expect(wrapper.contains('.today-button')).toBe(false);
    });
  });

  describe('when click left arrow button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.left-arrow-button').vm.$emit('click');
    });

    it('emit left', () => {
      expect(wrapper.emitted('left')).toBeTruthy();
    });
  });

  describe('when click right arrow button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.right-arrow-button').vm.$emit('click');
    });

    it('emit right', () => {
      expect(wrapper.emitted('right')).toBeTruthy();
    });
  });

  describe('when click today button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'today-button' }).vm.$emit('click');
    });

    it('emit update:date with today date', () => {
      expect(wrapper.emitted('update:date')[0]).toEqual([parse(Date.now())]);
    });
  });

  describe('when change selected period', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'period-select' }).vm.$emit('input', '1');
    });

    it('emit update:periodIndex', () => {
      expect(wrapper.emitted('update:periodIndex')[0]).toEqual([1]);
    });
  });
});
