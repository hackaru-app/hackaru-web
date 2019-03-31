import Factory from '@/__tests__/__setups__/factory';
import CalendarRuler from '@/components/organisms/calendar-ruler';

describe('CalendarRuler', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(CalendarRuler, {
      provide: {
        pxPerMin: 40 / 60
      },
      propsData: {
        color: '#ff0'
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when has top', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ top: 50 });
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when showTime is true', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ top: 50, showTime: true });
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
