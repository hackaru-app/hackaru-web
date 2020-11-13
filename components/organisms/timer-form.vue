<i18n src="@/assets/locales/components/organisms/timer-form.json"></i18n>

<template>
  <section class="timer-form">
    <form data-test-id="form" class="form" @submit.prevent="submit">
      <div class="form-content">
        <div
          data-test-id="project-wrapper"
          class="project-wrapper"
          @click="showModal"
        >
          <project-name v-bind="project" class="selected-project" />
          <dot
            :color="project ? project.color : '#ccc'"
            class="dot-only is-medium"
          />
        </div>
        <input
          v-model="description"
          :placeholder="$t('description')"
          data-test-id="description"
          type="text"
          class="description"
          @focus="focus"
          @blur="blur"
          @change="change"
          @keypress.enter.prevent="enterDescription"
        />
        <transition name="fade">
          <ticker
            :started-at="startedAt"
            :class="['duration', { show: !focused && id }]"
          />
        </transition>
        <base-button
          v-tooltip="$t('start')"
          v-if="!working"
          type="submit"
          class="is-primary control-button start"
        >
          <icon name="play-icon" />
        </base-button>
        <base-button
          v-tooltip="$t('stop')"
          v-else
          type="submit"
          class="is-danger control-button stop"
        >
          <icon name="square-icon" />
        </base-button>
      </div>
      <suggestion-list
        :shown="focused && !working"
        :description="description"
        data-test-id="suggestion-list"
        @click="clickSuggestion"
      />
    </form>
  </section>
</template>

<script>
import NavModal from '@/components/organisms/nav-modal';
import ProjectList from '@/components/organisms/project-list';
import ProjectName from '@/components/molecules/project-name';
import ActivityName from '@/components/molecules/activity-name';
import SuggestionList from '@/components/organisms/suggestion-list';
import Ticker from '@/components/atoms/ticker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Dot from '@/components/atoms/dot';
import { mapGetters } from 'vuex';

function getRandI18n(t) {
  if (!t) return;
  const max = Object.values(t).length;
  return t[Math.floor(Math.random() * max)];
}

export default {
  components: {
    Dot,
    NavModal,
    Ticker,
    ProjectName,
    ActivityName,
    Icon,
    BaseButton,
    SuggestionList,
  },
  data() {
    return {
      ProjectList,
      id: undefined,
      description: '',
      project: undefined,
      startedAt: undefined,
      focused: false,
    };
  },
  computed: {
    ...mapGetters({
      workingActivity: 'activities/working',
    }),
    working() {
      return !!this.id;
    },
  },
  watch: {
    workingActivity() {
      this.syncProps();
    },
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorking');
  },
  methods: {
    syncProps() {
      const props = this.workingActivity || {};
      this.id = props.id;
      this.startedAt = props.startedAt;
      this.project = props.project;
      this.description = props.description || '';
    },
    selectProject({ project }) {
      this.project = project;
      if (this.id) this.updateActivity();
    },
    submit() {
      if (this.working) {
        this.stopActivity();
      } else {
        this.startActivity();
      }
    },
    enterDescription() {
      if (this.working) {
        this.updateActivity();
      } else {
        this.startActivity();
      }
    },
    async updateActivity() {
      const success = await this.$store.dispatch('activities/update', {
        id: this.id,
        description: this.description,
        projectId: this.project && this.project.id,
      });
      if (success) {
        this.syncProps();
        this.$store.dispatch('toast/success', this.$t('updated'));
        this.$gtm.push({
          eventCategory: 'Activities',
          eventAction: 'update',
          name: 'update_activity',
          component: 'timer_form',
        });
      }
    },
    async stopActivity() {
      this.$store.dispatch('toast/success', getRandI18n(this.$t('stopped')));
      await this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${new Date()}`,
      });
      this.$gtm.push({
        eventCategory: 'Activities',
        eventAction: 'stop',
        name: 'stop_activity',
        component: 'timer_form',
      });
      this.syncProps();
    },
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`,
      });
      if (success) {
        this.syncProps();
        this.$store.dispatch('toast/success', this.$t('started'));
        this.$gtm.push({
          eventCategory: 'Activities',
          eventAction: 'start',
          name: 'start_activity',
          component: 'timer_form',
        });
      }
    },
    showModal() {
      this.$nuxt.$emit('show-modal', {
        component: ProjectList,
        callback: this.selectProject,
      });
    },
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
    change() {
      if (this.working) {
        this.updateActivity();
      }
    },
    clickSuggestion(suggestion) {
      this.description = suggestion.description;
      this.project = suggestion.project;
      this.startActivity();
    },
  },
};
</script>

<style scoped lang="scss">
.timer-form {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - #{$side-bar-min-width});
  z-index: index($z, timer-form);
  height: 91px;
  left: $side-bar-min-width;
}
.duration.stopped {
  color: $text-light;
}
.base-button.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 40px;
  pointer-events: auto;
  border-radius: 50%;
  box-shadow: 0 3px 3px $shadow-dark;
}
.base-button.control-button .icon {
  width: 22px;
  height: 22px;
}
.base-button.control-button.start .icon {
  padding-left: 3px;
}
.form {
  width: 100%;
  justify-content: center;
  height: 100%;
  display: flex;
  border-radius: 5px;
  box-sizing: border-box;
}
.form .duration {
  font-size: 18px;
  align-self: center;
  line-height: 1;
  margin-right: 30px;
  font-family: $font-family-duration;
}
.form .duration.show {
  display: block;
}
.form-content {
  z-index: 1;
  display: flex;
  flex: 1;
  border-bottom: 1px $border-dark solid;
  border-right: 0;
  box-shadow: 0 3px 3px $shadow;
  background-color: $background-translucent;
}
.project-wrapper {
  display: flex;
  align-items: center;
  min-height: 100%;
  border-right: 1px $border-dark solid;
  cursor: pointer;
}
.selected-project {
  display: flex;
  max-width: 120px;
  padding: 0 45px;
  align-items: center;
}
.description {
  line-height: 1;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  background: none;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dot-only {
  display: none;
}
@include mq(small) {
  .timer-form {
    max-width: 100vw;
    left: 0;
  }
  .form {
    height: auto;
    padding: 0;
    justify-content: flex-start;
    margin: 0;
    margin-top: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 30px;
    max-width: 100%;
    font-size: 17px;
  }
  .description::placeholder {
    padding-top: 3px;
  }
  .project-wrapper {
    display: flex;
    justify-content: center;
    min-width: 80px;
    height: 100%;
  }
  .project-wrapper .selected-project {
    display: none;
  }
  .dot-only {
    display: flex;
  }
  .form-content {
    order: 1;
    position: fixed;
    left: 0;
    top: $side-bar-min-height;
    border-radius: 0;
    width: 100%;
    border: 0;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px $border-dark solid;
    box-shadow: 0 3px 3px $shadow;
  }
  .base-button.control-button {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
  .base-button.control-button.start .icon {
    padding-left: 3px;
  }
  .base-button.control-button .icon {
    width: 20px;
    height: 20px;
  }
  .description {
    margin: 0;
    padding: 0 25px;
    min-width: 1px;
  }
  .form .duration {
    margin-right: 25px;
    display: none;
  }
}
</style>
