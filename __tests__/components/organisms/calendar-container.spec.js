import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import CalendarContainer from '@/components/organisms/calendar-container';

describe('CalendarContainer', () => {
  let wrapper;
  let factory;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(CalendarContainer, {
      provide: {
        pxPerMin: 40 / 60
      },
      mocks: {
        $mezr: {
          intersection: jest
            .fn()
            .mockReturnValueOnce({ width: 10 })
            .mockReturnValueOnce({ width: 20 })
            .mockReturnValueOnce({ width: 30 })
            .mockReturnValueOnce({ width: 100 }) // most overlapped
            .mockReturnValueOnce({ width: 50 })
            .mockReturnValueOnce({ width: 60 })
            .mockReturnValueOnce({ width: 70 })
        }
      },
      propsData: {
        days: [
          '2019-01-01',
          '2019-01-02',
          '2019-01-03',
          '2019-01-04',
          '2019-01-05',
          '2019-01-06',
          '2019-01-07'
        ]
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('hide guide ruler', () => {
    expect(
      factory
        .shallow()
        .find('.guide-ruler')
        .exists()
    ).toBe(false);
  });

  describe('when does not have days', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ days: [] });
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when has today', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ days: ['2019-01-31'] });
    });

    it('show today ruler', () => {
      expect(wrapper.find('.today-ruler').exists()).toBe(true);
    });
  });

  describe('when does not have today', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ days: ['1999-01-01'] });
    });

    it('hide today ruler', () => {
      expect(wrapper.find('.today-ruler').exists()).toBe(false);
    });
  });

  describe('when call updateCurrentDate', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.updateCurrentDate();
    });

    it('set currentDate to today', () => {
      expect(wrapper.vm.currentDate).toEqual(new Date());
    });
  });

  describe('when call updateGuideLine', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.updateGuideLine(50, wrapper.element);
    });

    it('show guide ruler', () => {
      expect(wrapper.find('.guide-ruler').exists()).toBe(true);
    });

    it('set overlapped class', () => {
      expect(
        wrapper
          .findAll({ ref: 'days' })
          .at(3) // most overlapped
          .classes()
      ).toContain('overlapped');
    });
  });

  describe('when call updateGuideLine but has no overlapped day', () => {
    beforeEach(() => {
      factory.options.mocks.$mezr.intersection = () => undefined;
      wrapper = factory.shallow();
      wrapper.vm.updateGuideLine(50, wrapper.element);
    });

    it('unset overlapped class', () => {
      expect(wrapper.find('.overlapped').exists()).toBe(false);
    });
  });

  describe('when drag days', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'days' }).vm.$emit('ghost-drag');
    });

    it('emit ghost-drag', () => {
      expect(wrapper.emitted('ghost-drag')).toBeTruthy();
    });
  });

  describe('when dragging days', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'days' }).vm.$emit('ghost-dragging');
    });

    it('emit ghost-dragging', () => {
      expect(wrapper.emitted('ghost-dragging')).toBeTruthy();
    });
  });

  describe('when drop days', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'days' }).vm.$emit('ghost-drop');
    });

    it('emit ghost-drop', () => {
      expect(wrapper.emitted('ghost-drop')).toBeTruthy();
    });
  });
});
