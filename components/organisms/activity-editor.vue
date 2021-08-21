<i18n src="~/assets/locales/components/organisms/activity-editor.json"></i18n>

<template>
  <form data-test-id="form" @submit.prevent="updateActivity">
    <modal-header>
      {{ $t('title') }}
    </modal-header>
    <div class="content">
      <activity-editor-description
        v-model="description"
        @select-project="selectProject"
      />
      <modal-item>
        <button
          type="button"
          data-test-id="project-button"
          class="project-button"
          @click="editProject"
        >
          <project-name v-bind="project" class="project-name" />
          <icon name="chevron-right-icon" class="is-large" />
        </button>
      </modal-item>
      <modal-item>
        <label>
          {{ $t('startedAt') }}
        </label>
        <datetime-picker v-model="startedAt" class="datetime-picker" />
      </modal-item>
      <modal-item>
        <label>
          {{ $t('stoppedAt') }}
        </label>
        <datetime-picker v-model="stoppedAt" class="datetime-picker" />
      </modal-item>
      <modal-footer>
        <base-button type="submit" class="is-rounded is-primary">
          {{ $t('update') }}
        </base-button>
        <icon-button
          type="button"
          data-test-id="delete-button"
          @click="deleteActivity"
        >
          <icon name="trash-2-icon" class="is-danger" />
        </icon-button>
      </modal-footer>
    </div>
  </form>
</template>

<script>
import ActivityEditorDescription from '~/components/organisms/activity-editor-description';
import ProjectList from '~/components/organisms/project-list';
import ModalItem from '~/components/molecules/modal-item';
import ModalHeader from '~/components/molecules/modal-header';
import ModalFooter from '~/components/molecules/modal-footer';
import ProjectName from '~/components/molecules/project-name';
import DatetimePicker from '~/components/molecules/datetime-picker';
import BaseButton from '~/components/atoms/base-button';
import IconButton from '~/components/atoms/icon-button';
import Icon from '~/components/atoms/icon';
import { mapGetters } from 'vuex';
import { differenceInSeconds, parseISO } from 'date-fns';

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
    IconButton,
    Icon,
  },
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: undefined,
      description: '',
      disabled: false,
      project: null,
      startedAt: `${new Date()}`,
      stoppedAt: undefined,
      focused: false,
    };
  },
  computed: {
    ...mapGetters({
      suggestions: 'suggestions/all',
    }),
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
      },
    },
  },
  methods: {
    async updateActivity() {
      this.disabled = true;
      const success = await this.$store.dispatch('activities/update', {
        id: this.id,
        projectId: this.project?.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
      });
      this.disabled = false;
      if (success) {
        this.$store.dispatch(
          'toast/success',
          this.$t(this.id || this.stoppedAt ? 'saved' : 'started')
        );
        this.$emit('pop');
        this.$mixpanel.track('Update activity', {
          component: 'activity-editor',
          descriptionLength: this.description.length,
          projectId: this.project?.id,
          startedAt: this.startedAt,
          stoppedAt: this.stoppedAt,
          duration: this.stoppedAt
            ? differenceInSeconds(
                parseISO(this.stoppedAt),
                parseISO(this.startedAt)
              )
            : undefined,
        });
        this.$ga.event({
          eventCategory: 'Activities',
          eventAction: 'update',
        });
      }
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.$mixpanel.track('Delete activity', {
        component: 'activity-editor',
        descriptionLength: this.description.length,
        projectId: this.project?.id,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        duration: this.stoppedAt
          ? differenceInSeconds(
              parseISO(this.stoppedAt),
              parseISO(this.startedAt)
            )
          : undefined,
      });
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'delete',
      });
      this.$emit('pop');
    },
    editProject() {
      this.$emit('push', {
        component: ProjectList,
      });
    },
    selectProject(project) {
      this.project = project;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  height: 385px;
}

.datetime-picker {
  justify-content: flex-end;
}

.project-button {
  align-items: center;
  background: none;
  border: 0;
  display: flex;
  justify-content: space-between;
  min-height: inherit;
  padding: 0;
  width: 100%;

  .project-name {
    display: flex;
    min-height: inherit;
    padding-right: 10px;
  }
}
</style>
