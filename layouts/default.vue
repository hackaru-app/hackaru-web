<template>
  <div class="default" ontouchstart="">
    <nav-modal
      :initial-component="ActivityEditor"
      :keep-alives="['ActivityEditor']"
      height="450"
      name="activity"
    />
    <side-bar />
    <login-guard class="content">
      <nuxt />
      <pwa-balloon />
    </login-guard>
  </div>
</template>

<script>
import LoginGuard from '@/components/atoms/login-guard';
import PwaBalloon from '@/components/organisms/pwa-balloon';
import SideBar from '@/components/organisms/side-bar';
import NavModal from '@/components/organisms/nav-modal';
import ActivityEditor from '@/components/organisms/activity-editor';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';
import { differenceInSeconds, parse } from 'date-fns';

export default {
  timers: {
    updateDuration: {
      time: 500,
      autostart: true,
      repeat: true
    }
  },
  components: {
    LoginGuard,
    NavModal,
    SideBar,
    PwaBalloon
  },
  head() {
    return {
      titleTemplate: this.titleTemplate
    };
  },
  props: {
    showSideMenu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ActivityEditor,
      duration: undefined
    };
  },
  computed: {
    ...mapGetters({
      activities: 'activities/workings'
    }),
    titleTemplate() {
      return this.duration && `${this.duration}・%s`;
    }
  },
  mounted() {
    this.$store.dispatch('projects/fetch');
  },
  methods: {
    updateDuration() {
      this.duration =
        this.activities.length > 0
          ? fromS(
              differenceInSeconds(
                parse(Date.now()),
                this.activities[0].startedAt
              )
            )
          : undefined;
    }
  }
};
</script>

<style scoped lang="scss">
.default {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: $background;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
