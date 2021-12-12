import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Calendar from '~/pages/calendar';
import { parseISO } from 'date-fns';
import testId from '~/__tests__/__helpers__/test-id';

describe('Calendar', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'user/startDay': 0,
    },
  });

  const $mixpanel = { track: jest.fn() };
  const factory = () =>
    shallowMount(Calendar, {
      mocks: {
        $store,
        $mixpanel,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when change date', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ date: parseISO('2019-03-01T01:23:45') });
    });

    it('dispatches activities/fetchByRange', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/fetchByRange', {
        start: parseISO('2019-02-24T00:00:00'),
        end: parseISO('2019-03-02T23:59:59.999'),
      });
    });
  });

  describe('when mounted', () => {
    beforeEach(() => {
      wrapper = factory();
    });

    it('sets days correctly', () => {
      expect(wrapper.vm.days).toEqual([
        parseISO('2019-01-27T00:00:00'),
        parseISO('2019-01-28T00:00:00'),
        parseISO('2019-01-29T00:00:00'),
        parseISO('2019-01-30T00:00:00'),
        parseISO('2019-01-31T00:00:00'),
        parseISO('2019-02-01T00:00:00'),
        parseISO('2019-02-02T00:00:00'),
      ]);
    });
  });

  describe('when slide left', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('loop-slider')).vm.$emit('slide-left');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show prev calendar', {
        component: 'calendar',
      });
    });

    it('dispatches activities/fetchByRange', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/fetchByRange', {
        start: parseISO('2019-01-20T00:00:00'),
        end: parseISO('2019-01-26T23:59:59.999'),
      });
    });

    it('sets prev weeks', () => {
      expect(wrapper.vm.days).toEqual([
        parseISO('2019-01-20T00:00:00'),
        parseISO('2019-01-21T00:00:00'),
        parseISO('2019-01-22T00:00:00'),
        parseISO('2019-01-23T00:00:00'),
        parseISO('2019-01-24T00:00:00'),
        parseISO('2019-01-25T00:00:00'),
        parseISO('2019-01-26T00:00:00'),
      ]);
    });
  });

  describe('when slide right', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('loop-slider')).vm.$emit('slide-right');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show next calendar', {
        component: 'calendar',
      });
    });

    it('dispatches activities/fetchByRange', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/fetchByRange', {
        start: parseISO('2019-02-03T00:00:00'),
        end: parseISO('2019-02-09T23:59:59.999'),
      });
    });

    it('sets next weeks', () => {
      expect(wrapper.vm.days).toEqual([
        parseISO('2019-02-03T00:00:00'),
        parseISO('2019-02-04T00:00:00'),
        parseISO('2019-02-05T00:00:00'),
        parseISO('2019-02-06T00:00:00'),
        parseISO('2019-02-07T00:00:00'),
        parseISO('2019-02-08T00:00:00'),
        parseISO('2019-02-09T00:00:00'),
      ]);
    });
  });

  describe('when click today-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('loop-slider')).vm.$emit('slide-right');
      wrapper.find(testId('date-header')).vm.$emit('today');
    });

    it('dispatches activities/fetchByRange', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/fetchByRange', {
        start: parseISO('2019-01-27T00:00:00'),
        end: parseISO('2019-02-02T23:59:59.999'),
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show today calendar', {
        component: 'calendar',
      });
    });

    it('sets today weeks', () => {
      expect(wrapper.vm.days).toEqual([
        parseISO('2019-01-27T00:00:00'),
        parseISO('2019-01-28T00:00:00'),
        parseISO('2019-01-29T00:00:00'),
        parseISO('2019-01-30T00:00:00'),
        parseISO('2019-01-31T00:00:00'),
        parseISO('2019-02-01T00:00:00'),
        parseISO('2019-02-02T00:00:00'),
      ]);
    });
  });

  describe('when startDay was changed', () => {
    beforeEach(() => {
      $store.getters['user/startDay'] = 3;
      wrapper = factory();
    });

    it('dispatches activities/fetchByRange', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/fetchByRange', {
        start: parseISO('2019-01-30T00:00:00'),
        end: parseISO('2019-02-05T23:59:59.999'),
      });
    });

    it('sets days correctly', () => {
      expect(wrapper.vm.days).toEqual([
        parseISO('2019-01-30T00:00:00'),
        parseISO('2019-01-31T00:00:00'),
        parseISO('2019-02-01T00:00:00'),
        parseISO('2019-02-02T00:00:00'),
        parseISO('2019-02-03T00:00:00'),
        parseISO('2019-02-04T00:00:00'),
        parseISO('2019-02-05T00:00:00'),
      ]);
    });
  });
});
