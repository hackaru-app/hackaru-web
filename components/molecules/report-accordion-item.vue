<template>
  <article class="report-accordion-item">
    <header class="project" @click="toggle">
      <icon :class="['icon', { opened: opened }]" name="chevron-right-icon" />
      <project-name :name="project.name" :color="project.color" />
      <time class="duration">
        {{ fromS(total, 'hh:mm:ss') }}
      </time>
      <delta-icon :current="total" :previous="previousTotal" />
    </header>
    <transition @enter="enter" @leave="leave">
      <ul v-if="opened" class="content">
        <li>
          <project-name :color="project.color" name="テスト" />
          <time class="duration">
            {{ fromS(3600, 'hh:mm:ss') }}
          </time>
          <delta-icon :current="total" :previous="previousTotal" />
        </li>
        <li>
          <project-name :color="project.color" name="テスト" />
          <time class="duration">
            {{ fromS(3600, 'hh:mm:ss') }}
          </time>
          <delta-icon :current="total" :previous="previousTotal" />
        </li>
      </ul>
    </transition>
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
    }
  },
  data() {
    return {
      fromS,
      opened: false
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
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
  padding-right: 20px;
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
