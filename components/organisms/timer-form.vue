<i18n src="~/assets/locales/components/organisms/timer-form.json"></i18n>

<template>
  <section class="timer-form">
    <form data-test-id="form" class="form" @submit.prevent="submit">
      <div class="form-content">
        <coach-tooltip
          :content="$t('selectProject')"
          placement="bottom"
          name="selectProject"
        >
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
        </coach-tooltip>
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
          v-if="!working"
          v-tooltip="$t('start')"
          type="submit"
          class="is-primary control-button start"
        >
          <icon name="play-icon" />
        </base-button>
        <base-button
          v-else
          v-tooltip="$t('stop')"
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
import ProjectList from '~/components/organisms/project-list';
import ProjectName from '~/components/molecules/project-name';
import SuggestionList from '~/components/organisms/suggestion-list';
import Ticker from '~/components/atoms/ticker';
import BaseButton from '~/components/atoms/base-button';
import Icon from '~/components/atoms/icon';
import Dot from '~/components/atoms/dot';
import CoachTooltip from '~/components/atoms/coach-tooltip';
import { mapGetters } from 'vuex';
import { formatISO, parseISO, differenceInSeconds } from 'date-fns';

function getRandI18n(t) {
  if (!t) return;
  const max = Object.values(t).length;
  return t[Math.floor(Math.random() * max)];
}

export default {
  components: {
    CoachTooltip,
    Dot,
    Ticker,
    ProjectName,
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
      if (this.id) {
        this.updateActivity();
        this.$mixpanel.track('Select project', {
          component: 'timer-form',
        });
      }
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
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
      const success = await this.$store.dispatch('activities/update', {
        id: this.id,
        description: this.description,
        projectId: this.project?.id,
      });
      this.$mixpanel.track('Update activity', {
        component: 'timer-form',
        startedAt: this.startedAt,
        projectId: this.project?.id,
        descriptionLength: this.description.length,
      });
      if (success) {
        this.syncProps();
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    async stopActivity() {
      const stoppedAt = new Date();

      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'stop',
      });
      this.$mixpanel.track('Stop activity', {
        component: 'timer-form',
        startedAt: this.startedAt,
        projectId: this.project?.id,
        descriptionLength: this.description.length,
        stoppedAt: formatISO(stoppedAt),
        duration: differenceInSeconds(stoppedAt, parseISO(this.startedAt)),
      });
      this.$store.dispatch('toast/success', getRandI18n(this.$t('stopped')));
      await this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${stoppedAt}`,
      });
      this.syncProps();
    },
    async startActivity() {
      const startedAt = new Date();

      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'start',
      });
      this.$mixpanel.track('Start activity', {
        component: 'timer-form',
        startedAt: formatISO(startedAt),
        projectId: this.project?.id,
        descriptionLength: this.description.length,
      });
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project?.id,
        startedAt: `${startedAt}`,
      });
      if (success) {
        this.syncProps();
        this.$store.dispatch('toast/success', this.$t('started'));
      }
    },
    showModal() {
      this.$mixpanel.track('Show project modal', {
        component: 'timer-form',
      });
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
      this.$mixpanel.track('Click suggestion', { component: 'timer-form' });
      this.description = suggestion.description;
      this.project = suggestion.project;
      this.startActivity();
    },
  },
};
</script>

<style scoped lang="scss">
.timer-form {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 91px;
  justify-content: center;
  left: $side-bar-min-width;
  max-width: calc(100vw - #{$side-bar-min-width});
  position: fixed;
  z-index: index($z, timer-form);
}
.duration.stopped {
  color: $text-light;
}
.base-button.control-button {
  align-self: center;
  border-radius: 50%;
  box-shadow: 0 3px 3px $shadow-dark;
  display: flex;
  flex-shrink: 0;
  height: 50px;
  margin-right: 40px;
  padding: 0;
  pointer-events: auto;
  width: 50px;
}
.base-button.control-button .icon {
  height: 22px;
  width: 22px;
}
.base-button.control-button.start .icon {
  padding-left: 3px;
}
.form {
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}
.form .duration {
  align-self: center;
  font-family: $font-family-duration;
  font-size: 18px;
  line-height: 1;
  margin-right: 30px;
}
.form .duration.show {
  display: block;
}
.form-content {
  background-color: $background-translucent;
  border-bottom: 1px $border-dark solid;
  border-right: 0;
  box-shadow: 0 3px 3px $shadow;
  display: flex;
  flex: 1;
  z-index: 1;
}
.project-wrapper {
  align-items: center;
  border-right: 1px $border-dark solid;
  cursor: pointer;
  display: flex;
  min-height: 100%;
}
.selected-project {
  align-items: center;
  display: flex;
  max-width: 210px;
  padding: 0 45px;
}
.description {
  background: none;
  border: 0;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  line-height: 1;
  overflow: hidden;
  padding: 0 40px;
  text-overflow: ellipsis;
  width: 100%;
}
.dot-only {
  display: none;
}

@include mq(small) {
  .timer-form {
    left: 0;
    max-width: 100vw;
  }
  .form {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 17px;
    height: auto;
    justify-content: flex-start;
    margin: 0;
    margin-top: 15px;
    max-width: 100%;
    padding: 0 30px;
    width: 100%;
  }
  .description::placeholder {
    padding-top: 3px;
  }
  .project-wrapper {
    display: flex;
    height: 100%;
    justify-content: center;
    min-width: 80px;
  }
  .project-wrapper .selected-project {
    display: none;
  }
  .dot-only {
    display: flex;
  }
  .form-content {
    border: 0;
    border-bottom: 1px $border-dark solid;
    border-radius: 0;
    box-shadow: 0 3px 3px $shadow;
    box-sizing: border-box;
    height: 80px;
    left: 0;
    order: 1;
    position: fixed;
    top: $side-bar-min-height;
    width: 100%;
  }
  .base-button.control-button {
    height: 48px;
    margin-right: 16px;
    width: 48px;
  }
  .base-button.control-button .icon {
    height: 20px;
    width: 20px;
  }
  .base-button.control-button.start .icon {
    padding-left: 3px;
  }
  .description {
    margin: 0;
    min-width: 1px;
    padding: 0 25px;
  }
  .form .duration {
    display: none;
    margin-right: 25px;
  }
}
</style>
