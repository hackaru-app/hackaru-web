import Factory from '@/__tests__/__setups__/factory';
import Icon from '@/components/atoms/icon';

describe('Icon', () => {
  it('render correctly', () => {
    const wrapper = new Factory(Icon, {
      stubs: ['activity-icon'],
      propsData: {
        name: 'activity-icon'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
