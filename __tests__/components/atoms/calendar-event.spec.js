import { shallow } from '@vue/test-utils';
import CalendarEvent from '@/components/atoms/calendar-event';

describe('CalendarEvent', () => {
  const factory = () =>
    shallow(CalendarEvent, {
      propsData: {
        color: '#ff0000',
        title: 'Development',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: '2019-01-01T01:23:45'
      }
    });

  describe('when startedAt is undefined', () => {
    const wrapper = factory();
    wrapper.setProps({ startedAt: undefined });

    it('has an empty duration', () => {
      expect(wrapper.find('.duration').text()).toBe('');
    });
  });

  describe('when stoppedAt is undefined', () => {
    const wrapper = factory();
    wrapper.setProps({ stoppedAt: undefined });

    it('has an empty duration', () => {
      expect(wrapper.find('.duration').text()).toBe('');
    });
  });
});
