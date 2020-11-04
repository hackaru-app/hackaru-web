import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import CalendarContent from '@/components/organisms/calendar-content';
import { parseISO } from 'date-fns';
import testId from '@/__tests__/__helpers__/test-id';

describe('CalendarContent', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({});
  const factory = () =>
    shallowMount(CalendarContent, {
      mocks: {
        $mezr: {
          intersection: jest
            .fn()
            .mockReturnValueOnce({ width: 10 })
            .mockReturnValueOnce({ width: 50 }) // most overlapped
            .mockReturnValueOnce({ width: 20 }),
        },
      },
      propsData: {
        days: [
          parseISO('2019-01-01'),
          parseISO('2019-01-02'),
          parseISO('2019-01-03'),
        ],
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  it('hidess guide ruler', () => {
    wrapper = factory();
    expect(wrapper.find(testId('guide-ruler')).exists()).toBe(false);
  });

  describe('when has today', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ days: [parseISO('2019-01-31')] });
    });

    it('shows today ruler', () => {
      expect(wrapper.find(testId('today-ruler')).exists()).toBe(true);
    });
  });

  describe('when does not have today', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ days: [parseISO('1999-01-01')] });
    });

    it('hides today ruler', () => {
      expect(wrapper.find(testId('today-ruler')).exists()).toBe(false);
    });
  });

  describe('when dragging event emitted', () => {
    beforeEach(() => {
      wrapper = factory();
      const day = wrapper.findAll(testId('day')).at(0);
      day.vm.$emit('dragging', { el: 'dummy', guideRulerTop: 100 });
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toBe('dummy');
    });

    it('sets overlapped class', () => {
      expect(wrapper.findAll(testId('day')).at(1).classes()).toContain(
        'overlapped'
      );
    });
  });

  describe('when drop event emitted', () => {
    beforeEach(() => {
      wrapper = factory();
      const day = wrapper.findAll(testId('day')).at(0);
      day.vm.$emit('drop');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });
  });
});
