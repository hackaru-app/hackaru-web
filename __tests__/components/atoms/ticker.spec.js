import MockDate from 'mockdate';
import Factory from '@/__tests__/__setups__/factory';
import { addDays } from 'date-fns';
import Ticker from '@/components/atoms/ticker';

describe('Ticker', () => {
  let wrapper;
  let factory;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    factory = new Factory(Ticker, {
      mocks: {
        $timer: { stop: jest.fn() }
      },
      propsData: {
        startedAt: `${new Date()}`
      }
    });
  });

  it('render correctly', () => {
    wrapper = factory.shallow();
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('time').text()).toBe('00:00:00');
  });

  describe('when set startedAt', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ startedAt: `${addDays(new Date(), -1)}` });
      wrapper.vm.updateDuration();
    });

    it('render duration', () => {
      expect(wrapper.find('time').text()).toBe('24:00:00');
    });
  });

  describe('when set stoppedAt', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ stoppedAt: `${addDays(new Date(), 2)}` });
      wrapper.vm.updateDuration();
    });

    it('render duration', () => {
      expect(wrapper.find('time').text()).toBe('48:00:00');
    });

    it('stop timer', () => {
      expect(factory.options.mocks.$timer.stop).toHaveBeenCalledWith(
        'updateDuration'
      );
    });
  });
});
