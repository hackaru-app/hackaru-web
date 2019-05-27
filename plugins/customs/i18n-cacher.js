export default function({ app }) {
  app.router.onReady(() => {
    if (localStorage.locale) {
      app.i18n.locale = localStorage.locale;
    }
  });

  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    localStorage.setItem('locale', newLocale);
  };
}
