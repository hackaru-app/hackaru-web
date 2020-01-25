<i18n src="@/assets/locales/pages/reports/index.json"></i18n>

<template>
  <section>
    <delighted />
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
    <div class="tools">
      <a :href="pdfPath" class="pdf-link" target="_blank">PDF</a>
    </div>

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
                :totals="totals"
                :previous-totals="previousTotals"
                :projects="projects"
                chart-id="prev"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :totals="totals"
                :previous-totals="previousTotals"
                :projects="projects"
                chart-id="current"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :totals="totals"
                :previous-totals="previousTotals"
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
import Icon from '@/components/atoms/icon';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import LoopSlider from '@/components/organisms/loop-slider';
import DateHeader from '@/components/organisms/date-header';
import ContentHeader from '@/components/organisms/content-header';
import ReportContent from '@/components/organisms/report-content';
import Delighted from '@/components/molecules/delighted';
import { mapGetters } from 'vuex';
import { stringify } from 'query-string';
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
    add: addDays
  },
  week: {
    startOf: startOfWeek,
    endOf: endOfWeek,
    add: addWeeks
  },
  month: {
    startOf: startOfMonth,
    endOf: endOfMonth,
    add: addMonths
  },
  year: {
    startOf: startOfYear,
    endOf: endOfYear,
    add: addYears
  }
};

export default {
  components: {
    Delighted,
    Icon,
    CoachTooltip,
    LoopSlider,
    ReportContent,
    DateHeader,
    ContentHeader
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
      totals: 'reports/totals',
      previousTotals: 'reports/previousTotals',
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
    },
    pdfPath() {
      const query = stringify({
        start: this.period.startOf(this.date),
        end: this.period.endOf(this.date)
      });
      return `${this.localePath('reports')}/pdf/?${query}`;
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
        current: {
          start: this.period.startOf(this.date),
          end: this.period.endOf(this.date)
        },
        previous: {
          start: this.period.startOf(this.period.add(this.date, -1)),
          end: this.period.endOf(this.period.add(this.date, -1))
        }
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
  box-shadow: -3px 0 3px $shadow;
}
.tools {
  display: flex;
  padding: 0 40px;
  border-bottom: 1px $border-dark solid;
  background-color: $background-translucent;
  box-shadow: 0 3px 3px $shadow;
  a {
    display: flex;
    align-items: center;
    background: none;
    text-decoration: none;
    color: $text;
    padding: 13px 20px;
    border: 1px $border-dark solid;
    border-top: 0;
    border-bottom: 0;
    cursor: pointer;
    .icon {
      margin-right: 6px;
    }
  }
}
@media screen and (max-width: 640px) {
  .tools {
    padding: 0;
  }
}
</style>