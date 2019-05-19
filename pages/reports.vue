<i18n src="@/assets/locales/pages/reports.json" />

<template>
  <section>
    <date-header
      ref="header"
      :periods="['day', 'week', 'month', 'year']"
      :current-period.sync="currentPeriod"
      :title="title"
      :has-today="hasToday"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />

    <loop-slider ref="slider" @slide-left="prev" @slide-right="next">
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
    </loop-slider>
  </section>
</template>

<script>
import LoopSlider from '@/components/organisms/loop-slider';
import DateHeader from '@/components/organisms/date-header';
import ReportContainer from '@/components/organisms/report-container';
import { mapGetters } from 'vuex';
import {
  format,
  isEqual,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear
} from 'date-fns';

const periods = {
  day: {
    startOf: startOfDay,
    endOf: endOfDay,
    add: addDays,
    barChartPeriod: 'hour'
  },
  week: {
    startOf: startOfWeek,
    endOf: endOfWeek,
    add: addWeeks,
    barChartPeriod: 'day'
  },
  month: {
    startOf: startOfMonth,
    endOf: endOfMonth,
    add: addMonths,
    barChartPeriod: 'day'
  },
  year: {
    startOf: startOfYear,
    endOf: endOfYear,
    add: addYears,
    barChartPeriod: 'month'
  }
};

export default {
  components: {
    LoopSlider,
    ReportContainer,
    DateHeader
  },
  head: {
    title: 'Reports'
  },
  data() {
    return {
      date: format(new Date(), 'YYYY-MM-DD'),
      currentPeriod: 'day'
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
      return periods[this.currentPeriod];
    },
    title() {
      return format(this.date, this.$t(`${this.currentPeriod}.format`));
    },
    hasToday() {
      return isEqual(
        this.period.startOf(new Date()),
        this.period.startOf(this.date)
      );
    }
  },
  watch: {
    period: {
      handler: 'fetchPeriod',
      immediate: true
    },
    date: {
      handler: 'fetchPeriod'
    }
  },
  methods: {
    fetchPeriod() {
      this.$store.dispatch('reports/getReports', {
        start: this.period.startOf(this.date),
        end: this.period.endOf(this.date),
        period: this.period.barChartPeriod
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    today() {
      this.date = new Date();
    },
    prev() {
      this.date = this.period.add(this.period.startOf(this.date), -1);
    },
    next() {
      this.date = this.period.add(this.period.startOf(this.date), 1);
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
@media print {
  .slider-item {
    height: auto;
    box-shadow: none;
  }
}
</style>
