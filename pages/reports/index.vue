<i18n src="~/assets/locales/pages/reports/index.json"></i18n>

<template>
  <section>
    <delighted />
    <date-header
      ref="header"
      :periods="['day', 'week', 'month', 'year']"
      :current-period="currentPeriod"
      :title="title"
      :has-today="hasToday"
      data-test-id="date-header"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
      @change-period="changePeriod"
    />
    <div class="tools">
      <div class="exports">
        <button data-test-id="pdf-button" @click="exportReport('pdf')">
          PDF
        </button>
        <button data-test-id="csv-button" @click="exportReport('csv')">
          CSV
        </button>
      </div>
      <client-only>
        <window-scroll @scroll="scroll">
          <v-popover :open.sync="openPopover">
            <button class="tooltip-target filter-button">
              <icon
                :class="['icon', { 'is-primary': projectIds.length }]"
                name="filter-icon"
              />
            </button>
            <template slot="popover">
              <section class="popover-wrapper">
                <label
                  v-for="project in allProjects"
                  :key="project.id"
                  :for="`popover-wrapper-${project.id}`"
                  class="project-item"
                >
                  <project-name v-bind="project" class="project-name" />
                  <input
                    :id="`popover-wrapper-${project.id}`"
                    v-model="projectIds"
                    :value="project.id"
                    type="checkbox"
                    class="checkbox"
                  />
                </label>
              </section>
            </template>
          </v-popover>
        </window-scroll>
      </client-only>
    </div>

    <coach-tooltip :content="$t('moveToNextPage')" name="swipeReport">
      <loop-slider
        v-slot="{ slideStyle }"
        ref="slider"
        data-test-id="loop-slider"
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
                :total-sum="totalSum"
                :previous-totals="previousTotals"
                :projects="projects"
                :activity-groups="activityGroups"
                :opened-details.sync="openedDetails"
                chart-id="prev"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :totals="totals"
                :total-sum="totalSum"
                :previous-totals="previousTotals"
                :projects="projects"
                :activity-groups="activityGroups"
                :opened-details.sync="openedDetails"
                chart-id="current"
              />
            </div>
            <div class="slider-item">
              <report-content
                :bar-chart-data="barChartData"
                :doughnut-chart-data="doughnutChartData"
                :totals="totals"
                :total-sum="totalSum"
                :previous-totals="previousTotals"
                :projects="projects"
                :activity-groups="activityGroups"
                :opened-details.sync="openedDetails"
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
import WindowScroll from '~/components/atoms/window-scroll';
import Icon from '~/components/atoms/icon';
import ProjectName from '~/components/molecules/project-name';
import CoachTooltip from '~/components/atoms/coach-tooltip';
import LoopSlider from '~/components/organisms/loop-slider';
import DateHeader from '~/components/organisms/date-header';
import ReportContent from '~/components/organisms/report-content';
import Delighted from '~/components/molecules/delighted';
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
  endOfYear,
} from 'date-fns';

export default {
  components: {
    Delighted,
    Icon,
    CoachTooltip,
    LoopSlider,
    ReportContent,
    DateHeader,
    ProjectName,
    WindowScroll,
  },
  data() {
    return {
      date: new Date(),
      currentPeriod: this.getDefaultPeriod(),
      projectIds: [],
      openedDetails: [],
      openPopover: false,
    };
  },
  head: {
    title: 'Reports',
  },
  computed: {
    ...mapGetters({
      doughnutChartData: 'reports/doughnutChartData',
      barChartData: 'reports/barChartData',
      totals: 'reports/totals',
      totalSum: 'reports/totalSum',
      previousTotals: 'reports/previousTotals',
      projects: 'reports/projects',
      allProjects: 'projects/all',
      activityGroups: 'reports/activityGroups',
      startDay: 'user/startDay',
    }),
    periods() {
      return ((weekStartsOn) => ({
        day: {
          startOf: startOfDay,
          endOf: endOfDay,
          add: addDays,
        },
        week: {
          startOf: (date) => startOfWeek(date, { weekStartsOn }),
          endOf: (date) => endOfWeek(date, { weekStartsOn }),
          add: addWeeks,
        },
        month: {
          startOf: startOfMonth,
          endOf: endOfMonth,
          add: addMonths,
        },
        year: {
          startOf: startOfYear,
          endOf: endOfYear,
          add: addYears,
        },
      }))(this.startDay);
    },
    period() {
      return this.periods[this.currentPeriod];
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
  },
  watch: {
    projectIds: {
      handler() {
        this.$mixpanel.track('Filter project ids', {
          component: 'report',
        });
        this.fetchReport();
      },
    },
    period: {
      handler() {
        this.fetchReport();
      },
    },
    date: {
      handler: 'fetchReport',
    },
  },
  async activated() {
    this.$store.dispatch('projects/fetch');
    await this.$store.dispatch('user/fetch');
    this.fetchReport();
  },
  methods: {
    fetchReport() {
      this.$store.dispatch('reports/fetch', {
        current: {
          start: this.period.startOf(this.date),
          end: this.period.endOf(this.date),
          projectIds: this.projectIds,
        },
        previous: {
          start: this.period.startOf(this.period.add(this.date, -1)),
          end: this.period.endOf(this.period.add(this.date, -1)),
          projectIds: this.projectIds,
        },
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    today() {
      this.$mixpanel.track('Show today report', {
        component: 'report',
      });
      this.date = new Date();
    },
    prev() {
      this.$mixpanel.track('Show prev report', {
        component: 'report',
      });
      this.date = this.period.add(this.period.startOf(this.date), -1);
    },
    next() {
      this.$mixpanel.track('Show next report', {
        component: 'report',
      });
      this.date = this.period.add(this.period.startOf(this.date), 1);
    },
    exportReport(type) {
      this.$mixpanel.track('Export report', {
        component: 'report',
        type,
      });
      const query = stringify({
        start: formatISO(this.period.startOf(this.date)),
        end: formatISO(this.period.endOf(this.date)),
        projectIds: this.projectIds,
      });
      window.open(`${this.localePath('reports')}/${type}/?${query}`);
    },
    scroll() {
      this.openPopover = false;
    },
    changePeriod(period) {
      const permanent = 60 * 60 * 24 * 365 * 20;
      this.currentPeriod = period;
      this.$mixpanel.track('Select period', {
        component: 'report',
        period: this.currentPeriod,
      });
      this.$cookies.set('report_period', period, {
        path: '/',
        maxAge: permanent,
        sameSite: 'Lax',
      });
    },
    getDefaultPeriod() {
      const cached = this.$cookies.get('report_period');
      return ['day', 'week', 'month', 'year'].includes(cached) ? cached : 'day';
    },
  },
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
  align-items: flex-start;
  box-shadow: -3px 0 3px $shadow;
  display: flex;
  min-height: 100vh;
  min-width: 100%;
}

.tools {
  background-color: $background-translucent;
  border-bottom: 1px $border-dark solid;
  box-shadow: 0 3px 3px $shadow;
  box-sizing: border-box;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 40px;

  button {
    align-items: center;
    background: none;
    border: 0;
    border: 1px $border-dark solid;
    border-bottom: 0;
    border-top: 0;
    color: $text;
    display: flex;
    height: 50px;
    padding: 0 20px;
  }
}

.popover-wrapper {
  max-height: 270px;
  overflow: scroll;
  padding: 10px;
}

.project-item {
  align-items: center;
  border-radius: 5px;
  display: flex;
  height: 45px;
  justify-content: space-between;
  padding: 0 15px;
  transition: background-color 0.15s;

  &:hover {
    background-color: $background-hover;
  }
}

.project-name {
  max-width: 150px;
  padding-right: 30px;
}

.exports {
  display: flex;

  button {
    border-left: 0;

    &:first-child {
      border-left: 1px $border-dark solid;
    }
  }
}

@include mq(small) {
  .tools {
    padding: 0;
  }

  .filter-button {
    border-right: 1px $border-dark solid;
    margin-right: 30px;
  }
}
</style>
