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
      <section class="doughnut-chart-wrapper">
        <p v-if="empty" class="doughnut-chart-empty" />
        <doughnut-chart
          v-if="!empty"
          :chart-data="doughnutChartData"
          class="doughnut-chart"
        />
      </section>
      <section class="details">
        <header>
          <tabs
            :items="[$t('projects'), $t('activities')]"
            :index="selectedIndex"
            class="tabs"
            @change="change"
          />
        </header>
        <transition name="fade" mode="out-in">
          <section v-if="selectedIndex == 0" key="projects">
            <article v-for="project in projects" :key="project.id">
              <project-name :name="project.name" :color="project.color" />
              <time class="duration">
                {{ fromS(totals[project.id], 'hh:mm:ss') }}
              </time>
              <delta-icon
                :current="totals[project.id]"
                :previous="previousTotals[project.id]"
              />
            </article>
          </section>
          <section v-else key="activityGroups">
            <article
              v-for="activityGroup in activityGroups"
              :key="`${activityGroup.project.id}-${activityGroup.description}`"
            >
              <activity-name
                :description="activityGroup.description"
                :project="activityGroup.project"
              />
              <time class="duration">
                {{ fromS(activityGroup.duration, 'hh:mm:ss') }}
              </time>
            </article>
          </section>
        </transition>
      </section>
    </div>
  </article>
</template>

<script>
import Tabs from '~/components/molecules/tabs';
import DeltaIcon from '~/components/molecules/delta-icon';
import Icon from '~/components/atoms/icon';
import ColorScheme from '~/components/atoms/color-scheme';
import ProjectName from '~/components/molecules/project-name';
import ActivityName from '~/components/molecules/activity-name';
import DoughnutChart from '~/components/atoms/doughnut-chart';
import BarChart from '~/components/atoms/bar-chart';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    Tabs,
    DeltaIcon,
    ColorScheme,
    DoughnutChart,
    BarChart,
    ProjectName,
    ActivityName,
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
      type: Array,
      required: true,
    },
    selectedIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      fromS,
    };
  },
  computed: {
    ...mapGetters({
      empty: 'reports/empty',
    }),
  },
  methods: {
    change(index) {
      this.$scrollTo('body', 300, { offset: 50 });
      this.$emit('update:selectedIndex', index);
      this.$mixpanel.track('Select report tab', {
        item: ['projects', 'activities'][index],
      });
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
  display: flex;
  margin-top: 50px;
}
.doughnut-chart-wrapper {
  align-self: start;
  background-color: $background-translucent;
  border: 1px $border-dark solid;
  border-radius: 3px;
  box-shadow: 0 3px 5px $shadow;
  margin-right: 40px;
  padding: 20px;
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
.details {
  background-color: $background-translucent;
  border: 1px $border-dark solid;
  border-radius: 3px;
  box-shadow: 0 3px 5px $shadow;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  max-width: 650px;
  min-width: 1px;
  padding: 0;
}
.details header {
  display: flex;
  list-style-type: none;
  padding: 25px 20px;
  padding-bottom: 15px;
}
.details section {
  animation-delay: 305ms;
  animation-duration: 0.1s;
  animation-timing-function: linear;
}
.details article {
  align-items: center;
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 65px;
  justify-content: space-between;
  min-width: 1px;
  overflow: hidden;
  padding: 0 30px;
  &:last-child {
    border: 0;
    margin-bottom: 15px;
  }
  .duration {
    color: $text-light;
    flex: 1;
    font-family: $font-family-duration;
    padding-left: 25px;
    text-align: right;
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
    padding: 0 0;
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
  .details {
    background-color: $background;
    border: 0;
    box-shadow: none;
  }
  .details article {
    height: 65px;
  }
  .details header {
    background: none;
    border-bottom: 1px $border solid;
    padding-bottom: 20px;
  }
}

@media (prefers-color-scheme: dark) {
  .doughnut-chart-empty::before {
    border-color: $background-dark;
  }
}
</style>
