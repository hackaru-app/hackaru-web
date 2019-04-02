<template>
  <section>
    <date-header
      ref="header"
      :date.sync="date"
      :period-index.sync="index"
      :periods="periods"
      @left="slideLeft"
      @right="slideRight"
    />
    <infinite-slider ref="slider" @slide-left="prev" @slide-right="next">
      <template slot-scope="{ slideStyle }">
        <div class="reports-wrapper">
          <div :style="slideStyle" class="containers">
            <div class="slider-item">
              <report-container
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="prev"
              />
            </div>
            <div class="slider-item">
              <report-container
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="current"
              />
            </div>
            <div class="slider-item">
              <report-container
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="next"
              />
            </div>
          </div>
        </div>
      </template>
    </infinite-slider>
  </section>
</template>

<script>
import InfiniteSlider from '@/components/organisms/infinite-slider';
import DateHeader, { periods } from '@/components/organisms/date-header';
import ReportContainer from '@/components/organisms/report-container';
import { format } from 'date-fns';
import { mapGetters } from 'vuex';

export default {
  components: {
    InfiniteSlider,
    ReportContainer,
    DateHeader
  },
  head: {
    title: 'Reports'
  },
  data() {
    return {
      date: format(new Date(), 'YYYY-MM-DD'),
      index: 0,
      periods: [
        {
          ...periods.day,
          unit: 'hour'
        },
        {
          ...periods.week,
          unit: 'day'
        },
        {
          ...periods.month,
          unit: 'day'
        },
        {
          ...periods.year,
          unit: 'month'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      doughnutChartData: 'reports/getDoughnutChartData',
      barChartData: 'reports/getBarChartData',
      summary: 'reports/getSummary',
      projects: 'reports/getProjects'
    }),
    period() {
      return this.periods[this.index];
    }
  },
  watch: {
    index() {
      this.fetchPeriod();
    },
    date() {
      this.fetchPeriod();
    }
  },
  async mounted() {
    await this.fetchPeriod();
  },
  methods: {
    fetchPeriod() {
      this.$store.dispatch('reports/getReports', {
        start: this.period.startOf(this.date),
        end: this.period.endOf(this.date),
        period: this.period.unit
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    prev() {
      this.date = format(
        this.period.add(this.period.startOf(this.date), -1),
        'YYYY-MM-DD'
      );
    },
    next() {
      this.date = format(
        this.period.add(this.period.startOf(this.date), 1),
        'YYYY-MM-DD'
      );
    }
  }
};
</script>

<style scoped lang="scss">
.reports-wrapper {
  overflow: hidden;
}
.containers {
  display: flex;
  flex-direction: row;
}
.slider-item {
  display: flex;
  align-items: flex-start;
  min-width: 100%;
  height: 100vh;
  box-shadow: -3px 0 3px #00000005;
}
</style>
