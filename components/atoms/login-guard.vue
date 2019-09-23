<template>
  <section>
    <slot />
  </section>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.getters['auth/loggedIn']) return this.redirect();
    // this.$ga.set('userId', this.$store.getters['auth/userId']);
  },
  methods: {
    redirect() {
      sessionStorage.setItem('previousPath', this.$route.fullPath);
      this.$router.replace(this.localePath('auth'));
    }
  }
};
</script>
