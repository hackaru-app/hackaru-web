<i18n src="~/assets/locales/pages/settings/integrations.json"></i18n>

<template>
  <section>
    <base-modal :shown.sync="shownModal">
      <form @submit.prevent="deleteAccount">
        <modal-header>
          {{ $t('modal.title') }}
        </modal-header>
        <modal-item>
          <div class="calendar-url">
            <input
              :value="calendarUrl"
              data-test-id="calendar-url"
              required
              readonly
            />
          </div>
        </modal-item>
        <modal-item class="description is-vertical">
          <p>{{ $t('modal.howTo') }}</p>
          <br />
          <highlight class="highlight">
            {{ $t('modal.example')
            }}<a
              href="https://support.google.com/calendar/answer/37100"
              target="_blank"
              rel="noopener"
              >{{ $t('modal.help') }}</a
            >
            {{ $t('modal.link') }}
          </highlight>
        </modal-item>
      </form>
    </base-modal>

    <setting-box>
      <template #heading>
        <icon name="calendar-icon" />
        {{ $t('title') }}
      </template>
      <template #description>{{ $t('description') }}</template>

      <div class="calendar-button">
        <base-button
          class="is-rounded is-marshmallow"
          data-test-id="other-calendar-button"
          type="button"
          @click="createAndOpenModal"
        >
          {{ $t('create') }}
          <icon class="is-primary" name="external-link-icon" />
        </base-button>
      </div>
    </setting-box>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon';
import BaseButton from '~/components/atoms/base-button';
import SettingBox from '~/components/molecules/setting-box';
import BaseModal from '~/components/organisms/base-modal';
import ModalItem from '~/components/molecules/modal-item';
import ModalHeader from '~/components/molecules/modal-header';
import Highlight from '~/components/atoms/highlight';
import { mapGetters } from 'vuex';

export default {
  components: {
    SettingBox,
    Icon,
    BaseButton,
    BaseModal,
    ModalItem,
    ModalHeader,
    Highlight,
  },
  data() {
    return {
      shownModal: false,
    };
  },
  computed: {
    ...mapGetters({
      calendarUrl: 'activity-calendar/calendarUrl',
    }),
  },
  methods: {
    async createUrl() {
      return await this.$store.dispatch('activity-calendar/createUrl');
    },
    async createAndOpenModal() {
      await this.createUrl();
      this.shownModal = true;
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-button {
  display: flex;
  flex-flow: wrap;

  .base-button {
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin: 5px 0;
    margin-right: 10px;
  }

  .icon {
    margin-left: 10px;
  }
}

.description {
  font-size: 14px;
}

.calendar-url {
  border: 1px $border solid;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
}

@include mq(small) {
  .calendar-buttons {
    flex-direction: column;

    .base-button {
      height: 52px;
      width: 100%;
    }
  }
}
</style>
