<template>
  <article class="report-accordion-item">
    <header class="project" @click="toggle">
      <icon
        :class="[
          'icon',
          { empty: !activityGroups[project.id] },
          { opened: opened }
        ]"
        name="chevron-right-icon"
      />
      <project-name :name="project.name" :color="project.color" />
      <time class="duration">
        {{ fromS(total, 'hh:mm:ss') }}
      </time>
      <delta-icon :current="total" :previous="previousTotal" />
    </header>
    <ul v-if="opened && activityGroups[project.id]" class="content">
      <li v-for="(group, index) in activityGroups[project.id]" :key="index">
        <project-name :color="project.color" :name="group.description" />
        <time class="duration">
          {{ fromS(group.duration, 'hh:mm:ss') }}
        </time>
      </li>
    </ul>
  </article>
</template>

<script>
import Icon from '@/components/atoms/icon';
import DeltaIcon from '@/components/molecules/delta-icon';
import ProjectName from '@/components/molecules/project-name';
import { fromS } from 'hh-mm-ss';

export default {
  components: {
    Icon,
    DeltaIcon,
    ProjectName
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    activityGroups: {
      type: Object,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    previousTotal: {
      type: Number,
      required: true
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fromS
    };
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.opened);
    },
    leave(el) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = '0';
      el.style.height = `${el.scrollHeight}px`;
    }
  }
};
</script>

<style scoped lang="scss">
.report-accordion-item {
  display: flex;
  flex-direction: column;
  border-top: 1px solid $border;
  &:first-child {
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
  padding: 0 20px;
  height: 58px;
}
.project .icon {
  margin-right: 20px;
  transition: transform 0.1s ease;
}
.project .icon.opened {
  transform: rotate(90deg);
}
.project .icon.empty {
  color: $text-lighter;
}
.content {
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style-type: none;
  box-shadow: 0 3px 5px $shadow inset;
  transition: all 0.15s ease;
  background-color: $grey-fdfdfd;
}
.content li {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid $border;
  height: 58px;
  padding-left: 60px;
  padding-right: 50px;
}
.duration {
  flex: 1;
  text-align: right;
  color: $text-light;
  font-family: $font-family-duration;
}
@include mq(small) {
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
  .content li {
    height: 65px;
  }
}
</style>
