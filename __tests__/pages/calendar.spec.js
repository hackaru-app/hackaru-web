import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Calendar from '@/pages/calendar';
import { parse } from 'date-fns';

describe('Calendar', () => {
  let wrapper;
  let factory;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({});

  beforeEach(() => {
    factory = new Factory(Calendar, {
      stubs: {
        'infinite-slider': {
          template: '<div><slot /></div>',
          methods: {
            slideLeft: jest.fn(),
            slideRight: jest.fn()
          }
        }
      },
      mocks: {
        $store
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('dispatch activities/getActivities', () => {
    factory.shallow();
    expect($store.dispatch).toHaveBeenCalledWith('activities/getActivities', {
      start: parse('2019-01-27T00:00:00'),
      end: parse('2019-02-02T23:59:59.999')
    });
  });

  describe('when period is daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 0 });
    });

    it('has days correctly', () => {
      expect(wrapper.vm.days).toEqual([parse('2019-01-31T00:00:00')]);
    });
  });

  describe('when period is weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
    });

    it('has days correctly', () => {
      expect(wrapper.vm.days).toEqual([
        parse('2019-01-27T00:00:00'),
        parse('2019-01-28T00:00:00'),
        parse('2019-01-29T00:00:00'),
        parse('2019-01-30T00:00:00'),
        parse('2019-01-31T00:00:00'),
        parse('2019-02-01T00:00:00'),
        parse('2019-02-02T00:00:00')
      ]);
    });
  });

  describe('when call togglePeriod', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
      wrapper.vm.togglePeriod(parse('2019-01-27T00:00:00'));
    });

    it('toggle period', () => {
      expect(wrapper.vm.index).toBe(0);
    });

    it('set date', () => {
      expect(wrapper.vm.date).toEqual(parse('2019-01-27T00:00:00'));
    });
  });

  describe('when slide left and period is daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 0 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous date', () => {
      expect(wrapper.vm.date).toEqual(parse('2019-01-30T00:00:00'));
    });
  });

  describe('when slide left and period is weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous week', () => {
      expect(wrapper.vm.date).toEqual(parse('2019-01-20T00:00:00'));
    });
  });

  describe('when slide right and period is daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 0 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next date', () => {
      expect(wrapper.vm.date).toEqual(parse('2019-02-01T00:00:00'));
    });
  });

  describe('when slide right and period is weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next week', () => {
      expect(wrapper.vm.date).toEqual(parse('2019-02-03T00:00:00'));
    });
  });

  describe('when click left button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'header' }).vm.$emit('left');
    });

    it('call slideLeft', () => {
      expect(
        factory.options.stubs['infinite-slider'].methods.slideLeft
      ).toHaveBeenCalled();
    });
  });

  describe('when click right button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'header' }).vm.$emit('right');
    });

    it('call slideRight', () => {
      expect(
        factory.options.stubs['infinite-slider'].methods.slideRight
      ).toHaveBeenCalled();
    });
  });
});
