<i18n src="@/assets/locales/components/organisms/project-editor.json"></i18n>

<template>
  <section>
    <modal-header>
      <template slot="left">
        <icon-button
          v-if="navigated"
          data-test-id="left-arrow-button"
          type="button"
          @click="pop"
        >
          <icon name="chevron-left-icon" class="is-large" />
        </icon-button>
      </template>

      {{ $t(`titles.${id ? 'update' : 'add'}`) }}
    </modal-header>

    <div class="content">
      <form data-test-id="form" @submit.prevent="addOrUpdate">
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
          <color-select :value.sync="color" class="color-select" />
        </modal-item>

        <modal-footer>
          <base-button type="submit" class="is-rounded is-primary">
            {{ $t(id ? 'update' : 'add') }}
          </base-button>

          <base-button
            v-if="!!id"
            type="button"
            data-test-id="delete-button"
            class="is-icon is-white"
            @click="deleteProject"
          >
            <icon name="trash-2-icon" class="is-danger" />
          </base-button>
        </modal-footer>
      </form>
    </div>
  </section>
</template>

<script>
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import Icon from '@/components/atoms/icon';
import ColorSelect from '@/components/molecules/color-select';
import BaseButton from '@/components/atoms/base-button';
import IconButton from '@/components/atoms/icon-button';

export default {
  components: {
    ColorSelect,
    Icon,
    ModalHeader,
    ModalItem,
    ModalFooter,
    BaseButton,
    IconButton,
  },
  props: {
    navigated: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: undefined,
      name: '',
      color: '#cccfd9',
    };
  },
  watch: {
    params: {
      immediate: true,
      handler() {
        this.id = this.params.id;
        this.name = this.params.name || '';
        this.color = this.params.color || '#4ab8b8';
      },
    },
  },
  methods: {
    addOrUpdate() {
      if (this.id) {
        this.updateProject();
      } else {
        this.addProject();
      }
    },
    async addProject() {
      const success = await this.$store.dispatch('projects/add', {
        name: this.name,
        color: this.color,
      });
      if (success) {
        this.$emit('pop');
        this.$ga.event({
          eventCategory: 'Projects',
          eventAction: 'add',
        });
        this.$store.dispatch('toast/success', this.$t('added'));
      }
    },
    async updateProject() {
      const success = await this.$store.dispatch('projects/update', {
        id: this.id,
        name: this.name,
        color: this.color,
      });
      if (success) {
        this.$emit('pop');
        this.$ga.event({
          eventCategory: 'Projects',
          eventAction: 'update',
        });
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    async deleteProject() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      const success = await this.$store.dispatch('projects/delete', this.id);
      if (success) {
        this.$emit('pop');
        this.$ga.event({
          eventCategory: 'Projects',
          eventAction: 'delete',
        });
        this.$store.dispatch('toast/success', this.$t('deleted'));
      }
    },
    pop() {
      this.$emit('pop');
    },
  },
};
</script>

<style scoped lang="scss">
.color-select {
  margin-top: 25px;
  margin-bottom: 15px;
  margin-left: -5px;
}
.content {
  height: 385px;
}
</style>
