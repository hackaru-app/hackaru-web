<i18n src="~/assets/locales/components/organisms/report-content.json"></i18n>

<template>
  <article class="report-content">
    <color-scheme v-slot="{ isDark }" class="bar-chart-wrapper">
      <bar-chart
        :chart-data="barChartData"
        :is-dark="isDark"
        class="bar-chart"
      />
    </color-scheme>

    <div class="content">
      <section class="report-content-items">
        <report-content-item
          v-for="project in projects"
          :key="project.id"
          :project="project"
          :total="totals[project.id]"
          :activity-groups="activityGroups[project.id]"
          :previous-total="previousTotals[project.id]"
          :opened-detail="isOpenedDetail(project.id)"
          class="report-content-item"
          @toggle-detail="toggleDetail(project.id)"
        />
      </section>
      <section class="doughnut-chart-wrapper">
        <p v-if="empty" class="doughnut-chart-empty" />
        <doughnut-chart
          v-if="!empty"
          :chart-data="doughnutChartData"
          class="doughnut-chart"
        />
      </section>
    </div>
  </article>
</template>

<script>
import ColorScheme from '~/components/atoms/color-scheme';
import DoughnutChart from '~/components/atoms/doughnut-chart';
import BarChart from '~/components/atoms/bar-chart';
import ReportContentItem from '~/components/organisms/report-content-item';
import without from 'lodash.without';
import { mapGetters } from 'vuex';

export default {
  components: {
    ColorScheme,
    DoughnutChart,
    BarChart,
    ReportContentItem,
  },
  props: {
    barChartData: {
      type: Object,
      required: true,
    },
    doughnutChartData: {
      type: Object,
      required: true,
    },
    totals: {
      type: Object,
      required: true,
    },
    previousTotals: {
      type: Object,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
    activityGroups: {
      type: Object,
      required: true,
    },
    openedDetails: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      empty: 'reports/empty',
    }),
  },
  methods: {
    isOpenedDetail(projectId) {
      return this.openedDetails.includes(projectId);
    },
    toggleDetail(projectId) {
      if (this.isOpenedDetail(projectId)) {
        this.$emit(
          'update:openedDetails',
          without(this.openedDetails, projectId)
        );
      } else {
        this.$emit('update:openedDetails', [...this.openedDetails, projectId]);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.report-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-bottom: 45px;
  width: 100%;
}
.bar-chart-wrapper {
  height: 180px;
  max-width: 100%;
  min-width: 200px;
  width: 100%;
}
.bar-chart {
  height: 100%;
  width: 100%;
}
.content {
  align-items: flex-start;
  display: flex;
  margin-top: 50px;
}
.doughnut-chart-wrapper {
  align-self: start;
  background-color: $background-translucent;
  padding: 10px;
  position: sticky;
  top: 40px;
}
.doughnut-chart,
.doughnut-chart-empty {
  display: flex;
  height: 150px;
  width: 150px;
}
.doughnut-chart-empty {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  &::before {
    border: 40px $grey-f5f5f5 solid;
    border-radius: 50%;
    box-sizing: border-box;
    content: '';
    height: 160px;
    position: absolute;
    width: 160px;
  }
}
.report-content-items {
  background-color: $background-translucent;
  border: 1px $border-dark solid;
  border-radius: 3px;
  box-shadow: 0 3px 3px $shadow;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  margin-right: 40px;
  max-width: 650px;
  min-width: 1px;
  padding: 0;
}
.report-content-item {
  border-top: 1px $border solid;
  &:first-child {
    border-top: 0;
  }
}

@include mq(small) {
  .report-content {
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  .doughnut-chart-wrapper {
    align-self: center;
    background-color: $background;
    border: 0;
    box-shadow: none;
    display: flex;
    justify-content: center;
    margin: 0;
    order: 0;
    padding: 30px 0;
  }
  .doughnut-chart {
    align-self: center;
    order: 0;
    padding: 0;
  }
  .doughnut-chart,
  .doughnut-chart-empty {
    height: 160px;
    width: 160px;
  }
  .bar-chart-wrapper {
    height: 130px;
  }
  .content {
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  .report-content-items {
    background-color: $background;
    border: 0;
    border-bottom: 1px $border-dark solid;
    border-top: 1px $border-dark solid;
    box-shadow: none;
    margin-right: 0;
    order: 1;
    width: 100%;
  }
}

@media (prefers-color-scheme: dark) {
  .doughnut-chart-empty::before {
    border-color: $background-dark;
  }
}
</style>
