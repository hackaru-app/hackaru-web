<script>
import merge from 'lodash.merge';
import { Bar, mixins } from 'vue-chartjs';
import { fromS } from 'hh-mm-ss';

const options = {
  default: {
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
  }
};

options.dark = merge({}, options.default, {
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: '#cdd0d1'
        },
        gridLines: {
          color: '#262b38'
        }
      }
    ]
  }
});

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    isDark: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    options() {
      return this.isDark ? options.dark : options.default;
    }
  },
  watch: {
    isDark() {
      this.$data._chart.destroy();
      this.renderBarChart();
    }
  },
  mounted() {
    this.renderBarChart();
  },
  methods: {
    renderBarChart() {
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>
