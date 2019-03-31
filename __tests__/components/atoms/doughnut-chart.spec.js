import Factory from '@/__tests__/__setups__/factory';
import DoughnutChart from '@/components/atoms/doughnut-chart';

describe('DoughnutChart', () => {
  let factory;

  beforeEach(() => {
    factory = new Factory(DoughnutChart, {
      propsData: {
        chartData: {
          labels: ['Review', 'Development'],
          datasets: [{ data: [100, 50], backgroundColor: ['#ff0', '#f00'] }]
        }
      }
    });
  });

  it('render correctly', () => {
    const wrapper = factory.shallow();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('show tooltip text correctly', () => {
    const wrapper = factory.shallow();
    expect(
      wrapper.vm.options.tooltips.callbacks.label(
        { index: 0 },
        { datasets: [{ data: [100] }] }
      )
    ).toBe('01:40');
  });
});
