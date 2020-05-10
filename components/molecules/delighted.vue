<script>
const libraryUrl =
  'https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library';

export default {
  async mounted() {
    if (!this.$env.DELIGHTED_TOKEN) return;
    await this.load();
    this.survey();
  },
  methods: {
    async load() {
      window.delighted = window.delighted || {};
      await this.$loadScript(
        `${libraryUrl}/${this.$env.DELIGHTED_TOKEN}/delighted.js`
      );
    },
    survey() {
      if (!window.delighted.survey) return;
      window.delighted.survey({
        name: this.$store.getters['auth/userId'],
        properties: {
          locale: this.$i18n.locale,
        },
      });
    },
  },
  render(h) {
    return h();
  },
};
</script>
