<script>
export default {
  layout: 'loading',
  mounted() {
    this.exportCsv();
  },
  methods: {
    async exportCsv() {
      const data = await this.$store.dispatch('reports/fetchCsv', {
        start: this.$route.query.start,
        end: this.$route.query.end
      });
      if (data) {
        this.$gtm.trackEvent({
          eventCategory: 'ReportCsv',
          eventAction: 'export',
          name: 'export_report_to_csv'
        });
        location.assign(URL.createObjectURL(data));
      }
    }
  },
  render(h) {
    return h();
  }
};
</script>
