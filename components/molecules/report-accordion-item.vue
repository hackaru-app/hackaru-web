<template>
  <article class="report-accordion-item">
    <header class="project">
      <project-name :name="project.name" :color="project.color" />
      <time class="duration">
        {{ fromS(total, 'hh:mm:ss') }}
      </time>
      <delta-icon :current="total" :previous="previousTotal" />
    </header>
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
    }
  }
};
</script>

<style scoped lang="scss">
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
  padding-right: 25px;
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
.content {
  margin: 0;
  padding: 0;
  min-width: 1px;
  list-style-type: none;
  background-color: $grey-fdfdfd;
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
</style>
