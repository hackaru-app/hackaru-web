<script>
import { Bar, mixins } from 'vue-chartjs';
import { fromS } from 'hh-mm-ss';

export default {
  extends: Bar,
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
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: ({ yLabel }) => fromS(yLabel)
          }
        },
        scales: {
          yAxes: [
            {
              stacked: true,
              display: false
            }
          ],
          xAxes: [
            {
              ticks: {
                maxRotation: 0,
                fontSize: 13
              },
              offset: true,
              maxBarThickness: 40,
              stacked: true,
              gridLines: {
                color: '#eee'
              }
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
