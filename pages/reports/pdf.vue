<template>
  <loading v-if="loading" />
</template>

<script>
import { saveAs } from 'file-saver';
import Loading from '@/components/molecules/loading';

export default {
  layout: 'none',
  components: {
    Loading,
  },
  head: {
    title: 'Loading',
  },
  data() {
    return {
      loading: true,
    };
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
