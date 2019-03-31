<script>
import { Doughnut, mixins } from 'vue-chartjs';
import { fromS } from 'hh-mm-ss';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) =>
              fromS(data.datasets[0].data[tooltipItem.index])
          }
        }
      })
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
