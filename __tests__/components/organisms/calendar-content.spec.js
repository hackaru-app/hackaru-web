import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import CalendarContent from '@/components/organisms/calendar-content';
import { parseISO } from 'date-fns';

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

  it('hide guide ruler', () => {
    wrapper = factory();
    expect(wrapper.find('.guide-ruler').exists()).toBe(false);
  });

  describe('when has today', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ days: [parseISO('2019-01-31')] });
    });

    it('show today ruler', () => {
      expect(wrapper.find('.today-ruler').exists()).toBe(true);
    });
  });

  describe('when does not have today', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ days: [parseISO('1999-01-01')] });
    });

    it('hide today ruler', () => {
      expect(wrapper.find('.today-ruler').exists()).toBe(false);
    });
  });

  describe('when dragging event emitted', () => {
    beforeEach(() => {
      wrapper = factory();
      const day = wrapper.findAll('.day').at(0);
      day.vm.$emit('dragging', { el: 'dummy', guideRulerTop: 100 });
    });

    it('emit dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toBe('dummy');
    });

    it('set overlapped class', () => {
      expect(wrapper.findAll('.day').at(1).classes()).toContain('overlapped');
    });
  });

  describe('when drop event emitted', () => {
    beforeEach(() => {
      wrapper = factory();
      const day = wrapper.findAll('.day').at(0);
      day.vm.$emit('drop');
    });

    it('emit drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });
  });
});
