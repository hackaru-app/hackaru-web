<template>
  <loading v-if="loading" />
</template>

<script>
import Loading from '@/components/molecules/loading';

export default {
  layout: 'none',
  components: {
    Loading
  },
  head: {
    title: 'Loading'
  },
  data() {
    return {
      loading: true
    };
  },
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
        this.loading = false;
        this.$gtm.trackEvent({
          eventCategory: 'ReportPdf',
          eventAction: 'export',
          name: 'export_report_to_pdf'
        });
        location.assign(URL.createObjectURL(data));
      }
    }
  }
};
</script>
