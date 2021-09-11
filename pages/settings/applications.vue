<i18n src="~/assets/locales/common/scopes.json"></i18n>
<i18n src="~/assets/locales/pages/settings/applications.json"></i18n>

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
import IconButton from '~/components/atoms/icon-button';
import Icon from '~/components/atoms/icon';
import Heading from '~/components/atoms/heading';
import ModalItem from '~/components/molecules/modal-item';
import ModalHeader from '~/components/molecules/modal-header';
import BaseModal from '~/components/organisms/base-modal';
import Highlight from '~/components/atoms/highlight';
import { mapGetters } from 'vuex';

export default {
  components: {
    IconButton,
    Icon,
    Heading,
    BaseModal,
    ModalHeader,
    ModalItem,
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
  mounted() {
    this.$store.dispatch('applications/fetch');
  },
  methods: {
    deleteApplication(id) {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$mixpanel.track('Delete application', {
        component: 'applications',
      });
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
    align-items: center;
    display: flex;
    flex: 1;
    font-weight: normal;
    height: 90px;
    margin: 0;
    margin-top: 5px;
  }
}
ul {
  list-style-position: inside;
  margin: 0;
  padding: 0;
}
.application {
  align-items: center;
  border: 1px $border solid;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 20px 25px;
  h1 {
    align-items: center;
    cursor: pointer;
    font-size: $font-size;
    font-weight: normal;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
}
.empty-message {
  border-top: 1px $border solid;
  color: $text-lighter;
  display: flex;
  margin: 0;
  padding: 0 10px;
  padding-top: 30px;
  width: 100%;
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
