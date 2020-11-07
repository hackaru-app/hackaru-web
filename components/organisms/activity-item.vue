<i18n src="@/assets/locales/components/organisms/activity-item.json"></i18n>

<template>
  <swipe-menu
    ref="swipeMenu"
    @swipe-left="deleteActivity"
    @swipe-right="duplicateActivity"
  >
    <template slot="left">
      <div class="swipe-menu-item is-danger">
        <icon name="trash-icon" />
      </div>
    </template>
    <section class="activity" @click="showModal">
      <div class="content">
        <activity-name :project="project" :description="description" />
      </div>
      <ticker
        :started-at="startedAt"
        :stopped-at="stoppedAt"
        :class="['duration', { stopped: stoppedAt }]"
      />
      <base-button
        v-tooltip="$t('duplicate')"
        class="duplicate-button"
        @click.stop="duplicateActivity"
      >
        <icon name="repeat-icon" class="is-midium" />
      </base-button>
    </section>
    <template slot="right">
      <div class="swipe-menu-item is-duplicate">
        <icon name="repeat-icon" />
      </div>
    </template>
  </swipe-menu>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ActivityName from '@/components/molecules/activity-name';
import Ticker from '@/components/atoms/ticker';
import SwipeMenu from '@/components/molecules/swipe-menu';
import ActivityEditor from '@/components/organisms/activity-editor';

export default {
  components: {
    BaseButton,
    SwipeMenu,
    Icon,
    ActivityName,
    Ticker,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    startedAt: {
      type: String,
      required: true,
    },
    stoppedAt: {
      type: String,
      default: undefined,
    },
    project: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    showModal(params) {
      this.$nuxt.$emit('show-modal', {
        component: ActivityEditor,
        params: {
          id: this.id,
          description: this.description,
          startedAt: this.startedAt,
          stoppedAt: this.stoppedAt,
          project: this.project || undefined,
        },
      });
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) {
        this.$refs.swipeMenu.reset();
        return;
      }
      this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.$gtm.trackEvent({
        eventCategory: 'Activities',
        eventAction: 'delete',
        name: 'delete_activity',
        component: 'activity_item',
      });
    },
    async duplicateActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`,
      });
      this.$gtm.trackEvent({
        eventCategory: 'Activities',
        eventAction: 'duplicate',
        name: 'duplicate_activity',
        component: 'activity_item',
      });
      if (success) {
        this.$refs.swipeMenu.reset();
        this.$store.dispatch('toast/success', this.$t('duplicated'));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.activity {
  border-top: 1px $border solid;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 45px;
  padding-right: 40px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: $background-hover;
  }
}
.duration {
  font-family: $font-family-duration;
}
.duration.stopped {
  color: $text-light;
}
.content {
  align-items: center;
  min-width: 1px;
  justify-content: space-between;
  display: flex;
  flex: 1;
  padding-right: 20px;
  height: 100%;
}
.duplicate-button {
  height: 100%;
  border-radius: 0;
  margin-left: 10px;
}
.is-duplicate {
  background-color: $green;
  color: $white;
}
@include mq(small) {
  .activity {
    padding: 0 30px;
    padding-left: 35px;
    height: 75px;
  }
  .duplicate-button {
    display: none;
  }
}
</style>
