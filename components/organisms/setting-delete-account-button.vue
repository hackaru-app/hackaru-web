<i18n
  src="~/assets/locales/components/organisms/setting-delete-account-button.json"
></i18n>

<template>
  <setting-box>
    <base-modal :shown.sync="shownModal">
      <form @submit.prevent="deleteAccount">
        <modal-header>
          {{ $t('modal.title') }}
        </modal-header>
        <modal-item>
          <icon name="alert-triangle-icon" class="icon alert-icon" />
          <p class="warning-message">{{ $t('modal.warning') }}</p>
        </modal-item>
        <modal-item>
          <input
            v-model="currentPassword"
            :placeholder="$t('modal.currentPassword')"
            type="password"
            data-test-id="current-password"
            required
          />
        </modal-item>
        <modal-footer>
          <base-button type="submit" class="submit-button is-rounded is-danger">
            {{ $t('modal.delete') }}
          </base-button>
        </modal-footer>
      </form>
    </base-modal>

    <template #heading>
      <icon name="user-x-icon" class="icon" />
      {{ $t('title') }}
    </template>

    <base-button
      class="is-rounded is-danger"
      data-test-id="delete-account-button"
      type="button"
      @click="showDeleteAccountModal"
    >
      {{ $t('deleteButton') }}
    </base-button>
  </setting-box>
</template>

<script>
import Icon from '~/components/atoms/icon';
import BaseButton from '~/components/atoms/base-button';
import SettingBox from '~/components/molecules/setting-box';
import BaseModal from '~/components/organisms/base-modal';
import ModalItem from '~/components/molecules/modal-item';
import ModalHeader from '~/components/molecules/modal-header';
import ModalFooter from '~/components/molecules/modal-footer';

export default {
  components: {
    Icon,
    BaseButton,
    SettingBox,
    BaseModal,
    ModalItem,
    ModalHeader,
    ModalFooter,
  },
  data() {
    return {
      shownModal: false,
      currentPassword: '',
    };
  },
  methods: {
    showDeleteAccountModal() {
      this.shownModal = true;
    },
    async deleteAccount() {
      if (!window.confirm(this.$t('confirms'))) return;
      const success = await this.$store.dispatch('auth/deleteAccount', {
        currentPassword: this.currentPassword,
      });
      if (success) {
        this.$mixpanel.reset();
        this.$ga.event({
          eventCategory: 'Accounts',
          eventAction: 'delete',
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.alert-icon {
  flex-shrink: 0;
  margin-right: 15px;
}
.warning-message {
  margin: 15px 0;
}
</style>
