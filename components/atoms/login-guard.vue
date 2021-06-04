<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn',
      userId: 'auth/userId',
    }),
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler() {
        if (!this.loggedIn && !process.server) {
          this.$cookies.set('previous_path', this.$route.fullPath);
          this.$mixpanel.reset();
          window.location.assign(this.localePath('auth'));
        }
      },
    },
    userId: {
      immediate: true,
      handler() {
        if (this.$ga) this.$ga.set('userId', this.userId);
        if (this.$mixpanel) this.$mixpanel.identify(this.userId);
        this.$logrocket.identify(this.userId);
        this.$sentry.configureScope((scope) => {
          scope.setUser({ id: this.userId });
        });
      },
    },
  },
  render(h) {
    return h();
  },
};
</script>
