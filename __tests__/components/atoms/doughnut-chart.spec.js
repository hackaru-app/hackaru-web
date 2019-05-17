import { factory } from '@/__tests__/__setups__/factory';
import DoughnutChart from '@/components/atoms/doughnut-chart';

describe('DoughnutChart', () => {
  const shallow = factory(DoughnutChart, {
    propsData: {
      chartData: {
        labels: ['Review', 'Development'],
        datasets: [{ data: [50, 50], backgroundColor: ['#ff0', '#0ff'] }]
      }
    }
  });

  it('show tooltip label correctly', () => {
    const wrapper = shallow();
    const label = wrapper.vm.options.tooltips.callbacks.label;
    expect(label({ index: 0 }, { datasets: [{ data: [60] }] })).toBe('01:00');
  });
});
