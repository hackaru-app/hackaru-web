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
      <div class="doughnut-chart-wrapper">
        <p v-if="empty" class="doughnut-chart-empty" />
        <doughnut-chart
          v-if="!empty"
          :chart-data="doughnutChartData"
          class="doughnut-chart"
        />
      </div>
      <div class="accordion">
        <div class="tabs-wrapper">
          <tabs
            :items="['プロジェクト', '計測']"
            :index="selectedIndex"
            class="tabs"
            @change="change"
          />
        </div>
        <div v-if="selectedIndex == 0" class="projects">
          <report-accordion-item
            v-for="(project, index) in projects"
            :key="project.id"
            :project="project"
            :opened="opened[index]"
            :total="totals[project.id]"
            :previous-total="previousTotals[project.id]"
            @toggle="opened => toggle(opened, index)"
          />
        </div>
        <div v-if="selectedIndex == 1" class="activities">
          <article
            v-for="activityGroup in activityGroups"
            :key="activityGroup.id"
            class="report-accordion-item"
          >
            <header class="project">
              <project-name
                :name="activityGroup.description"
                :color="activityGroup.project.color"
              />
              <time class="duration">
                {{ fromS(activityGroup.duration, 'hh:mm:ss') }}
              </time>
            </header>
          </article>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Tabs from '@/components/molecules/tabs';
import Icon from '@/components/atoms/icon';
import ReportAccordionItem from '@/components/molecules/report-accordion-item';
import ColorScheme from '@/components/atoms/color-scheme';
import ProjectName from '@/components/molecules/project-name';
import DoughnutChart from '@/components/atoms/doughnut-chart';
import BarChart from '@/components/atoms/bar-chart';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    Tabs,
    ReportAccordionItem,
    ColorScheme,
    DoughnutChart,
    BarChart,
    ProjectName
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
    opened: {
      type: Object,
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
    toggle(opened, index) {
      this.$emit('update:opened', {
        ...this.opened,
        [index]: opened
      });
    },
    change(index) {
      this.$emit('update:selectedIndex', index);
      // this.selectedIndex = index;
    }
  }
};
</script>

<style scoped lang="scss">
.tabs-wrapper {
  padding: 20px;
  padding-bottom: 20px;
  list-style-type: none;
  box-shadow: 0 3px 5px $shadow;
  display: flex;
  border-bottom: 1px solid $border;
  li {
    background: #f5f5f5;
    padding: 10px 15px;
    margin-right: 10px;
    border-radius: 5px;
  }
}
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
  // width: 100%;
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
.accordion {
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

.report-accordion-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid $border;
  &:last-child {
    border: 0;
  }
}
.project {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  list-style-position: inside;
  justify-content: center;
  padding: 0 30px;
  height: 60px;
}
.project .icon {
  margin-right: 20px;
  transition: transform 0.1s linear;
}
.project .icon.opened {
  transform: rotate(90deg);
}
.project .icon.empty {
  color: $text-lighter;
}
.content li {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  min-width: 1px;
  border-bottom: 1px solid $border;
  justify-content: space-between;
  height: 65px;
  margin-left: 60px;
  padding-right: 50px;
  &:last-child {
    margin-left: 0;
    padding-left: 60px;
    padding-bottom: 30px;
  }
  .duration {
    padding-left: 20px;
  }
}
.duration {
  flex: 1;
  text-align: right;
  color: $text-light;
  font-family: $font-family-duration;
}
@include mq(small) {
  .accordion {
    box-shadow: none;
  }
  .report-accordion-item {
    order: 1;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    overflow-y: scroll;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0;
    width: auto;
  }
  .header {
    height: 65px;
  }
  .project {
    height: 65px;
  }
  .content li {
    height: 65px;
  }
}
@media (prefers-color-scheme: dark) {
  .content {
    background-color: $background-hover;
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
  .bar-chart-wrapper {
    height: 130px;
  }
  .content {
    padding: 0;
    margin: 0;
    flex-direction: column;
  }
  .doughnut-chart-wrapper {
    position: static;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 30px 0;
    order: 0;
    margin: 0;
    border: 0;
    box-shadow: none;
  }
  .accordion {
    order: 1;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    overflow-y: scroll;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0;
    width: auto;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
}
@media (prefers-color-scheme: dark) {
  .doughnut-chart-empty:before {
    border-color: $background-dark;
  }
}
</style>
