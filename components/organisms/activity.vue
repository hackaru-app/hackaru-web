<i18n src="@/assets/locales/components/organisms/activity.json" />

<template>
  <swipe-menu
    ref="menu"
    @swipe-right="stopActivity"
    @swipe-left="deleteActivity"
  >
    <template slot="left">
      <div class="swipe-menu-item is-danger">
        <icon name="trash-icon" />
      </div>
    </template>

    <div class="list-item">
      <div
        class="activity-content"
        @mousedown.stop
        @mouseup.stop
        @click="showModal"
      >
        <project-name v-bind="project" class="project-name" />
        <ticker
          :started-at="startedAt"
          :stopped-at="stoppedAt"
          class="duration"
        />
      </div>

      <nav>
        <btn
          :aria-label="$t('ariaLabels.stop')"
          class="stop-button has-icon"
          @click="stopActivity"
        >
          <icon name="check-icon" class="is-primary" />
        </btn>
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
import { parse } from 'date-fns';
import Icon from '@/components/atoms/icon';
import Btn from '@/components/atoms/btn';
import ProjectName from '@/components/molecules/project-name';
import SwipeMenu from '@/components/molecules/swipe-menu';
import Ticker from '@/components/atoms/ticker';

export default {
  components: {
    Icon,
    Btn,
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
      default: () => undefined
    }
  },
  methods: {
    stopActivity() {
      this.$toast.success(this.$t('archived'));
      this.$store.dispatch('activities/updateActivity', {
        id: this.id,
        stoppedAt: `${parse(Date.now())}`
      });
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) {
        this.$refs.menu.reset();
        return;
      }
      this.$store.dispatch('activities/deleteActivity', this.id);
      this.$toast.success(this.$t('deleted'));
    },
    showModal(params) {
      this.$modal.show('activity', {
        id: this.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        duration: this.duration,
        project: this.project
      });
    }
  }
};
</script>

<style scoped lang="scss">
.activity-content {
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 0;
  &:active {
    transform: scale(0.97);
  }
}
.project-name {
  flex-shrink: 0;
  padding-right: 40px;
}
h1 {
  font-size: $font-size;
  font-weight: normal;
  flex: 1;
  border: 0;
  margin: 0;
  padding: 0 20px;
  background: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 1px;
}
nav {
  display: flex;
  margin-left: 30px;
}
.duration {
  color: $text-light;
  font-family: $font-family-duration;
}
.list-item {
  padding: 0 40px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  background-color: #fff;
  &:hover {
    background: $grey-fdfdfd;
  }
}
@include mq(small) {
  nav {
    display: none;
  }
  .list-item {
    padding: 0 30px;
    height: 70px;
  }
}
</style>
