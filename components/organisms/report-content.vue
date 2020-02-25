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
      <div class="projects">
        <article v-for="project in projects" :key="project.id" class="project">
          <header class="project-header">
            <icon name="chevron-down-icon" class="icon" />
            <project-name :name="project.name" :color="project.color" />
            <time class="duration">
              {{ fromS(totals[project.id], 'hh:mm:ss') }}
            </time>
            <delta-icon
              :current="totals[project.id]"
              :previous="previousTotals[project.id]"
            />
          </header>
          <ul>
            <li>
              <project-name :color="project.color" name="テスト" />
              <time class="duration">
                {{ fromS(3600, 'hh:mm:ss') }}
              </time>
              <delta-icon
                :current="totals[project.id]"
                :previous="previousTotals[project.id]"
              />
            </li>
            <li>
              <project-name :color="project.color" name="テスト" />
              <time class="duration">
                {{ fromS(3600, 'hh:mm:ss') }}
              </time>
              <delta-icon
                :current="totals[project.id]"
                :previous="previousTotals[project.id]"
              />
            </li>
          </ul>
        </article>
      </div>
      <div class="doughnut-chart-wrapper">
        <p v-if="empty" class="doughnut-chart-empty" />
        <doughnut-chart
          v-if="!empty"
          :chart-data="doughnutChartData"
          class="doughnut-chart"
        />
      </div>
    </div>
  </article>
</template>

<script>
import Icon from '@/components/atoms/icon';
import DeltaIcon from '@/components/molecules/delta-icon';
import ColorScheme from '@/components/atoms/color-scheme';
import ProjectName from '@/components/molecules/project-name';
import DoughnutChart from '@/components/atoms/doughnut-chart';
import BarChart from '@/components/atoms/bar-chart';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    DeltaIcon,
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
  }
};
</script>

<style scoped lang="scss">
.report-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
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
  margin: 0 20px;
}
.doughnut-chart,
.doughnut-chart-empty {
  display: flex;
  width: 160px;
  height: 160px;
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
.projects {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin: 0;
  margin-right: 50px;
  box-shadow: 0 3px 5px $shadow;
  border: 1px $border solid;
  border-radius: 3px;
}
.project {
  display: flex;
  flex-direction: column;
  border-top: 1px solid $border;
  &:first-child {
    border: 0;
  }
}
.project-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  list-style-position: inside;
  justify-content: center;
  padding: 0 20px;
  height: 60px;
  .icon {
    margin-right: 20px;
  }
}
.project ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-shadow: 0 3px 5px $shadow inset;
}
.project li {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid $border;
  height: 60px;
  padding-left: 60px;
  padding-right: 20px;
}
.duration {
  flex: 1;
  text-align: right;
  color: $text-light;
  font-family: $font-family-duration;
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
    display: flex;
    justify-content: center;
    padding: 30px 0;
    order: 0;
  }
  .projects {
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
  .project-header {
    height: 65px;
  }
  .project li {
    height: 65px;
  }
}
@media (prefers-color-scheme: dark) {
  .doughnut-chart-empty:before {
    border-color: $background-dark;
  }
}
</style>
