import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Pdf from '@/pages/reports/pdf';
import { parseISO } from 'date-fns';

describe('Reports', () => {
  const $store = new Store();

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

  const factory = () =>
    shallowMount(Pdf, {
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
      $store.dispatch.mockReturnValue('%PDF-');
      URL.createObjectURL = jest.fn(() => 'blob:');
      factory();
    });

    it('dispatch reports/fetchPdf', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetchPdf', {
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999')
      });
    });

    it('create object url', () => {
      expect(URL.createObjectURL).toHaveBeenCalledWith('%PDF-');
    });

    it('assign object url', () => {
      expect(location).toHaveBeenCalledWith('blob:');
    });
  });
});
