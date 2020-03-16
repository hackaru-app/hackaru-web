<i18n src="@/assets/locales/components/organisms/report-content.json"></i18n>

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
import Tabs from '@/components/molecules/tabs';
import DeltaIcon from '@/components/molecules/delta-icon';
import Icon from '@/components/atoms/icon';
import ColorScheme from '@/components/atoms/color-scheme';
import ProjectName from '@/components/molecules/project-name';
import ActivityName from '@/components/molecules/activity-name';
import DoughnutChart from '@/components/atoms/doughnut-chart';
import BarChart from '@/components/atoms/bar-chart';
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
    ActivityName
  },
  props: {
    barChartData: {
      type: Object,
      required: true
    },
    doughnutChartData: {
      type: Object,
      required: true
    },
    totals: {
      type: Object,
      required: true
    },
    previousTotals: {
      type: Object,
      required: true
    },
    projects: {
      type: Array,
      required: true
    },
    activityGroups: {
      type: Array,
      required: true
    },
    selectedIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      fromS
    };
  },
  computed: {
    ...mapGetters({
      empty: 'reports/empty'
    })
  },
  methods: {
    change(index) {
      this.$scrollTo('body', {
        offset: 50,
        onDone: () => this.$emit('update:selectedIndex', index)
      });
    }
  }
};
</script>

<style scoped lang="scss">
.report-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  padding-bottom: 45px;
  box-sizing: border-box;
}
.bar-chart-wrapper {
  max-width: 100%;
  min-width: 200px;
  width: 100%;
  height: 180px;
}
.bar-chart {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  margin-top: 50px;
}
.doughnut-chart-wrapper {
  position: sticky;
  top: 40px;
  margin-right: 40px;
  align-self: start;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 3px 5px $shadow;
  border: 1px $border solid;
}
.doughnut-chart,
.doughnut-chart-empty {
  display: flex;
  width: 150px;
  height: 150px;
}
.doughnut-chart-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  &:before {
    position: absolute;
    content: '';
    width: 160px;
    height: 160px;
    box-sizing: border-box;
    border: 40px $grey-f5f5f5 solid;
    border-radius: 50%;
  }
}
.details {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 1px;
  max-width: 650px;
  flex: 1;
  margin: 0;
  box-shadow: 0 3px 5px $shadow;
  border: 1px $border solid;
  border-radius: 3px;
}
.details header {
  padding: 25px 20px;
  padding-bottom: 15px;
  list-style-type: none;
  display: flex;
  background-color: $background-translucent;
}
.details section {
  animation-duration: 0.1s;
  animation-timing-function: linear;
}
.details article {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  min-width: 1px;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  height: 65px;
  padding: 0 30px;
  &:last-child {
    border: 0;
    margin-bottom: 15px;
  }
  .duration {
    flex: 1;
    text-align: right;
    color: $text-light;
    padding-left: 25px;
    font-family: $font-family-duration;
  }
}
@include mq(small) {
  .report-content {
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
  .doughnut-chart {
    padding: 0 0;
    align-self: center;
  }
  .doughnut-chart,
  .doughnut-chart-empty {
    width: 160px;
    height: 160px;
  }
  .bar-chart-wrapper {
    height: 130px;
  }
  .content {
    padding: 0;
    margin: 0;
    flex-direction: column;
  }
  .doughnut-chart-wrapper {
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 30px 0;
    order: 0;
    margin: 0;
    border: 0;
    box-shadow: none;
  }
  .details {
    border: 0;
    box-shadow: none;
  }
  .details article {
    height: 65px;
  }
  .details header {
    background: none;
    padding-bottom: 20px;
    border-bottom: 1px $border solid;
  }
}
@media (prefers-color-scheme: dark) {
  .doughnut-chart-empty:before {
    border-color: $background-dark;
  }
}
</style>
