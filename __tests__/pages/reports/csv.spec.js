import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Csv from '@/pages/reports/csv';
import { parseISO } from 'date-fns';

describe('Csv', () => {
  const $store = new Store();

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

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
      URL.createObjectURL = jest.fn(() => 'blob:');
      factory();
    });

    it('dispatch reports/fetchCsv', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetchCsv', {
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999')
      });
    });

    it('create object url', () => {
      expect(URL.createObjectURL).toHaveBeenCalledWith('example,example');
    });

    it('assign object url', () => {
      expect(location).toHaveBeenCalledWith('blob:');
    });
  });
});
