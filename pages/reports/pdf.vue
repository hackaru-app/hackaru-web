<template>
  <loading v-if="loading" />
</template>

<script>
import { saveAs } from 'file-saver';
import Loading from '~/components/molecules/loading';

export default {
  components: {
    Loading,
  },
  layout: 'none',
  data() {
    return {
      loading: true,
    };
  },
  head: {
    title: 'Loading',
  },
  mounted() {
    this.exportPdf();
  },
  methods: {
    async exportPdf() {
      const data = await this.$store.dispatch('reports/fetchPdf', {
        start: this.$route.query.start,
        end: this.$route.query.end,
        projectIds: this.$route.query.projectIds,
      });
      if (data) {
        this.loading = false;
        this.$ga.event({
          eventCategory: 'PdfReports',
          eventAction: 'export',
        });
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'report.pdf');
      }
    },
  },
};
</script>
