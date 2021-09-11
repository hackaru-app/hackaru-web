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
        this.$ga.event({
          eventCategory: 'CsvReports',
          eventAction: 'export',
        });
        const blob = new Blob([data], { type: 'text/csv' });
        saveAs(blob, 'report.csv');
      }
    },
  },
};
</script>
