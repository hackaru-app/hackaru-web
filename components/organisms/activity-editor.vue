<i18n src="@/assets/locales/components/organisms/activity-editor.json" />

<template>
  <section>
    <modal-header>
      <h1>{{ $t(`titles.${id ? 'update' : 'start'}`) }}</h1>
    </modal-header>

    <form @submit.prevent="saveActivity">
      <modal-item>
        <label>
          {{ $t('project') }}
        </label>
        <button type="button" class="project-button" @click="editProject">
          <project-name :name="project.name" :color="project.color" />
        </button>
      </modal-item>

      <modal-item>
        <label>
          {{ $t('description') }}
        </label>
        <input
          v-model="description"
          :placeholder="$t('description')"
          type="text"
        />
      </modal-item>

      <modal-item>
        <label>
          {{ $t('startedAt') }}
        </label>
        <datetime-picker v-model="startedAt" />
      </modal-item>

      <modal-item v-if="id">
        <label>
          {{ $t('stoppedAt') }}
        </label>
        <datetime-picker v-model="stoppedAt" />
      </modal-item>

      <modal-footer>
        <base-button type="submit" class="is-rounded is-primary">
          {{ $t(id ? 'update' : 'start') }}
        </base-button>
        <div class="icons">
          <base-button
            v-if="stoppedAt && isSharedSupported"
            type="button"
            class="share-button has-icon"
            @click="share"
          >
            <icon name="share-icon" />
          </base-button>
          <base-button
            v-if="id"
            type="button"
            class="delete-button has-icon"
            @click="deleteActivity"
          >
            <icon name="trash-icon" class="is-danger" />
          </base-button>
        </div>
      </modal-footer>
    </form>
  </section>
</template>

<script>
import ProjectList from '@/components/organisms/project-list';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import ProjectName from '@/components/molecules/project-name';
import DatetimePicker from '@/components/molecules/datetime-picker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import { distanceInWordsStrict } from 'date-fns';

export default {
  name: 'ActivityEditor',
  components: {
    ProjectName,
    DatetimePicker,
    ModalHeader,
    ModalItem,
    ModalFooter,
    BaseButton,
    Icon
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: undefined,
      description: '',
      project: {
        id: null,
        name: 'No Project',
        color: '#cccfd9'
      },
      startedAt: `${new Date()}`,
      stoppedAt: undefined
    };
  },
  computed: {
    isSharedSupported() {
      return navigator.share !== undefined;
    }
  },
  watch: {
    params: {
      immediate: true,
      handler() {
        const params = this.params || {};
        this.id = params.id || this.id;
        this.description = params.description || this.description;
        this.startedAt = params.startedAt || this.startedAt;
        this.stoppedAt = params.stoppedAt || this.stoppedAt;
        this.project = params.project || this.project;
      }
    }
  },
  methods: {
    async saveActivity() {
      const action = this.id ? 'update' : 'add';
      const success = await this.$store.dispatch(`activities/${action}`, {
        id: this.id,
        projectId: this.project.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt
      });
      if (success) {
        this.$modal.hide('activity');
        this.$ga.event('activity', action);
        this.$store.dispatch(
          'toast/success',
          this.$t(this.id || this.stoppedAt ? 'saved' : 'started')
        );
      }
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.$ga.event('activity', 'deleteActivity');
      this.$modal.hide('activity');
    },
    editProject() {
      this.$emit('push', {
        component: ProjectList,
        params: { selected: this.project.id }
      });
    },
    share() {
      const duration = distanceInWordsStrict(this.startedAt, this.stoppedAt);
      const title = [this.project.name, this.description]
        .filter(v => v)
        .join(' - ');
      navigator.share({
        title: 'Hackaru',
        text: `「${title}」を計測しました！ - ${duration} #hackaru`
      });
    }
  }
};
</script>

<style scoped lang="scss">
.project-button {
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  border: 0;
  padding: 0;
  height: 40px;
  width: 100%;
  background: none;
  &:active {
    transform: scale(0.9);
  }
}
.icons {
  display: flex;
  flex-direction: row;
  button {
    margin-left: 15px;
  }
}
</style>
