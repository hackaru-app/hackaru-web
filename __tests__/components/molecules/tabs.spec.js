import Factory from '@/__tests__/__setups__/factory';
import Tabs from '@/components/molecules/tabs';

describe('Tabs', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(Tabs, {
      propsData: {
        items: ['Home', 'Reports', 'Calendar']
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click item', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper
        .findAll('li')
        .at(1)
        .trigger('click');
    });

    it('emit change', () => {
      expect(wrapper.emitted('change')[0]).toEqual([1]);
    });
  });
});
