import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Reports from '@/pages/reports';
import { parse } from 'date-fns';

describe('Reports', () => {
  let factory;
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'reports/getChartData': () => {},
      'reports/getSummary': () => []
    }
  });

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Reports, {
      stubs: {
        'infinite-slider': {
          render: () => {},
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

  it('dispatch reports/getReports', () => {
    factory.shallow();
    expect($store.dispatch).toHaveBeenCalledWith('reports/getReports', {
      start: parse('2019-01-31T00:00:00'),
      end: parse('2019-01-31T23:59:59.999'),
      period: 'hour'
    });
  });

  describe('when date change to daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ date: '2018-02-01' });
    });

    it('dispatch reports/getReports', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/getReports', {
        start: parse('2018-02-01T00:00:00'),
        end: parse('2018-02-01T23:59:59.999'),
        period: 'hour'
      });
    });
  });

  describe('when period change to weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
    });

    it('dispatch reports/getReports', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/getReports', {
        start: parse('2019-01-27T00:00:00'),
        end: parse('2019-02-02T23:59:59.999'),
        period: 'day'
      });
    });
  });

  describe('when period change to monthly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 2 });
    });

    it('dispatch reports/getReports', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/getReports', {
        start: parse('2019-01-01T00:00:00'),
        end: parse('2019-01-31T23:59:59.999'),
        period: 'day'
      });
    });
  });

  describe('when period change to yearly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 3 });
    });

    it('dispatch reports/getReports', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/getReports', {
        start: parse('2019-01-01T00:00:00'),
        end: parse('2019-12-31T23:59:59.999'),
        period: 'month'
      });
    });
  });

  describe('when slide left and period is daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 0 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous date', () => {
      expect(wrapper.vm.date).toEqual('2019-01-30');
    });
  });

  describe('when slide left and period is weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous week', () => {
      expect(wrapper.vm.date).toEqual('2019-01-20');
    });
  });

  describe('when slide left and period is monthly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 2 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous month', () => {
      expect(wrapper.vm.date).toEqual('2018-12-01');
    });
  });

  describe('when slide left and period is yearly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 3 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-left');
    });

    it('set previous year', () => {
      expect(wrapper.vm.date).toEqual('2018-01-01');
    });
  });

  describe('when slide right and period is daily', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 0 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next date', () => {
      expect(wrapper.vm.date).toEqual('2019-02-01');
    });
  });

  describe('when slide right and period is weekly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 1 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next week', () => {
      expect(wrapper.vm.date).toEqual('2019-02-03');
    });
  });

  describe('when slide right and period is monthly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 2 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next month', () => {
      expect(wrapper.vm.date).toEqual('2019-02-01');
    });
  });

  describe('when slide right and period is yearly', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ index: 3 });
      wrapper.find({ ref: 'slider' }).vm.$emit('slide-right');
    });

    it('set next year', () => {
      expect(wrapper.vm.date).toEqual('2020-01-01');
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
