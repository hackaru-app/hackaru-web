<i18n src="@/assets/locales/components/organisms/big-timer.json" />

<template>
  <section class="big-timer">
    <nav-modal
      :initial-component="ProjectList"
      height="450"
      name="project-list"
      @close="selectProject"
    />
    <ticker
      :started-at="startedAt"
      :class="['duration', { stopped: !startedAt }]"
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
          @keypress.enter.prevent="enterDescription"
        />
        <base-button
          v-tooltip="$t('start')"
          v-if="!startedAt"
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
      <transition name="fade">
        <div
          v-if="focused && !startedAt && searchResults.length > 0"
          class="suggester-wrapper"
        >
          <div class="suggester">
            <ul>
              <li
                v-for="activity in searchResults"
                :key="activity.id"
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
      description: '',
      project: undefined,
      startedAt: undefined,
      focused: false
    };
  },
  computed: {
    ...mapGetters({
      searchResults: 'activities/searchResults'
    }),
    working() {
      const workings = this.$store.getters['activities/workings'];
      return workings.length > 0 ? workings[0] : {};
    }
  },
  watch: {
    working() {
      this.startedAt = this.working.startedAt;
      this.project = this.working.project || this.project;
      this.description = this.working.description || this.description;
    }
  },
  methods: {
    selectProject({ project }) {
      this.project = project;
      if (this.working.id) {
        this.updateActivity();
      }
    },
    submit() {
      (this.startedAt ? this.stopActivity : this.startActivity)();
    },
    enterDescription() {
      (this.startedAt ? this.updateActivity : this.startActivity)();
    },
    async updateActivity() {
      const success = await this.$store.dispatch('activities/update', {
        id: this.working.id,
        description: this.description,
        projectId: this.project && this.project.id
      });
      if (success) {
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    stopActivity() {
      this.$store.dispatch('toast/success', this.$t('stopped'));
      this.$store.dispatch('activities/update', {
        id: this.working.id,
        stoppedAt: `${new Date()}`
      });
      this.project = null;
      this.description = '';
    },
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.$store.dispatch('toast/success', this.$t('started'));
      }
    },
    search: debounce(function() {
      if (!this.working.id) {
        this.$store.dispatch('activities/search', this.description);
      }
    }, 500),
    showModal() {
      this.$modal.show('project-list');
    },
    input(e) {
      this.description = e.target.value;
      this.search();
    },
    focus() {
      this.focused = true;
      this.search();
    },
    blur() {
      this.focused = false;
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
.big-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - #{$side-bar-min-width});
  box-sizing: border-box;
}
.duration {
  font-size: 76px;
  font-weight: 300;
  font-family: $font-family-duration;
}
.duration.stopped {
  color: $text-light;
}
.control-button {
  flex-shrink: 0;
  padding: 0;
  width: 65px;
  height: 100%;
  border-radius: 0 3px 3px 0;
  pointer-events: auto;
}
.control-button .icon {
  width: 24px;
  height: 24px;
}
.control-button.start .icon {
  padding-left: 3px;
}
.form {
  width: 100%;
  max-width: 700px;
  padding: 0 35px;
  justify-content: center;
  margin-top: 20px;
  display: flex;
  border-radius: 5px;
  height: 65px;
  box-sizing: border-box;
}
.form-content {
  display: flex;
  flex: 1;
  border: 1px $border solid;
  border-right: 0;
  border-radius: 3px 0 0 3px;
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
  padding: 0 30px;
  align-items: center;
}
.description {
  line-height: 1;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  display: flex;
  background: none;
}
.dot-only {
  display: none;
}
.suggester-wrapper {
  position: absolute;
  width: 100%;
  max-width: 700px;
  padding: 0 35px;
  box-sizing: border-box;
}
.suggester {
  animation-duration: 0.2s;
  max-height: 190px;
  overflow-y: scroll;
  margin-top: 80px;
  box-sizing: border-box;
  background-color: #fffffffa;
  border: 1px $border solid;
  border-radius: 3px;
  box-shadow: 0 3px 8px #00000008;
  -webkit-overflow-scrolling: touch;
}
.suggester ul {
  margin: 0;
  padding: 0;
}
.suggester ul li {
  display: flex;
  cursor: pointer;
  list-style-position: inside;
  list-style-type: none;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
  height: 63px;
  padding: 0 30px;
  border-bottom: 1px $grey-f5f5f5 solid;
  &:hover {
    background-color: $grey-fdfdfd;
  }
  &:last-child {
    border-bottom: 0;
  }
}
@include mq(small) {
  .big-timer {
    max-width: 100%;
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
    display: flex;
    flex-shrink: 0;
    border-radius: 0;
    width: 65px;
  }
  .description {
    padding: 0 25px;
    min-width: 1px;
  }
  .control-button .icon {
    width: 22px;
    height: 22px;
  }
  .duration {
    font-size: 68px;
  }
  .suggester-wrapper {
    position: absolute;
    top: 0;
    border: 0;
    margin: 0;
    padding: 0;
  }
  .suggester {
    border-radius: 0;
    min-height: 100vh;
    border-top: 0;
    border-left: 0;
    margin-top: 80px;
    box-shadow: 0 3px 3px #00000005 inset;
  }
  .suggester ul {
    min-height: 150vh;
  }
  .suggester ul li {
    height: 75px;
    padding: 0 35px;
    border-bottom: 1px $grey-f5f5f5 solid;
    border-radius: 0;
    &:last-child {
      border-bottom: 1px $grey-f5f5f5 solid;
    }
  }
}
</style>
