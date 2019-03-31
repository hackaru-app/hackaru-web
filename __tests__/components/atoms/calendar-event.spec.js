import { addDays } from 'date-fns';
import Factory from '@/__tests__/__setups__/factory';
import CalendarEvent from '@/components/atoms/calendar-event';

describe('CalendarEvent', () => {
  it('render correctly', () => {
    const wrapper = new Factory(CalendarEvent, {
      propsData: {
        color: '#ff0000',
        title: 'Review',
        startedAt: `${new Date()}`,
        stoppedAt: `${addDays(new Date(), 1)}`
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
