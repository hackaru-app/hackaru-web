import Factory from '@/__tests__/__setups__/factory';
import CalendarDayHeader from '@/components/organisms/calendar-day-header';
import { parse } from 'date-fns';
import enLocale from 'date-fns/locale/en';

describe('CalendarDayHeader', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(CalendarDayHeader, {
      propsData: {
        day: parse('2019-01-01T00:00:00'),
        locale: enLocale
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('button').trigger('click');
    });

    it('emit click', () => {
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});
