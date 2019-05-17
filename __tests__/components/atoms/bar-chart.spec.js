import { factory } from '@/__tests__/__setups__/factory';
import BarChart from '@/components/atoms/bar-chart';

describe('BarChart', () => {
  const shallow = factory(BarChart, {
    propsData: {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Development',
            backgroundColor: '#ff0',
            data: [10, 10, 10]
          },
          {
            label: 'Review',
            backgroundColor: '#ff0',
            data: [10, 10, 10]
          }
        ]
      }
    }
  });

  it('show tooltip label correctly', () => {
    const wrapper = shallow();
    const label = wrapper.vm.options.tooltips.callbacks.label;
    expect(label({ yLabel: 10 })).toBe('00:10');
  });
});
