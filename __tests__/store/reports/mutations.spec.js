import { mutations } from '@/store/reports';
import { parseISO } from 'date-fns';

describe('Mutations', () => {
  describe('when commit SET_REPORTS', () => {
    const state = {
      projects: [],
      totals: {},
      labels: [],
      sums: {},
      start: undefined,
      end: undefined
    };

    beforeEach(() => {
      mutations['SET_REPORTS'](state, {
        start: parseISO('2019-01-01'),
        end: parseISO('2019-01-03'),
        projects: [
          {
            id: 1,
            name: 'Review',
            color: '#f95959'
          }
        ],
        totals: {
          1: 100
        },
        labels: ['Jan', 'Feb'],
        sums: {
          1: [100, 200]
        }
      });
    });

    it('set projects', () => {
      expect(state.projects).toEqual([
        {
          id: 1,
          name: 'Review',
          color: '#f95959'
        }
      ]);
    });

    it('set labels', () => {
      expect(state.labels).toEqual(['Jan', 'Feb']);
    });

    it('set start', () => {
      expect(state.start).toEqual(parseISO('2019-01-01'));
    });

    it('set end', () => {
      expect(state.end).toEqual(parseISO('2019-01-03'));
    });

    it('set sums', () => {
      expect(state.sums).toEqual({
        1: [100, 200]
      });
    });
  });
});
