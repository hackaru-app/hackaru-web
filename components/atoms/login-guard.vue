<template>
  <section>
    <slot />
  </section>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.getters['auth/loggedIn']) return this.redirect();
    const userId = this.$store.getters['auth/userId'];
    this.$gtm.push({
      userId,
    });
    this.$sentry.configureScope((scope) => {
      scope.setUser({ id: userId });
    });
  },
  methods: {
    redirect() {
      sessionStorage.setItem('previousPath', this.$route.fullPath);
      this.$router.replace(this.localePath('auth'));
    },
  },
};
</script>
