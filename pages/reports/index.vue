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
      class="date-header sticky"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />
    <div class="tools">
      <button class="pdf-button" @click="exportReport('pdf')">PDF</button>
      <button class="csv-button" @click="exportReport('csv')">CSV</button>
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
                :activity-groups="activityGroups"
                :selected-index.sync="selectedIndex"
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
                :activity-groups="activityGroups"
                :selected-index.sync="selectedIndex"
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
                :activity-groups="activityGroups"
                :selected-index.sync="selectedIndex"
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
  formatISO,
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
      currentPeriod: 'day',
      selectedIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      doughnutChartData: 'reports/doughnutChartData',
      barChartData: 'reports/barChartData',
      totals: 'reports/totals',
      previousTotals: 'reports/previousTotals',
      projects: 'reports/projects',
      activityGroups: 'reports/activityGroups'
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
    },
    exportReport(type) {
      window.open(
        `${this.localePath('reports')}/${type}/?${stringify({
          start: formatISO(this.period.startOf(this.date)),
          end: formatISO(this.period.endOf(this.date))
        })}`
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
  min-height: 100vh;
  box-shadow: -3px 0 3px $shadow;
}
.tools {
  display: flex;
  padding: 0 40px;
  border-bottom: 1px $border-dark solid;
  background-color: $background-translucent;
  box-shadow: 0 3px 3px $shadow;
  button {
    display: flex;
    align-items: center;
    background: none;
    color: $text;
    padding: 15px 20px;
    border: 0;
    border-right: 1px $border-dark solid;
    cursor: pointer;
    .icon {
      margin-right: 6px;
    }
    &:first-child {
      border-left: 1px $border-dark solid;
    }
  }
}
@media screen and (max-width: 640px) {
  .date-header {
    top: $side-bar-min-height;
  }
  .tools {
    padding: 0;
  }
}
</style>
