<i18n src="@/assets/locales/components/organisms/activity.json" />

<template>
  <swipe-menu
    ref="menu"
    class="activity"
    @swipe-right="stopActivity"
    @swipe-left="deleteActivity"
  >
    <template slot="left">
      <div class="swipe-menu-item is-danger">
        <icon name="trash-icon" />
      </div>
    </template>

    <div class="list-item">
      <div class="content" @click="showModal">
        <project-name
          v-bind="project"
          :name="description || (project ? project.name : undefined)"
          class="project-name"
        />
      </div>
      <ticker
        :started-at="startedAt"
        :stopped-at="stoppedAt"
        :class="['duration', { stopped: stoppedAt }]"
      />

      <nav>
        <base-button
          v-if="!stoppedAt"
          class="nav-button has-icon"
          @click="stopActivity"
        >
          <icon name="check-icon" class="is-primary" />
        </base-button>
        <base-button v-if="stoppedAt" class="nav-button has-icon" @click="copy">
          <icon name="repeat-icon" class="nav-icon" />
        </base-button>
      </nav>
    </div>

    <template slot="right">
      <div class="swipe-menu-item is-primary">
        <icon name="check-icon" />
      </div>
    </template>
  </swipe-menu>
</template>

<script>
import { parse, format } from 'date-fns';
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import ProjectName from '@/components/molecules/project-name';
import SwipeMenu from '@/components/molecules/swipe-menu';
import Ticker from '@/components/atoms/ticker';

export default {
  components: {
    Icon,
    BaseButton,
    Ticker,
    SwipeMenu,
    ProjectName
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    },
    stoppedAt: {
      type: String,
      default: undefined
    },
    project: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      format
    };
  },
  methods: {
    stopActivity() {
      this.$toast.success(this.$t('archived'));
      this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${parse(Date.now())}`
      });
    },
    copy() {
      this.$modal.show('activity', {
        description: this.description,
        project: this.project || undefined
      });
    },
    resetSwipeMenu() {
      this.$refs.menu.reset();
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) {
        this.resetSwipeMenu();
        return;
      }
      this.$store.dispatch('activities/delete', this.id);
      this.$toast.success(this.$t('deleted'));
    },
    showModal(params) {
      this.$modal.show('activity', {
        id: this.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        project: this.project || undefined
      });
    }
  }
};
</script>

<style scoped lang="scss">
.activity {
  margin-bottom: 10px;
  border: 1px $border solid;
  border-radius: 5px;
  box-shadow: 0 2px 3px #00000008;
}
.list-item {
  display: flex;
  align-items: center;
  padding-right: 25px;
}
.content {
  flex: 1;
  cursor: pointer;
  display: flex;
  transition: all 0.2s ease;
  padding: 20px 25px;
  &:hover {
    padding-left: 30px;
  }
  &:active {
    transform: scale(0.97);
  }
}
.duration {
  margin-right: 20px;
  font-family: $font-family-duration;
}
.nav-button {
  width: 60px;
}
.nav-icon {
  width: 18px;
  height: 18px;
}
.stopped {
  color: $text-light;
}
@include mq(small) {
  .activity {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
  .content {
    padding: 26px 30px;
  }
  .stopped {
    color: $text-lighter;
  }
  .duration {
    margin-right: 0;
  }
  .activity nav {
    display: none;
  }
}
</style>
