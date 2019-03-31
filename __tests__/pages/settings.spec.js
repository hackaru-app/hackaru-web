import Factory from '@/__tests__/__setups__/factory';
import Settings from '@/pages/settings';

describe('Settings', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(Settings);
  });

  it('render correctly', () => {
    expect(factory.shallow()).toMatchSnapshot();
  });

  describe('when change selected tab', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ paths: ['home', 'settings'] });
      wrapper.find('.tabs').vm.$emit('change', 1);
    });

    it('move to selected page', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        './settings'
      );
    });
  });
});
