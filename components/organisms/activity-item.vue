<i18n src="~/assets/locales/components/organisms/activity-item.json"></i18n>

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
      <icon-button
        v-tooltip="$t('duplicate')"
        class="duplicate-button"
        @click.stop="duplicateActivity"
      >
        <icon name="repeat-icon" class="is-medium" />
      </icon-button>
    </section>
    <template slot="right">
      <div class="swipe-menu-item is-duplicate">
        <icon name="repeat-icon" />
      </div>
    </template>
  </swipe-menu>
</template>

<script>
import IconButton from '~/components/atoms/icon-button';
import Icon from '~/components/atoms/icon';
import ActivityName from '~/components/molecules/activity-name';
import Ticker from '~/components/atoms/ticker';
import SwipeMenu from '~/components/molecules/swipe-menu';
import ActivityEditor from '~/components/organisms/activity-editor';
import { formatISO } from 'date-fns';

export default {
  components: {
    IconButton,
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
    showModal() {
      this.$mixpanel.track('Show activity modal', {
        component: 'activity-item',
      });
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
      this.$mixpanel.track('Delete activity', {
        component: 'activity-item',
        descriptionLength: this.description.length,
        projectId: this.project?.id,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        duration: this.duration,
      });
      this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'delete',
      });
    },
    async duplicateActivity() {
      const startedAt = new Date();
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project?.id,
        startedAt: `${startedAt}`,
      });
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'duplicate',
      });
      this.$mixpanel.track('Duplicate activity', {
        component: 'activity-item',
        descriptionLength: this.description.length,
        projectId: this.project?.id,
        startedAt: formatISO(startedAt),
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
  align-items: center;
  border-top: 1px $border solid;
  cursor: pointer;
  display: flex;
  height: 68px;
  padding: 0 45px;
  padding-right: 40px;
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
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  min-width: 1px;
  padding-right: 20px;
}
.duplicate-button {
  border-radius: 0;
  height: 100%;
  margin-left: 25px;
  margin-right: 15px;
}
.is-duplicate {
  background-color: $green;
  color: $white;
}

@include mq(small) {
  .activity {
    height: 75px;
    padding: 0 30px;
    padding-left: 35px;
  }
  .duplicate-button {
    display: none;
  }
}
</style>
