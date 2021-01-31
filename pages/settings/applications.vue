<i18n src="@/assets/locales/common/scopes.json"></i18n>
<i18n src="@/assets/locales/pages/settings/applications.json"></i18n>

<template>
  <section>
    <base-modal :shown.sync="shownModal" data-test-id="base-modal">
      <section>
        <modal-header>
          {{ selected.name }}
        </modal-header>
        <modal-item class="scopes-item is-vertical">
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
      </section>
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
        <h1 data-test-id="application-name" @click="showModal(application)">
          {{ application.name }}
        </h1>
        <icon-button
          data-test-id="delete-button"
          @click="deleteApplication(application.id)"
        >
          <icon name="x-icon" class="is-danger" />
        </icon-button>
      </div>

      <p v-if="applications.length <= 0" class="empty-message">
        {{ $t('empty') }}
      </p>
    </section>
  </section>
</template>

<script>
import ContentHeader from '@/components/organisms/content-header';
import IconButton from '@/components/atoms/icon-button';
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
    IconButton,
    Icon,
    Heading,
    BaseModal,
    ModalHeader,
    ModalItem,
    ModalFooter,
    Highlight,
  },
  data() {
    return {
      selected: {},
      shownModal: false,
    };
  },
  computed: {
    ...mapGetters({
      applications: 'applications/all',
    }),
  },
  async mounted() {
    await this.$store.dispatch('applications/fetch');
  },
  methods: {
    deleteApplication(id) {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$ga.event({
        eventCategory: 'Applications',
        eventAction: 'delete',
      });
      this.$store.dispatch('applications/delete', id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
    },
    showModal(application) {
      this.selected = application;
      this.shownModal = true;
    },
  },
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.empty-message {
  border-top: 1px $border solid;
  padding: 0 10px;
  padding-top: 30px;
  margin: 0;
  display: flex;
  width: 100%;
  color: $text-lighter;
}
.scopes-item {
  border-bottom: 0;
}
@include mq(small) {
  .content {
    padding: 0 30px;
  }
  .empty-message {
    box-sizing: border-box;
    justify-content: center;
  }
}
</style>
