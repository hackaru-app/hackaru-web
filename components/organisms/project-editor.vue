<i18n src="@/assets/locales/components/organisms/project-editor.json" />

<template>
  <section>
    <modal-header>
      <btn type="button" class="has-icon" @click="pop">
        <icon name="chevron-left-icon" class="is-large" />
      </btn>
      <h1>{{ $t(`titles.${id ? 'update' : 'add'}`) }}</h1>
    </modal-header>

    <form @submit.prevent="id ? updateProject() : addProject()">
      <modal-item>
        <modal-label>
          {{ $t('name') }}
        </modal-label>
        <input
          v-model="name"
          :placeholder="$t('name')"
          class="input inline"
          type="text"
        />
      </modal-item>

      <modal-item>
        <modal-label>
          {{ $t('color') }}
        </modal-label>
        <color-select :value.sync="color" />
      </modal-item>

      <modal-footer>
        <btn type="submit" class="is-rounded is-primary">
          {{ $t(id ? 'update' : 'add') }}
        </btn>

        <btn
          v-if="id !== undefined"
          class="delete-button has-icon"
          type="button"
          @click="deleteProject"
        >
          <icon name="trash-icon" class="is-danger" />
        </btn>
      </modal-footer>
    </form>
  </section>
</template>

<script>
import ModalItem from '@/components/molecules/modal-item';
import ModalLabel from '@/components/molecules/modal-label';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import Icon from '@/components/atoms/icon';
import ColorSelect from '@/components/molecules/color-select';
import Btn from '@/components/atoms/btn';
import ProjectList from '@/components/organisms/project-list';

export default {
  components: {
    ColorSelect,
    Icon,
    ModalHeader,
    ModalItem,
    ModalFooter,
    ModalLabel,
    Btn
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
      const success = await this.$store.dispatch('projects/addProject', {
        name: this.name,
        color: this.color
      });
      if (success) {
        this.pop();
        this.$ga.event('project', 'addProject');
        this.$toast.success(this.$t('added'));
      }
    },
    async updateProject() {
      const success = await this.$store.dispatch('projects/updateProject', {
        id: this.id,
        name: this.name,
        color: this.color
      });
      if (success) {
        this.pop();
        this.$ga.event('project', 'updateProject');
        this.$toast.success(this.$t('updated'));
      }
    },
    async deleteProject() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      const success = await this.$store.dispatch(
        'projects/deleteProject',
        this.id
      );
      if (success) {
        this.pop();
        this.$ga.event('project', 'deleteProject');
        this.$toast.success(this.$t('deleted'));
      }
    },
    pop() {
      this.$emit('pop', { component: ProjectList });
    }
  }
};
</script>
