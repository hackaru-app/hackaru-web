import { shallowMount } from '@vue/test-utils';
import CalendarRuler from '~/components/organisms/calendar-ruler';

describe('CalendarRuler', () => {
  let wrapper;

  const factory = () =>
    shallowMount(CalendarRuler, {
      propsData: {
        top: 90,
        color: '#ff0',
      },
    });

  describe('when showTime is true', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ showTime: true });
    });

    it('shows time correcly', () => {
      expect(wrapper.find('time').text()).toBe('01:30');
    });
  });

  describe('when showTime is false', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ showTime: false });
    });

    it('hides time', () => {
      expect(wrapper.find('time').exists()).toBe(false);
    });
  });
});
