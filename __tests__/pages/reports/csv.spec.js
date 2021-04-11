import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Csv from '~/pages/reports/csv';
import { parseISO } from 'date-fns';
import fileSaver from 'file-saver';

describe('Csv', () => {
  const $ga = { event: jest.fn() };
  const $store = new Store();

  const factory = () =>
    shallowMount(Csv, {
      mocks: {
        $ga,
        $store,
        $route: {
          query: {
            start: parseISO('2019-01-31T00:00:00'),
            end: parseISO('2019-01-31T23:59:59.999'),
          },
        },
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when mounted', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('example,example');
      fileSaver.saveAs = jest.fn();
      factory();
    });

    it('dispatches reports/fetchCsv', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetchCsv', {
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999'),
      });
    });

    it('saves csv', () => {
      expect(fileSaver.saveAs).toHaveBeenCalledWith(new Blob(), 'report.csv');
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'CsvReports',
        eventAction: 'export',
      });
    });
  });
});
