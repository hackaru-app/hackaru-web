import i18nCacher from '@/plugins/customs/i18n-cacher';

describe('I18nCacher', () => {
  let onReady;
  let app;

  beforeEach(() => {
    app = {
      i18n: {},
      router: {
        onReady: fn => {
          onReady = fn;
        }
      }
    };

    localStorage.clear();
    i18nCacher({ app });
  });

  describe('when call onReady', () => {
    beforeEach(() => {
      localStorage.setItem('locale', 'ja');
      onReady();
    });

    it('set locale', () => {
      expect(app.i18n.locale).toBe('ja');
    });
  });

  describe('when call onReady but local-storage does not have locale', () => {
    beforeEach(() => {
      onReady();
    });

    it('does not set locale', () => {
      expect(app.i18n.locale).toBeUndefined();
    });
  });

  describe('when switch language', () => {
    beforeEach(() => {
      app.i18n.onLanguageSwitched('en', 'ja');
    });

    it('cache locale to local-storage', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith('locale', 'ja');
    });
  });
});
