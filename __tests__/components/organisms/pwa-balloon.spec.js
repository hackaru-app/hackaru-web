import Factory from '@/__tests__/__setups__/factory';
import PwaBalloon from '@/components/organisms/pwa-balloon';

describe('PwaBalloon', () => {
  let factory;
  let wrapper;

  function setPlatform(platform) {
    Object.defineProperty(window.navigator, 'platform', {
      value: platform,
      configurable: true
    });
  }

  function setStandalone(standalone) {
    Object.defineProperty(window.navigator, 'standalone', {
      value: standalone,
      configurable: true
    });
  }

  beforeEach(() => {
    localStorage.clear();
    setStandalone(false);
    factory = new Factory(PwaBalloon, {
      stubs: ['i18n']
    });
  });

  describe('when platform is iPhone', () => {
    beforeEach(() => {
      setPlatform('iPhone');
      wrapper = factory.shallow();
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(true);
    });
  });

  describe('when platform is iPad', () => {
    beforeEach(() => {
      setPlatform('iPad');
      wrapper = factory.shallow();
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(true);
    });
  });

  describe('when other platform', () => {
    beforeEach(() => {
      setPlatform('Win32');
      wrapper = factory.shallow();
    });

    it('does not render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(false);
    });
  });

  describe('when platform is iPhone but standalone mode', () => {
    beforeEach(() => {
      setStandalone(true);
      setPlatform('iPhone');
      wrapper = factory.shallow();
    });

    it('does not render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(false);
    });
  });

  describe('when click close button', () => {
    beforeEach(() => {
      setPlatform('iPhone');
      wrapper = factory.shallow();
      wrapper.vm.close();
    });

    it('enable hidePwaBallon', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith('hidePwaBallon', true);
    });

    it('does not render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(false);
    });
  });

  describe('when platform is iPhone but balloon already closed', () => {
    beforeEach(() => {
      setPlatform('iPhone');
      localStorage.setItem('hidePwaBallon', true);
      wrapper = factory.shallow();
    });

    it('does not render balloon', () => {
      expect(wrapper.contains('.balloon')).toBe(false);
    });
  });
});
