import { shallowMount } from '@vue/test-utils';
import BarChart from '@/components/atoms/bar-chart';

describe('BarChart', () => {
  const factory = () =>
    shallowMount(BarChart, {
      propsData: {
        isDark: false,
        chartData: {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [
            {
              label: 'Development',
              backgroundColor: '#ff0',
              data: [10, 10, 10],
            },
            {
              label: 'Review',
              backgroundColor: '#ff0',
              data: [10, 10, 10],
            },
          ],
        },
      },
    });

  it('show tooltip label correctly', () => {
    const wrapper = factory();
    const label = wrapper.vm.options.tooltips.callbacks.label;
    expect(label({ yLabel: 10 })).toBe('00:10');
  });
});
