<template>
  <div class="default" ontouchstart="">
    <nav-modal />
    <side-bar />
    <login-guard />
    <section class="content">
      <nuxt keep-alive />
      <toast />
      <client-only>
        <pwa-popover />
      </client-only>
    </section>
  </div>
</template>

<script>
import LoginGuard from '~/components/atoms/login-guard';
import Toast from '~/components/molecules/toast';
import PwaPopover from '~/components/organisms/pwa-popover';
import SideBar from '~/components/organisms/side-bar';
import NavModal from '~/components/organisms/nav-modal';
import ActivityEditor from '~/components/organisms/activity-editor';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';
import { differenceInSeconds, parseISO } from 'date-fns';

export default {
  timers: {
    updateDuration: {
      time: 500,
      autostart: true,
      repeat: true,
    },
  },
  components: {
    Toast,
    LoginGuard,
    NavModal,
    SideBar,
    PwaPopover,
  },
  props: {
    showSideMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ActivityEditor,
      duration: undefined,
    };
  },
  head() {
    return {
      titleTemplate: this.titleTemplate,
    };
  },
  computed: {
    ...mapGetters({
      working: 'activities/working',
    }),
    titleTemplate() {
      return this.duration && `${this.duration}・%s`;
    },
  },
  mounted() {
    this.$store.dispatch('projects/fetch');
    this.$store.dispatch('user/fetch');
  },
  methods: {
    updateDuration() {
      if (this.working) {
        const diff = differenceInSeconds(
          new Date(),
          parseISO(this.working.startedAt)
        );
        this.duration = fromS(diff);
      } else {
        this.duration = undefined;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: $side-bar-min-width;
}

@include mq(small) {
  .content {
    margin-left: 0;
    margin-top: $side-bar-min-height;
  }
}
</style>
