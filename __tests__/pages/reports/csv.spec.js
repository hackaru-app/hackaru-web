import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Csv from '@/pages/reports/csv';
import { parseISO } from 'date-fns';
import fileSaver from 'file-saver';

describe('Csv', () => {
  const $store = new Store();

  const factory = () =>
    shallowMount(Csv, {
      mocks: {
        $store,
        $route: {
          query: {
            start: parseISO('2019-01-31T00:00:00'),
            end: parseISO('2019-01-31T23:59:59.999')
          }
        }
      }
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

    it('dispatch reports/fetchCsv', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetchCsv', {
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999')
      });
    });

    it('save csv', () => {
      expect(fileSaver.saveAs).toHaveBeenCalledWith(new Blob(), 'report.csv');
    });
  });
});
