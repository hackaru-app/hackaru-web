<i18n src="@/assets/locales/components/organisms/activity.json" />

<template>
  <swipe-menu
    ref="menu"
    class="acitivty"
    @swipe-right="stopActivity"
    @swipe-left="deleteActivity"
  >
    <template slot="left">
      <div class="swipe-menu-item is-danger">
        <icon name="trash-icon" />
      </div>
    </template>

    <div class="list-item">
      <div class="activity-content" @click="showModal">
        <project-name v-bind="project" class="project-name" />
        <ticker
          :started-at="startedAt"
          :stopped-at="stoppedAt"
          class="duration"
        />
      </div>

      <nav>
        <base-button class="stop-button has-icon" @click="stopActivity">
          <!-- <icon name="check-icon" class="is-primary" /> -->
          <icon name="repeat-icon" class="repeat-icon" />
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
import { parse } from 'date-fns';
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
  methods: {
    stopActivity() {
      this.$toast.success(this.$t('archived'));
      this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${parse(Date.now())}`
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
.acitivty h1 {
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
.acitivty nav {
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
.repeat-icon {
  width: 18px;
  height: 18px;
}
@include mq(small) {
  .acitivty nav {
    display: none;
  }
  .list-item {
    padding: 0 30px;
    height: 70px;
  }
}
</style>
