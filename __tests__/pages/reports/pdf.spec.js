import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Pdf from '@/pages/reports/pdf';
import { parseISO } from 'date-fns';
import fileSaver from 'file-saver';

describe('Pdf', () => {
  const $ga = { event: jest.fn() };
  const $store = new Store();

  const factory = () =>
    shallowMount(Pdf, {
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
      $store.dispatch.mockReturnValue('%PDF-');
      fileSaver.saveAs = jest.fn();
      factory();
    });

    it('dispatches reports/fetchPdf', () => {
      expect($store.dispatch).toHaveBeenLastCalledWith('reports/fetchPdf', {
        start: parseISO('2019-01-31T00:00:00'),
        end: parseISO('2019-01-31T23:59:59.999'),
      });
    });

    it('saves pdf', () => {
      expect(fileSaver.saveAs).toHaveBeenCalledWith(new Blob(), 'report.pdf');
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'PdfReports',
        eventAction: 'export',
      });
    });
  });
});
