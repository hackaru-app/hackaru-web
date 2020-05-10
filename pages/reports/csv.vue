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
    this.exportCsv();
  },
  methods: {
    async exportCsv() {
      const data = await this.$store.dispatch('reports/fetchCsv', {
        start: this.$route.query.start,
        end: this.$route.query.end,
        projectIds: this.$route.query.projectIds,
      });
      if (data) {
        this.loading = false;
        this.$gtm.trackEvent({
          eventCategory: 'ReportCsv',
          eventAction: 'export',
          name: 'export_report_to_csv',
        });
        const blob = new Blob([data], { type: 'text/csv' });
        saveAs(blob, 'report.csv');
      }
    },
  },
};
</script>
