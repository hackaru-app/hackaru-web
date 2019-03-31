import Factory from '@/__tests__/__setups__/factory';
import ReportContainer from '@/components/organisms/report-container';

describe('ReportContainer', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ReportContainer, {
      propsData: {
        doughnutChartData: {
          labels: ['Development', 'Review'],
          datasets: [{ data: [100, 50], backgroundColor: ['#ff0', '#f00'] }]
        },
        barChartData: {
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
        },
        summary: {
          1: 100,
          2: 50
        },
        projects: [
          {
            id: 1,
            name: 'Development',
            color: '#ff0'
          },
          {
            id: 2,
            name: 'Review',
            color: '#f00'
          }
        ]
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
