import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Reports from '~/pages/reports/index';
import { parseISO, formatISO } from 'date-fns';
import { stringify } from 'query-string';
import testId from '~/__tests__/__helpers__/test-id';

describe('Index', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $mixpanel = { track: jest.fn() };
  const $cookies = { get: () => undefined, set: jest.fn() };
  const $store = new Store({
    getters: {
      'user/startDay': 0,
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
        $mixpanel,
        $cookies,
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Export report', {
        component: 'report',
        type: 'pdf',
      });
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Export report', {
        component: 'report',
        type: 'csv',
      });
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
      wrapper.find(testId('date-header')).vm.$emit('change-period', 'week');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Select period', {
        component: 'report',
        period: 'week',
      });
    });

    it('saves current period', () => {
      expect($cookies.set).toHaveBeenCalledWith('report_period', 'week', {
        maxAge: 630720000,
        path: '/',
        sameSite: 'Lax',
      });
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
      wrapper.find(testId('date-header')).vm.$emit('change-period', 'month');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Select period', {
        component: 'report',
        period: 'month',
      });
    });

    it('saves current period', () => {
      expect($cookies.set).toHaveBeenCalledWith('report_period', 'month', {
        maxAge: 630720000,
        path: '/',
        sameSite: 'Lax',
      });
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
      wrapper.find(testId('date-header')).vm.$emit('change-period', 'year');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Select period', {
        component: 'report',
        period: 'year',
      });
    });

    it('saves current period', () => {
      expect($cookies.set).toHaveBeenCalledWith('report_period', 'year', {
        maxAge: 630720000,
        path: '/',
        sameSite: 'Lax',
      });
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show prev report', {
        component: 'report',
      });
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show next report', {
        component: 'report',
      });
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show today report', {
        component: 'report',
      });
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

  describe('when cookie has previous period', () => {
    beforeEach(() => {
      $cookies.get = () => 'week';
      wrapper = factory();
      wrapper.vm.$options.activated[0].call(wrapper.vm);
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

  describe('when cookie has invalid period', () => {
    beforeEach(() => {
      $cookies.get = () => 'invalid';
      wrapper = factory();
      wrapper.vm.$options.activated[0].call(wrapper.vm);
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

  describe('when cookie does not have period', () => {
    beforeEach(() => {
      $cookies.get = () => undefined;
      wrapper = factory();
      wrapper.vm.$options.activated[0].call(wrapper.vm);
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

    describe('when startDay was changed', () => {
      beforeEach(() => {
        $store.getters['user/startDay'] = 3;
        wrapper = factory();
        wrapper.setData({ currentPeriod: 'week' });
      });

      it('dispatches reports/fetch', () => {
        expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetch', {
          current: {
            start: parseISO('2019-01-30T00:00:00'),
            end: parseISO('2019-02-05T23:59:59.999'),
            projectIds: [],
          },
          previous: {
            start: parseISO('2019-01-23T00:00:00'),
            end: parseISO('2019-01-29T23:59:59.999'),
            projectIds: [],
          },
        });
      });
    });
  });
});
