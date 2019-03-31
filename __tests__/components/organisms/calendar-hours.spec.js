import Factory from '@/__tests__/__setups__/factory';
import CalendarHours from '@/components/organisms/calendar-hours';

describe('CalendarHours', () => {
  it('render correctly', () => {
    const wrapper = new Factory(CalendarHours, {
      provide: {
        pxPerMin: 40 / 60
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
