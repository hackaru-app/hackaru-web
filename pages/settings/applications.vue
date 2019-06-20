<i18n src="@/assets/locales/common/scopes.json" />
<i18n src="@/assets/locales/pages/settings/applications.json" />

<template>
  <section>
    <base-modal name="application">
      <form>
        <modal-header>
          <h1>{{ selected.name }}</h1>
        </modal-header>
        <modal-item class="is-vertical">
          <label>
            {{ $t('labels.scopes') }}
          </label>
          <highlight>
            <ul>
              <li v-for="scope in selected.scopes" :key="scope">
                {{ $t(`scopes.${scope}`) }}
              </li>
            </ul>
          </highlight>
        </modal-item>
      </form>
    </base-modal>

    <section class="content">
      <header class="header">
        <heading class="is-small">
          <icon name="box-icon" />
          {{ $t('title') }}
        </heading>
      </header>

      <div
        v-for="application in applications"
        :key="application.id"
        class="application"
      >
        <h1 @click="showModal(application)">{{ application.name }}</h1>
        <base-button
          class="delete-button has-icon"
          @click="deleteApplication(application.id)"
        >
          <icon name="x-icon" class="is-danger" />
        </base-button>
      </div>

      <p v-if="applications.length <= 0" class="empty">
        {{ $t('empty') }}
      </p>
    </section>
  </section>
</template>

<script>
import ContentHeader from '@/components/organisms/content-header';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import BaseModal from '@/components/organisms/base-modal';
import Highlight from '@/components/atoms/highlight';
import { mapGetters } from 'vuex';

export default {
  components: {
    ContentHeader,
    BaseButton,
    Icon,
    Heading,
    BaseModal,
    ModalHeader,
    ModalItem,
    ModalFooter,

    Highlight
  },
  data() {
    return {
      selected: {}
    };
  },
  computed: {
    ...mapGetters({
      applications: 'applications/all'
    })
  },
  async mounted() {
    await this.$store.dispatch('applications/fetch');
  },
  methods: {
    deleteApplication(id) {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('applications/delete', id);
      this.$ga.event('oauth', 'deleteApplication');
      this.$store.dispatch('toast/success', this.$t('deleted'));
    },
    showModal(application) {
      this.selected = application;
      this.$modal.show('application');
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 0 40px;
  padding-bottom: 50px;
}
.header {
  display: flex;
  h1 {
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: normal;
    margin: 0;
    margin-top: 5px;
    height: 90px;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}
.application {
  padding: 20px 25px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  border: 1px $border solid;
  border-radius: 3px;
  h1 {
    cursor: pointer;
    font-size: $font-size;
    font-weight: normal;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    align-items: center;
    transition: all 0.2s ease;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:active {
      transform: scale(0.97);
    }
  }
}
.empty {
  margin: 0;
  padding: 30px 0;
  border-top: 1px $border solid;
}
@include mq(small) {
  .content {
    padding: 0 30px;
  }
  .empty {
    text-align: center;
    width: 100%;
  }
}
</style>
