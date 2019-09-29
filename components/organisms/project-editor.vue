<i18n src="@/assets/locales/components/organisms/project-editor.json" />

<template>
  <section>
    <modal-header>
      <template slot="left">
        <base-button type="button" class="has-icon" @click="pop">
          <icon name="chevron-left-icon" class="is-large" />
        </base-button>
      </template>

      <h1>{{ $t(`titles.${id ? 'update' : 'add'}`) }}</h1>
    </modal-header>

    <form @submit.prevent="id ? updateProject() : addProject()">
      <modal-item>
        <label>
          {{ $t('name') }}
        </label>
        <input v-model="name" :placeholder="$t('name')" type="text" />
      </modal-item>

      <modal-item>
        <label>
          {{ $t('color') }}
        </label>
        <color-select :value.sync="color" />
      </modal-item>

      <modal-footer>
        <base-button type="submit" class="is-rounded is-primary">
          {{ $t(id ? 'update' : 'add') }}
        </base-button>

        <base-button
          v-if="id !== undefined"
          class="delete-button has-icon"
          type="button"
          @click="deleteProject"
        >
          <icon name="trash-icon" class="is-danger" />
        </base-button>
      </modal-footer>
    </form>
  </section>
</template>

<script>
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import Icon from '@/components/atoms/icon';
import ColorSelect from '@/components/molecules/color-select';
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    ColorSelect,
    Icon,
    ModalHeader,
    ModalItem,
    ModalFooter,
    BaseButton
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
      name: '',
      color: '#cccfd9'
    };
  },
  watch: {
    params: {
      immediate: true,
      handler() {
        const params = this.params || {};
        this.id = params.id || this.id;
        this.name = params.name || this.name;
        this.color = params.color || this.color;
      }
    }
  },
  methods: {
    async addProject() {
      const success = await this.$store.dispatch('projects/add', {
        name: this.name,
        color: this.color
      });
      if (success) {
        this.$emit('pop');
        this.$gtm.trackEvent({
          name: 'add_project',
          component: 'project_editor'
        });
        this.$store.dispatch('toast/success', this.$t('added'));
      }
    },
    async updateProject() {
      const success = await this.$store.dispatch('projects/update', {
        id: this.id,
        name: this.name,
        color: this.color
      });
      if (success) {
        this.$emit('pop');
        this.$gtm.trackEvent({
          name: 'update_project',
          component: 'project_editor'
        });
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    async deleteProject() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      const success = await this.$store.dispatch('projects/delete', this.id);
      if (success) {
        this.$emit('pop');
        this.$gtm.trackEvent({
          name: 'delete_project',
          component: 'project_editor'
        });
        this.$store.dispatch('toast/success', this.$t('deleted'));
      }
    },
    pop() {
      this.$emit('pop');
    }
  }
};
</script>
