<i18n src="@/assets/locales/components/organisms/timer-form.json" />

<template>
  <section class="timer-form">
    <nav-modal
      :initial-component="ProjectList"
      height="450"
      class="nav-modal"
      name="project-list"
      @close="selectProject"
    />
    <form class="form" @submit.prevent="submit">
      <div class="form-content">
        <coach-tooltip
          :content="$t('selectProject')"
          name="select-project"
          placement="bottom"
        >
          <div class="project-wrapper" @click="showModal">
            <project-name v-bind="project" class="selected-project" />
            <dot
              :color="project ? project.color : '#ccc'"
              class="dot-only is-medium"
            />
          </div>
        </coach-tooltip>
        <input
          :value="description"
          :placeholder="$t('description')"
          type="text"
          class="description"
          @focus="focus"
          @blur="blur"
          @input="input"
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
          v-if="!id"
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
      <transition>
        <div
          v-if="focused && !id && suggests.length > 0"
          class="suggest-list-wrapper"
        >
          <div class="suggest-list">
            <ul>
              <li
                v-for="activity in suggests"
                :key="activity.id"
                class="suggest-item"
                @click="clickSuggest(activity)"
              >
                <project-name
                  v-bind="activity.project"
                  :name="activity.description"
                />
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </form>
  </section>
</template>

<script>
import NavModal from '@/components/organisms/nav-modal';
import ProjectList from '@/components/organisms/project-list';
import ProjectName from '@/components/molecules/project-name';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import Ticker from '@/components/atoms/ticker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Dot from '@/components/atoms/dot';
import { mapGetters } from 'vuex';
import debounce from 'lodash.debounce';

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
    CoachTooltip,
    ProjectName,
    Icon,
    BaseButton
  },
  data() {
    return {
      ProjectList,
      id: undefined,
      description: '',
      project: undefined,
      startedAt: undefined,
      focused: false
    };
  },
  computed: {
    ...mapGetters({
      working: 'activities/working'
    }),
    suggests() {
      return this.$store.getters['suggestions/all'];
    }
  },
  watch: {
    working() {
      this.setWorkingProps();
    }
  },
  async mounted() {
    await this.$store.dispatch('activities/fetchWorking');
  },
  methods: {
    setWorkingProps() {
      const props = this.working || {};
      this.id = props.id;
      this.startedAt = props.startedAt;
      this.project = props.project;
      this.description = props.description;
    },
    selectProject({ project }) {
      this.project = project;
      if (this.id) this.updateActivity();
    },
    submit() {
      (this.id ? this.stopActivity : this.startActivity)();
    },
    enterDescription() {
      (this.id ? this.updateActivity : this.startActivity)();
    },
    async updateActivity() {
      const success = await this.$store.dispatch('activities/update', {
        id: this.id,
        description: this.description,
        projectId: this.project && this.project.id
      });
      if (success) {
        this.setWorkingProps();
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    async stopActivity() {
      this.$store.dispatch('toast/success', getRandI18n(this.$t('stopped')));
      await this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${new Date()}`
      });
      this.setWorkingProps();
    },
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.setWorkingProps();
        this.$store.dispatch('toast/success', this.$t('started'));
      }
    },
    search: debounce(function() {
      if (!this.id) {
        this.$store.dispatch('suggestions/fetch', this.description);
      }
    }, 1000),
    showModal() {
      this.$modal.show('project-list');
    },
    input(e) {
      this.description = e.target.value;
      this.search();
    },
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
    change() {
      if (this.id) this.updateActivity();
    },
    clickSuggest(activity) {
      this.description = activity.description;
      this.project = activity.project;
      this.startActivity();
    }
  }
};
</script>

<style scoped lang="scss">
.timer-form {
  display: flex;
  position: fixed;
  background-color: #fffffff5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - #{$side-bar-min-width});
  z-index: index($z, timer-form);
  height: 91px;
}
.duration.stopped {
  color: $text-light;
}
.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 40px;
  pointer-events: auto;
  box-shadow: 0 3px 3px #00000010;
}
.control-button .icon {
  width: 22px;
  height: 22px;
}
.control-button.start .icon {
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
  display: flex;
  flex: 1;
  border-bottom: 1px $border solid;
  border-right: 0;
  box-shadow: 0 3px 3px #00000005;
}
.project-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  border-right: 1px $border solid;
}
.selected-project {
  cursor: pointer;
  display: flex;
  height: 100%;
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
.suggest-list-wrapper {
  position: absolute;
  animation-duration: 100ms;
  width: 100%;
  height: 100vh;
  top: 90px;
  box-sizing: border-box;
  max-width: calc(100vw - #{$side-bar-min-width});
  background-color: #00000030;
}
.suggest-list {
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: $white;
  border-top: 1px $border solid;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0 3px 5px #00000015;
  -webkit-overflow-scrolling: touch;
}
.suggest-list ul {
  margin: 0;
  padding: 0;
}
.suggest-list ul li {
  display: flex;
  cursor: pointer;
  list-style-position: inside;
  list-style-type: none;
  text-align: center;
  align-items: center;
  height: 65px;
  padding: 0 50px;
  border-bottom: 1px $grey-f5f5f5 solid;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 10px;
  }
  &:first-child {
    padding-top: 10px;
  }
  &:hover {
    background-color: $grey-fdfdfd;
  }
}
@include mq(small) {
  .timer-form {
    max-width: 100vw;
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
  .selected-project {
    display: none;
  }
  .dot-only {
    display: flex;
  }
  .form-content {
    order: 1;
    position: fixed;
    top: $side-bar-min-height;
    border-radius: 0;
    width: 100%;
    border: 0;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px $border solid;
    box-shadow: 0 3px 3px #00000005;
  }
  .control-button {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
  .control-button.start .icon {
    padding-left: 3px;
  }
  .control-button .icon {
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
  .suggest-list-wrapper {
    position: absolute;
    top: 80px;
    border: 0;
    margin: 0;
    padding: 0;
    max-width: 100vw;
    width: 100%;
    background: none;
  }
  .suggest-list {
    border-radius: 0;
    height: 100vh;
    border-top: 0;
    border-left: 0;
    margin: 0;
    max-width: 100vw;
    box-shadow: 0 3px 3px #00000005 inset;
  }
  .suggest-list ul {
    min-height: 110vh;
  }
  .suggest-list ul li {
    height: 75px;
    padding: 0 35px;
    border-bottom: 1px $grey-f5f5f5 solid;
    border-radius: 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 1px $grey-f5f5f5 solid;
      padding-bottom: 0;
    }
  }
}
</style>
