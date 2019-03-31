import Factory from '@/__tests__/__setups__/factory';
import ProjectName from '@/components/molecules/project-name';

describe('ProjectName', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ProjectName, {
      propsData: {
        name: 'Development',
        color: '#ff0'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
