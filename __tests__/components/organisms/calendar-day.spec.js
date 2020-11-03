import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import { parseISO } from 'date-fns';
import CalendarDay from '@/components/organisms/calendar-day';

describe('CalendarDay', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'activities/getCalendar': () => [
        [
          {
            id: 1,
            description: '',
            startedAt: '2019-01-01T01:30:00',
            stoppedAt: '2019-01-01T02:30:00',
            duration: 3600,
            project: null,
          },
        ],
        [
          {
            id: 2,
            description: 'Create a test.',
            startedAt: '2019-01-01T01:00:00',
            stoppedAt: '2019-01-01T02:00:00',
            duration: 3600,
            project: {
              id: 2,
              name: 'Development',
              color: '#ff0',
            },
          },
        ],
      ],
    },
  });

  const factory = () =>
    shallowMount(CalendarDay, {
      mocks: {
        $store,
        $mezr: {
          offset: () => ({
            top: 50,
          }),
        },
      },
      propsData: {
        day: '2019-01-01',
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when drag ghost-activity', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ ghostHeight: 20 });
      wrapper
        .find({ ref: 'resizer' })
        .vm.$emit('start', { preventDefault: () => {}, pageY: 100 });
    });

    it('show ghost-activity', () => {
      expect(wrapper.find('.ghost-activity').isVisible()).toBe(true);
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toEqual({
        el: wrapper.element,
        guideRulerTop: 100 - 50 + 20,
      });
    });
  });

  describe('when dragging ghost-activity', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ ghostTop: 50, ghostHeight: 20 });
      wrapper.find({ ref: 'resizer' }).vm.$emit('resizing');
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toEqual({
        el: wrapper.element,
        guideRulerTop: 50 + 20,
      });
    });
  });

  describe('when drop ghost-activity', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ ghostTop: 60, ghostHeight: 20 });
      wrapper.find({ ref: 'resizer' }).vm.$emit('end');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });

    it('hide ghost-activity', () => {
      expect(wrapper.find('.ghost-activity').isVisible()).toBe(false);
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        startedAt: parseISO('2019-01-01T01:00:00'),
        stoppedAt: parseISO('2019-01-01T01:20:00'),
      });
    });
  });

  describe('when cancel ghost-activity', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ ghostTop: 60, ghostHeight: 20 });
      wrapper.find({ ref: 'resizer' }).vm.$emit('cancel');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });

    it('hide ghost-activity', () => {
      expect(wrapper.find('.ghost-activity').isVisible()).toBe(false);
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        startedAt: parseISO('2019-01-01T01:00:00'),
        stoppedAt: parseISO('2019-01-01T01:20:00'),
      });
    });
  });
});
