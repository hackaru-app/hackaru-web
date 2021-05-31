<script>
import merge from 'lodash.merge';
import { Bar, mixins } from 'vue-chartjs';
import { fromS } from 'hh-mm-ss';

const options = {
  default: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          display: false,
        },
      ],
      xAxes: [
        {
          ticks: {
            maxRotation: 0,
            fontSize: 13,
          },
          offset: true,
          stacked: true,
          gridLines: {
            zeroLineColor: '#eee',
            color: '#eee',
          },
        },
      ],
    },
  },
};

options.dark = merge({}, options.default, {
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: '#cdd0d1',
        },
        gridLines: {
          zeroLineColor: '#3a4357',
          color: '#3a4357',
        },
      },
    ],
  },
});

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    isDark: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        ...(this.isDark ? options.dark : options.default),
        tooltips: {
          callbacks: {
            label: ({ yLabel }) => {
              this.$mixpanel.track('Hover bar chart', {
                component: 'bar-chart',
              });
              return fromS(yLabel);
            },
          },
        },
      };
    },
  },
  watch: {
    isDark() {
      this.$data._chart.destroy();
      this.renderBarChart();
    },
  },
  mounted() {
    this.renderBarChart();
  },
  methods: {
    renderBarChart() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
