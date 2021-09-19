<i18n src="~/assets/locales/components/organisms/report-content.json"></i18n>

<template>
  <section class="report-content-item">
    <section class="project" @click="toggleDetail">
      <icon
        :class="[
          'is-large',
          'arrow-icon',
          { opened: openedDetail },
          { empty: activityGroups.length <= 0 },
        ]"
        name="chevron-right-icon"
      />
      <project-name :name="project.name" :color="project.color" />
      <time class="duration">
        {{ fromS(total, 'hh:mm:ss') }}
      </time>
      <delta-icon :current="total" :previous="previousTotal" />
    </section>
    <section v-if="openedDetail" key="activityGroups">
      <article
        v-for="activityGroup in activityGroups"
        :key="activityGroup.description"
        class="actitivty-group"
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
  </section>
</template>

<script>
import DeltaIcon from '~/components/molecules/delta-icon';
import Icon from '~/components/atoms/icon';
import ProjectName from '~/components/molecules/project-name';
import ActivityName from '~/components/molecules/activity-name';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    DeltaIcon,
    ProjectName,
    ActivityName,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    previousTotal: {
      type: Number,
      required: true,
    },
    project: {
      type: Object,
      required: true,
    },
    activityGroups: {
      type: Array,
      default: () => [],
    },
    openedDetail: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fromS,
    };
  },
  methods: {
    toggleDetail() {
      this.$emit('toggle-detail');
      this.$mixpanel.track('Toggle detail', {
        component: 'report-content-item',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.project {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 65px;
  justify-content: space-between;
  min-width: 1px;
  overflow: hidden;
  padding-left: 18px;
  padding-right: 25px;
}
.actitivty-group {
  align-items: center;
  border-top: 1px $border solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 65px;
  justify-content: space-between;
  margin-left: 55px;
  min-width: 1px;
  overflow: hidden;
  padding-right: 55px;
}
.duration {
  color: $text-light;
  flex: 1;
  font-family: $font-family-duration;
  padding-left: 25px;
  text-align: right;
}
.arrow-icon {
  flex-shrink: 0;
  margin-right: 15px;
  transition: transform 0.1s ease;
  &.opened {
    transform: rotate(90deg);
  }
  &.empty {
    color: $text-lighter;
  }
}
</style>
