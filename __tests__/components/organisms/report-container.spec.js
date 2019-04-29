import Factory from '@/__tests__/__setups__/factory';
import ReportContainer from '@/components/organisms/report-container';

describe('ReportContainer', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(ReportContainer, {
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
        start: new Date(),
        end: new Date(),
        summary: {
          1: 100,
          2: 0
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
    });
  });

  it('render correctly', () => {
    wrapper = factory.shallow();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('when press share button', () => {
    beforeEach(() => {
      window.navigator.share = jest.fn();
      wrapper = factory.shallow();
      wrapper.setData({ isSharedSupported: true });
      wrapper.vm.$forceUpdate();
      wrapper.find('.share-button').vm.$emit('click');
    });

    it('call share API', () => {
      expect(window.navigator.share).toHaveBeenCalled();
    });
  });
});
