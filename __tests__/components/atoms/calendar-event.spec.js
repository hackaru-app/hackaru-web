import { factory } from '@/__tests__/__setups__/factory';
import CalendarEvent from '@/components/atoms/calendar-event';

describe('CalendarEvent', () => {
  const shallow = factory(CalendarEvent, {
    propsData: {
      color: '#ff0000',
      title: 'Development',
      startedAt: '2019-01-01T01:23:45',
      stoppedAt: '2019-01-01T01:23:45'
    }
  });

  describe('when startedAt is undefined', () => {
    it('has an empty duration', () => {
      const wrapper = shallow();
      wrapper.setProps({ startedAt: undefined });
      expect(wrapper.find('.duration').text()).toBe('');
    });
  });

  describe('when stoppedAt is undefined', () => {
    it('has an empty duration', () => {
      const wrapper = shallow();
      wrapper.setProps({ stoppedAt: undefined });
      expect(wrapper.find('.duration').text()).toBe('');
    });
  });
});
