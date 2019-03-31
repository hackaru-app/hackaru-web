import Factory from '@/__tests__/__setups__/factory';
import BarChart from '@/components/atoms/bar-chart';

describe('BarChart', () => {
  let factory;

  beforeEach(() => {
    factory = new Factory(BarChart, {
      propsData: {
        chartData: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          datasets: [
            {
              label: 'Development',
              backgroundColor: '#ff0',
              data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            },
            {
              label: 'Review',
              backgroundColor: '#ff0',
              data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            }
          ]
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
    expect(wrapper.vm.options.tooltips.callbacks.label({ yLabel: 10 })).toBe(
      '00:10'
    );
  });
});
