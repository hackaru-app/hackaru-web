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
      <delta class="delta" :current="total" :previous="previousTotal" />
      <time :class="['duration', { zero: total === 0 }]">
        {{ fromS(total, 'hh:mm:ss') }}
      </time>
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
        <time :class="['duration', { zero: activityGroup.duration === 0 }]">
          {{ fromS(activityGroup.duration, 'hh:mm:ss') }}
        </time>
      </article>
    </section>
  </section>
</template>

<script>
import Delta from '~/components/molecules/delta';
import Icon from '~/components/atoms/icon';
import ProjectName from '~/components/molecules/project-name';
import ActivityName from '~/components/molecules/activity-name';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    Delta,
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
  padding-left: 20px;
  padding-right: 25px;
}

.actitivty-group {
  align-items: center;
  border-top: 1px $border-dark solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 65px;
  justify-content: space-between;
  margin-left: 52px;
  min-width: 1px;
  overflow: hidden;
  padding-right: 25px;
}

.delta {
  flex: 1;
  justify-content: flex-end;
}

.duration {
  color: $text;
  font-family: $font-family-duration;
  padding-left: 15px;
  text-align: right;

  &.zero {
    color: $text-light;
  }
}

.arrow-icon {
  flex-shrink: 0;
  margin-right: 5px;
  transition: transform 0.1s ease;

  &.opened {
    transform: rotate(90deg);
  }

  &.empty {
    color: $text-lighter;
  }
}

@include mq(small) {
  .actitivty-group {
    border-top: 1px $border solid;
    margin-left: 27px;
  }
}
</style>
