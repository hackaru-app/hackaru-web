<i18n src="@/assets/locales/components/organisms/big-timer.json" />

<template>
  <section class="big-timer" @submit.prevent="submit">
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
    <form class="form">
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
          v-model="description"
          :placeholder="$t('description')"
          type="text"
          class="description"
          @focus="suggestion = true"
          @blur="suggestion = false"
        />
      </div>
      <coach-tooltip :content="$t('welcome')" name="welcome" placement="bottom">
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
      </coach-tooltip>
      <transition name="fade">
        <div v-if="suggestion" class="suggestion">
          <ul>
            <li><project-name color="#4ab8b8" name="データベースの構築" /></li>
            <li><project-name color="#4ab8b8" name="データベースの構築" /></li>
            <li><project-name color="#4ab8b8" name="データベースの構築" /></li>
            <li><project-name color="#4ab8b8" name="データベースの構築" /></li>
          </ul>
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
      suggestion: false
    };
  },
  computed: {
    workings() {
      return this.$store.getters['activities/workings'];
    }
  },
  watch: {
    workings() {
      const activity = this.workings.length > 0 ? this.workings[0] : {};
      this.description = activity.description;
      this.startedAt = activity.startedAt;
      this.project = activity.project;
    }
  },
  methods: {
    selectProject({ project }) {
      this.project = project;
    },
    submit() {
      (this.startedAt ? this.stopActivity : this.startActivity)();
    },
    stopActivity() {
      this.$store.dispatch('toast/success', this.$t('stopped'));
      this.$store.dispatch('activities/update', {
        id: this.workings[0].id,
        stoppedAt: `${new Date()}`
      });
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
    showModal() {
      this.$modal.show('project-list');
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
  width: calc(100vw - #{$side-bar-min-width});
  max-width: 620px;
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
  justify-content: center;
  margin-top: 20px;
  display: flex;
  border-radius: 5px;
  height: 62px;
  box-sizing: border-box;
}
.form-content {
  display: flex;
  flex: 1;
  border: 1px $border solid;
  border-right: 0;
  border-radius: 3px 0 0 3px;
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
.suggestion {
  animation-duration: 0.2s;
  position: absolute;
  width: 100%;
  max-height: 196px;
  overflow-y: scroll;
  margin-top: 80px;
  box-sizing: border-box;
  background-color: #fffffffa;
  border: 1px $border solid;
  border-radius: 3px;
  box-shadow: 0 3px 8px #00000005;
  -webkit-overflow-scrolling: touch;
}
.suggestion ul {
  margin: 0;
  padding: 0;
}
.suggestion ul li {
  display: flex;
  cursor: pointer;
  list-style-position: inside;
  list-style-type: none;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
  height: 65px;
  padding: 0 30px;
  border-bottom: 1px $grey-f5f5f5 solid;
  &:last-child {
    border-bottom: 0;
  }
}
@include mq(small) {
  .big-timer {
    margin-top: 0;
  }
  .form {
    height: auto;
    padding: 0;
    justify-content: flex-start;
    margin: 0;
    margin-top: 20px;
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
    position: absolute;
    top: 1px;
    border-radius: 0;
    width: 100%;
    border: 0;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px $border solid;
  }
  .control-button {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    padding: 0;
  }
  .description {
    padding: 0 30px;
  }
  .control-button .icon {
    width: 25px;
    height: 25px;
  }
  .control-button.start .icon {
    padding-left: 5px;
    width: 28px;
    height: 28px;
  }
  .duration {
    font-size: 68px;
  }
  .suggestion {
    position: absolute;
    top: 0;
    border-radius: 0;
    border: 0;
    margin-top: 80px;
    min-height: 100vh;
    border-top: 1px $border solid;
    box-shadow: 0 3px 3px #00000005 inset;
  }
  .suggestion ul {
    min-height: 150vh;
  }
  .suggestion ul li {
    height: 75px;
    padding: 0 36px;
    border-bottom: 1px $grey-f5f5f5 solid;
    border-radius: 0;
    &:last-child {
      border-bottom: 1px $grey-f5f5f5 solid;
    }
  }
}
</style>
