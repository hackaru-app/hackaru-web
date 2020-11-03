import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import { parseISO } from 'date-fns';
import CalendarActivity from '@/components/organisms/calendar-activity';

const testId = (id) => `[data-test-id="${id}"]`;

describe('CalendarActivity', () => {
  let wrapper;

  const $store = new Store({});
  const $modal = { show: jest.fn() };

  const factory = () =>
    shallowMount(CalendarActivity, {
      mocks: {
        $store,
        $modal,
      },
      propsData: {
        id: 1,
        description: 'Create a database.',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: '2019-01-01T02:23:45',
        duration: 3600,
        day: '2019-01-01',
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  it('has top position correctly', () => {
    const top = 60 + 23; // 01:23
    wrapper = factory();
    expect(wrapper.find({ ref: 'dragger' }).props().top).toBe(top);
  });

  it('has height correctly', () => {
    wrapper = factory();
    expect(wrapper.find({ ref: 'dragger' }).attributes().style).toBe(
      'height: 60px;'
    );
  });

  describe('when added 20 min to startedAt', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ startedAt: '2019-01-01T01:43:00' });
    });

    it('update top', () => {
      const top = 60 + 43; // 01:43
      expect(wrapper.find({ ref: 'dragger' }).props().top).toBe(top);
    });
  });

  describe('when added 20 min to duration', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ duration: 4800 });
    });

    it('update height', () => {
      expect(wrapper.find({ ref: 'dragger' }).attributes().style).toBe(
        'height: 80px;'
      );
    });
  });

  describe('when drag start', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'dragger' }).vm.$emit('start');
    });

    it('disables resizer', () => {
      expect(wrapper.find(testId('resizer')).props().enabled).toBe(false);
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toEqual({
        el: wrapper.element,
        guideRulerTop: 60 + 23,
      });
    });
  });

  describe('when drag move', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'dragger' }).vm.$emit('moving');
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toEqual({
        el: wrapper.element,
        guideRulerTop: 60 + 23,
      });
    });
  });

  describe('when drag end', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ overlappedDay: '2019-01-02' });
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        startedAt: parseISO('2019-01-02T01:23:00'),
        stoppedAt: parseISO('2019-01-02T02:23:00'),
      });
    });
  });

  describe('when drag end but does not has overlapped-day', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ overlappedDay: undefined });
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when drag cancel', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'dragger' }).vm.$emit('cancel');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });
  });

  describe('when resizing', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('resizer')).vm.$emit('resizing');
    });

    it('disable dragger', () => {
      expect(wrapper.find({ ref: 'dragger' }).props().enabled).toBe(false);
    });

    it('emits dragging', () => {
      expect(wrapper.emitted('dragging')[0][0]).toEqual({
        el: wrapper.element,
        guideRulerTop: 60 + 23 + 60,
      });
    });
  });

  describe('when resize end', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('resizer')).vm.$emit('end');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: parseISO('2019-01-01T02:23:45'),
      });
    });
  });

  describe('when resize cancel', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('resizer')).vm.$emit('cancel');
    });

    it('emits drop', () => {
      expect(wrapper.emitted('drop')).toBeTruthy();
    });
  });

  describe('when mouseup', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('click-handler')).trigger('mousedown');
      wrapper.find(testId('click-handler')).trigger('mouseup');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('activity', {
        id: 1,
        description: 'Create a database.',
        duration: 3600,
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: '2019-01-01T02:23:45',
      });
    });
  });

  describe('when mouseup but dragged', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('click-handler')).trigger('mousedown');
      wrapper.find({ ref: 'dragger' }).vm.$emit('start');
      wrapper.find({ ref: 'dragger' }).vm.$emit('moving');
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
      wrapper.find(testId('click-handler')).trigger('mouseup');
    });

    it('does not show modal', () => {
      expect($modal.show).not.toHaveBeenCalled();
    });
  });

  describe('when mouseup but resized', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('click-handler')).trigger('mousedown');
      wrapper.find(testId('resizer')).vm.$emit('start');
      wrapper.find(testId('resizer')).vm.$emit('resizing');
      wrapper.find(testId('resizer')).vm.$emit('end');
      wrapper.find(testId('click-handler')).trigger('mouseup');
    });

    it('does not show modal', () => {
      expect($modal.show).not.toHaveBeenCalled();
    });
  });
});
