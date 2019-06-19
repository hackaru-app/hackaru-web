<i18n src="@/assets/locales/components/organisms/activity.json" />

<template>
  <swipe-menu
    ref="menu"
    :class="['activity', { stopped: stoppedAt }]"
    :speed="swipeSpeed"
    @swipe-right="swipeRight"
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
        <span class="day">{{ day }}</span>
        <ticker
          :started-at="startedAt"
          :stopped-at="stoppedAt"
          class="duration"
        />
      </div>

      <nav>
        <base-button
          v-tooltip="{ content: $t('stop'), offset: -10 }"
          v-if="!stoppedAt"
          class="nav-button stop-button has-icon"
          @click="stopActivity"
        >
          <icon name="check-icon" class="is-primary" />
        </base-button>
        <base-button
          v-tooltip="{ content: $t('duplicate'), offset: -10 }"
          v-if="stoppedAt"
          class="nav-button has-icon"
          @click="duplicate"
        >
          <icon name="repeat-icon" class="nav-icon" />
        </base-button>
      </nav>
    </div>

    <template slot="right">
      <div v-if="stoppedAt" class="swipe-menu-item is-repeat">
        <icon name="repeat-icon" />
      </div>
      <div v-else class="swipe-menu-item is-primary">
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
import { differenceInDays } from 'date-fns';

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
      format,
      swipeSpeed: 300
    };
  },
  computed: {
    day() {
      const diff = differenceInDays(new Date(), this.startedAt);
      switch (diff) {
        case 0:
          return this.$t('today');
        case 1:
          return this.$t('yesterday');
        default:
          return this.$t('ago', { day: diff });
      }
    }
  },
  methods: {
    stopActivity() {
      this.$store.dispatch('toast/success', this.$t('archived'));
      this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${parse(Date.now())}`
      });
    },
    async duplicate() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.$store.dispatch('toast/success', this.$t('duplicated'));
      }
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
      this.$store.dispatch('toast/success', this.$t('deleted'));
    },
    swipeRight() {
      this.resetSwipeMenu();
      setTimeout(() => {
        if (this.stoppedAt) {
          this.duplicate();
        } else {
          this.stopActivity();
        }
      }, this.swipeSpeed + 50);
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
  border-bottom: 1px $border solid;
}
.list-item {
  display: flex;
  align-items: center;
  padding-right: 45px;
}
.project-name {
  width: 100%;
  min-width: 0;
}
.duration {
  padding-left: 15px;
  font-family: $font-family-duration;
}
.day {
  flex-shrink: 0;
  display: flex;
  margin-left: 10px;
}
.stopped .duration,
.stopped .day,
.stopped .project-name {
  opacity: 0.6;
}
.content {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  min-width: 0;
  transition: all 0.2s ease;
  padding: 23px 40px;
  padding-right: 20px;
  &:active {
    transform: scale(0.97);
  }
}
.nav-button {
  width: 60px;
}
.nav-icon {
  width: 18px;
  height: 18px;
}
.swipe-menu-item.is-repeat {
  background-color: #85b369;
  color: #fff;
}
@include mq(small) {
  .list-item {
    padding-right: 0;
  }
  .content {
    padding: 25px 30px;
  }
  .activity nav {
    display: none;
  }
}
</style>
