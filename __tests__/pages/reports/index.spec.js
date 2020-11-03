import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Reports from '@/pages/reports/index';
import { parseISO, formatISO } from 'date-fns';
import { stringify } from 'query-string';

const testId = (id) => `[data-test-id="${id}"]`;

describe('Index', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'projects/all': [
        {
          id: 1,
          name: 'Review',
          color: '#ff0',
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(Reports, {
      mocks: {
        $store,
      },
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

    it('dispatches reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-31T00:00:00'),
          end: parseISO('2019-01-31T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2019-01-30T00:00:00'),
          end: parseISO('2019-01-30T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when click pdf button', () => {
    beforeEach(() => {
      wrapper = factory();
      window.open = jest.fn();
      wrapper.find(testId('pdf-button')).trigger('click');
    });

    it('open pdf url', () => {
      const query = stringify({
        start: formatISO(parseISO('2019-01-31T00:00:00')),
        end: formatISO(parseISO('2019-01-31T23:59:59.999')),
        projectIds: [],
      });
      expect(window.open).toHaveBeenLastCalledWith(`/en/reports/pdf/?${query}`);
    });
  });

  describe('when click csv button', () => {
    beforeEach(() => {
      wrapper = factory();
      window.open = jest.fn();
      wrapper.find(testId('csv-button')).trigger('click');
    });

    it('open csv url', () => {
      const query = stringify({
        start: formatISO(parseISO('2019-01-31T00:00:00')),
        end: formatISO(parseISO('2019-01-31T23:59:59.999')),
        projectIds: [],
      });
      expect(window.open).toHaveBeenLastCalledWith(`/en/reports/csv/?${query}`);
    });
  });

  describe('when change period to week', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
    });

    it('dispatches reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when change period to month', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'month' });
    });

    it('dispatches reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-01-31T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2018-12-01T00:00:00'),
          end: parseISO('2018-12-31T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when change period to year', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'year' });
    });

    it('dispatches reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-01T00:00:00'),
          end: parseISO('2019-12-31T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2018-01-01T00:00:00'),
          end: parseISO('2018-12-31T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when slide left', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find(testId('loop-slider')).vm.$emit('slide-left');
    });

    it('sets prev weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2019-01-13T00:00:00'),
          end: parseISO('2019-01-19T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when slide right', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find(testId('loop-slider')).vm.$emit('slide-right');
    });

    it('sets next weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-02-03T00:00:00'),
          end: parseISO('2019-02-09T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when click today-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ currentPeriod: 'week' });
      wrapper.find(testId('loop-slider')).vm.$emit('slide-right');
      wrapper.find(testId('date-header')).vm.$emit('today');
    });

    it('sets today weeks', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-27T00:00:00'),
          end: parseISO('2019-02-02T23:59:59.999'),
          projectIds: [],
        },
        previous: {
          start: parseISO('2019-01-20T00:00:00'),
          end: parseISO('2019-01-26T23:59:59.999'),
          projectIds: [],
        },
      });
    });
  });

  describe('when projectIds changed', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ projectIds: [1] });
    });

    it('dispatches reports/fetch', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
        current: {
          start: parseISO('2019-01-31T00:00:00'),
          end: parseISO('2019-01-31T23:59:59.999'),
          projectIds: [1],
        },
        previous: {
          start: parseISO('2019-01-30T00:00:00'),
          end: parseISO('2019-01-30T23:59:59.999'),
          projectIds: [1],
        },
      });
    });
  });
});
