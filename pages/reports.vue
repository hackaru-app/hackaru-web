<i18n src="@/assets/locales/pages/reports.json"></i18n>

<template>
  <section>
    <date-header
      ref="header"
      :periods="['day', 'week', 'month', 'year']"
      :current-period.sync="currentPeriod"
      :title="title"
      :has-today="hasToday"
      class="date-header"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />

    <coach-tooltip :content="$t('moveToNextPage')" name="swipeReport">
      <loop-slider
        v-slot="{ slideStyle }"
        ref="slider"
        class="loop-slider"
        @slide-left="prev"
        @slide-right="next"
      >
        <div class="reports-wrapper">
          <div :style="slideStyle" class="containers">
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="prev"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="current"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :summary="summary"
                :projects="projects"
                chart-id="next"
              />
            </div>
          </div>
        </div>
      </loop-slider>
    </coach-tooltip>
  </section>
</template>

<script>
import CoachTooltip from '@/components/atoms/coach-tooltip';
import LoopSlider from '@/components/organisms/loop-slider';
import DateHeader from '@/components/organisms/date-header';
import ReportContent from '@/components/organisms/report-content';
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
    CoachTooltip,
    LoopSlider,
    ReportContent,
    DateHeader
  },
  head: {
    title: 'Reports'
  },
  data() {
    return {
      date: new Date(),
      currentPeriod: 'day'
    };
  },
  computed: {
    ...mapGetters({
      doughnutChartData: 'reports/doughnutChartData',
      barChartData: 'reports/barChartData',
      summary: 'reports/summary',
      projects: 'reports/projects'
    }),
    period() {
      return periods[this.currentPeriod];
    },
    title() {
      const formatString = this.$t(`${this.currentPeriod}.format`);
      return format(this.date, formatString || 'yyyy/MM/dd');
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
      handler: 'fetchReport'
    },
    date: {
      handler: 'fetchReport'
    }
  },
  activated() {
    this.fetchReport();
  },
  methods: {
    fetchReport() {
      this.$store.dispatch('reports/fetch', {
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
  min-height: 100vh;
  box-shadow: -3px 0 3px #00000005;
}
@media print {
  .slider-item {
    height: auto;
    box-shadow: none;
  }
}
</style>
