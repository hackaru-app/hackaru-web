<template>
  <article class="report-container">
    <div class="bar-chart-wrapper">
      <bar-chart :chart-data="barChartData" class="bar-chart" />
    </div>

    <div class="content">
      <div class="doughnut-chart-wrapper">
        <p v-if="isEmpty" class="doughnut-chart-empty">NO DATA</p>
        <doughnut-chart
          v-if="!isEmpty"
          :chart-data="doughnutChartData"
          class="doughnut-chart"
        />
      </div>
      <ul class="projects">
        <li v-for="project in projects" :key="project.id">
          <project-name :name="project.name" :color="project.color" />
          <time class="duration">
            {{ fromS(summary[project.id] || 0, 'hh:mm:ss') }}
          </time>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import ProjectName from '@/components/molecules/project-name';
import DoughnutChart from '@/components/atoms/doughnut-chart';
import BarChart from '@/components/atoms/bar-chart';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
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
    summary: {
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
    isEmpty() {
      return Object.keys(this.summary).length <= 0;
    }
  }
};
</script>

<style scoped lang="scss">
.report-container {
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
  color: $text-light;
  margin: 0;
}
.projects {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  width: 400px;
  justify-content: center;
  margin: 0;
  margin-left: 40px;
  li {
    display: flex;
    align-items: center;
    list-style-type: none;
    list-style-position: inside;
    padding: 5px 0;
  }
}
.duration {
  flex: 1;
  text-align: right;
  align-self: flex-end;
  color: $text-lighter;
  font-family: $font-family-duration;
}
@include mq(small) {
  .report-container {
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
    border-bottom: 1px $border solid;
  }
  .doughnut-chart-empty {
    margin-top: -10px;
    padding-bottom: 10px;
  }
  .projects {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    overflow-y: scroll;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0;
    padding: 35px 30px;
    width: auto;
  }
}
</style>
