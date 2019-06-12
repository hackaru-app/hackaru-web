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
      <!-- <div class="date">
        <span class="day">{{ format(startedAt, 'HH:mm') }}</span>
      </div> -->
      <div class="activity-content" @click="showModal">
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
  // margin-top: 30px;
  margin-bottom: 10px;
  border: 1px $grey-eee solid;
  // margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 3px #00000008;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 20px 25px;
}
.activity-content {
  flex: 1;
  transition: all 0.2s ease;
  &:active {
    transform: scale(0.97);
  }
}
.duration {
  margin-right: 20px;
}
.nav-icon {
  width: 18px;
  height: 18px;
}
.stopped {
  color: $text-lighter;
}

@include mq(small) {
  .activity {
    margin-bottom: 0;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .list-item {
    padding: 25px 30px;
    padding-left: 31px;
  }
  .duration {
    margin-right: 0;
  }
  .activity nav {
    display: none;
  }
}
// .activity-content {
//   cursor: pointer;
//   transition: all 0.2s ease;
//   height: 100%;
//   min-width: 0;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   &:active {
//     transform: scale(0.97);
//   }
// }
// .project-name {
//   // max-width: 200px
//   max-width: 100%;
//   min-width: 1px;
//   width: 100%;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// }
// .activity nav {
//   display: flex;
//   margin-left: 30px;
// }
// .duration {
//   display: flex;
//   font-family: $font-family-duration;
//   flex-shrink: 0;
// }
// .duration.stopped {
// }
// .list-item {
//   padding: 0 40px;
//   padding-left: 30px;
//   height: 70px;
//   width: 100%;
//   box-sizing: border-box;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px $border solid;
//   overflow: hidden;
//   background-color: #fff;
//   .activity-content {
//     position: relative;
//   }
//   &:hover {
//     background: $grey-fdfdfd;
//   }
// }
// .date {
//   display: flex;
//   flex-direction: column;
//   line-height: 1;
//   width: 100px;
//   // margin-right: 25px;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
//   // border-right: 1px $border solid;
// }
// .date .day {
//   font-size: 14px;
// }
// .date .week {
//   font-size: 11px;
//   width: 35px;
//   display: flex;
//   justify-content: center;
//   color: $text-light;
//   margin-top: 3px;
// }
// .nav-icon {
//   width: 18px;
//   height: 18px;
//   margin-left: 3px;
// }
// @include mq(small) {
//   .date {
//     display: none;
//   }
//   .activity nav {
//     display: none;
//   }
//   .list-item {
//     height: 70px;
//     padding-left: 30px;
//     padding-right: 30px;
//   }
// }
</style>
