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
      <div class="exports">
        <button class="pdf-button" @click="exportReport('pdf')">PDF</button>
        <button class="csv-button" @click="exportReport('csv')">CSV</button>
      </div>
      <client-only>
        <v-popover>
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
                <project-name v-bind="project" />
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
      </client-only>
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
import ProjectName from '@/components/molecules/project-name';
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
    ContentHeader,
    ProjectName
  },
  head: {
    title: 'Reports'
  },
  data() {
    return {
      date: new Date(),
      currentPeriod: 'day',
      selectedIndex: 0,
      projectIds: []
    };
  },
  computed: {
    ...mapGetters({
      doughnutChartData: 'reports/doughnutChartData',
      barChartData: 'reports/barChartData',
      totals: 'reports/totals',
      previousTotals: 'reports/previousTotals',
      projects: 'reports/projects',
      allProjects: 'projects/all',
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
    projectIds: {
      handler: 'fetchReport'
    },
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
          end: this.period.endOf(this.date),
          projectIds: this.projectIds
        },
        previous: {
          start: this.period.startOf(this.period.add(this.date, -1)),
          end: this.period.endOf(this.period.add(this.date, -1)),
          projectIds: this.projectIds
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
      const query = stringify(
        {
          start: formatISO(this.period.startOf(this.date)),
          end: formatISO(this.period.endOf(this.date)),
          projectIds: this.projectIds
        },
        { arrayFormat: 'bracket' }
      );
      window.open(`${this.localePath('reports')}/${type}/?${query}`);
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
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px $border-dark solid;
  background-color: $background-translucent;
  box-shadow: 0 3px 3px $shadow;
  button {
    display: flex;
    background: none;
    color: $text;
    padding: 15px 20px;
    border: 0;
    border: 1px $border-dark solid;
    border-top: 0;
    border-bottom: 0;
    cursor: pointer;
  }
}
.popover-wrapper {
  padding: 10px;
}
.project-item {
  display: flex;
  padding: 0 15px;
  height: 45px;
  min-width: 130px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  transition: background-color 0.15s;
  &:hover {
    background-color: $background-hover;
  }
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
@media screen and (max-width: 640px) {
  .tools {
    padding: 0;
  }
  .filter-button {
    margin-right: 30px;
    border-right: 1px $border-dark solid;
  }
}
</style>
