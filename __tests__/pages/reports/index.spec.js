import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Reports from '@/pages/reports/index';
import { parseISO } from 'date-fns';
import { stringify } from 'query-string';

describe('Reports', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store();

  const factory = () =>
    shallowMount(Reports, {
      mocks: {
        $store
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when change period to day', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.setData({ currentPeriod: 'day' });
    });

    it('dispatch reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-31T00:00:00'),
          end: parseISO('2019-01-31T23:59:59.999')
        },
        previous: {
          start: parseISO('2019-01-30T00:00:00'),
          end: parseISO('2019-01-30T23:59:59.999')
        }
      });
    });

    it('has pdf link correctly', () => {
      const path = `/en/reports/pdf/?${stringify({
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999')
      })}`;
      expect(wrapper.find('.pdf-link').attributes().href).toEqual(path);
    });
  });

  describe('when change period to week', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
    });

    it('dispatch reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999')
        },
        previous: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999')
        }
      });
    });
  });

  describe('when change period to month', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'month' });
    });

    it('dispatch reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-01-31T23:59:59.999')
        },
        previous: {
          start: parseISO('2018-12-01T00:00:00'),
          end: parseISO('2018-12-31T23:59:59.999')
        }
      });
    });
  });

  describe('when change period to year', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'year' });
    });

    it('dispatch reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-12-31T23:59:59.999')
        },
        previous: {
          start: parseISO('2018-01-01T00:00:00'),
          end: parseISO('2018-12-31T23:59:59.999')
        }
      });
    });
  });

  describe('when slide left', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find('.loop-slider').vm.$emit('slide-left');
    });

    it('set prev weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999')
        },
        previous: {
          start: parseISO('2019-01-13T00:00:00'),
          end: parseISO('2019-01-19T23:59:59.999')
        }
      });
    });
  });

  describe('when slide right', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find('.loop-slider').vm.$emit('slide-right');
    });

    it('set next weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-02-03T00:00:00'),
          end: parseISO('2019-02-09T23:59:59.999')
        },
        previous: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999')
        }
      });
    });
  });

  describe('when click today-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find('.loop-slider').vm.$emit('slide-right');
      wrapper.find('.date-header').vm.$emit('today');
    });

    it('set today weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999')
        },
        previous: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999')
        }
      });
    });
  });
});
