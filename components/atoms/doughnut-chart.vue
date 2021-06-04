<script>
import { Doughnut, mixins } from 'vue-chartjs';
import { fromS } from 'hh-mm-ss';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: ({ index }, data) => {
              this.$mixpanel.track('Hover doughnut chart', {
                component: 'bar-chart',
              });
              return fromS(data.datasets[0].data[index]);
            },
          },
        },
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
