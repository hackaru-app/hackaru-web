<script>
export default {
  layout: 'loading',
  mounted() {
    this.exportPdf();
  },
  methods: {
    async exportPdf() {
      const data = await this.$store.dispatch('reports/fetchPdf', {
        start: this.$route.query.start,
        end: this.$route.query.end
      });
      if (data) {
        this.$gtm.trackEvent({
          eventCategory: 'ReportPdf',
          eventAction: 'export',
          name: 'export_report_to_pdf'
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
