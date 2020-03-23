<i18n src="@/assets/locales/components/organisms/activity-editor.json"></i18n>

<template>
  <section>
    <modal-header>
      <h1>{{ $t(`titles.${id ? 'update' : 'start'}`) }}</h1>
    </modal-header>

    <form @submit.prevent="saveActivity">
      <activity-editor-description
        :description.sync="description"
        :project.sync="project"
      />

      <modal-item>
        <button type="button" class="project-button" @click="editProject">
          <project-name :name="project.name" :color="project.color" />
          <icon name="chevron-right-icon" class="is-large" />
        </button>
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
        <base-button
          :disabled="disabled"
          type="submit"
          class="is-rounded is-primary"
        >
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
import ActivityEditorDescription from '@/components/organisms/activity-editor-description';
import ProjectList from '@/components/organisms/project-list';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import ProjectName from '@/components/molecules/project-name';
import DatetimePicker from '@/components/molecules/datetime-picker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import { formatDistanceStrict, parseISO } from 'date-fns';
import { mapGetters } from 'vuex';

export default {
  name: 'ActivityEditor',
  components: {
    ActivityEditorDescription,
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
      disabled: false,
      project: {
        id: null,
        name: 'No Project',
        color: '#cccfd9'
      },
      startedAt: `${new Date()}`,
      stoppedAt: undefined,
      focused: false
    };
  },
  computed: {
    ...mapGetters({
      suggestions: 'suggestions/all'
    }),
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
      this.disabled = true;
      const action = this.id ? 'update' : 'add';
      const success = await this.$store.dispatch(`activities/${action}`, {
        id: this.id,
        projectId: this.project.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt
      });
      this.disabled = false;
      if (success) {
        this.$store.dispatch(
          'toast/success',
          this.$t(this.id || this.stoppedAt ? 'saved' : 'started')
        );
        this.$modal.hide('activity');
        this.$gtm.trackEvent({
          eventCategory: 'Activities',
          eventAction: action,
          name: `${action}_activity`,
          component: 'activity_editor'
        });
      }
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.$gtm.trackEvent({
        eventCategory: 'Activities',
        eventAction: 'delete',
        name: 'delete_activity',
        component: 'activity_editor'
      });
      this.$modal.hide('activity');
    },
    editProject() {
      this.$emit('push', {
        component: ProjectList,
        params: { selected: this.project.id }
      });
    },
    async share() {
      const duration = formatDistanceStrict(
        parseISO(this.startedAt),
        parseISO(this.stoppedAt)
      );
      const title = [this.project.name, this.description]
        .filter(v => v)
        .join(' - ');
      try {
        await navigator.share({
          title: this.$t('share.title'),
          text: this.$t('share.text', { title, duration })
        });
        this.$gtm.trackEvent({
          eventCategory: 'Activities',
          eventAction: 'share',
          name: 'share',
          component: 'activity_editor'
        });
      } catch (e) {
        if (e.name === 'AbortError') return;
        throw e;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.project-button {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  padding: 0;
  height: 40px;
  width: 100%;
  background: none;
}
.icons {
  display: flex;
  flex-direction: row;
  .delete-button {
    margin-left: 10px;
  }
}
</style>
