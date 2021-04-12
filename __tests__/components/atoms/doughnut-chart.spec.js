import { shallowMount } from '@vue/test-utils';
import DoughnutChart from '~/components/atoms/doughnut-chart';

describe('DoughnutChart', () => {
  const factory = () =>
    shallowMount(DoughnutChart, {
      propsData: {
        chartData: {
          labels: ['Review', 'Development'],
          datasets: [{ data: [50, 50], backgroundColor: ['#ff0', '#0ff'] }],
        },
      },
    });

  it('shows tooltip label correctly', () => {
    const wrapper = factory();
    const label = wrapper.vm.options.tooltips.callbacks.label;
    expect(label({ index: 0 }, { datasets: [{ data: [60] }] })).toBe('01:00');
  });
});
