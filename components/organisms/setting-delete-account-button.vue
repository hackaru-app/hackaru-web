<i18n
  src="@/assets/locales/components/organisms/setting-delete-account-button.json"
></i18n>

<template>
  <setting-box>
    <base-modal name="deleteAccount">
      <form @submit.prevent="deleteAccount">
        <modal-header>
          <h1>{{ $t('modal.title') }}</h1>
        </modal-header>
        <modal-item>
          <icon name="alert-triangle-icon" class="icon alert-icon" />
          {{ $t('modal.warning') }}
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

    <template v-slot:heading>
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
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import BaseInput from '@/components/atoms/base-input';
import SettingBox from '@/components/molecules/setting-box';
import BaseModal from '@/components/organisms/base-modal';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';

export default {
  components: {
    Icon,
    BaseButton,
    BaseInput,
    SettingBox,
    BaseModal,
    ModalItem,
    ModalHeader,
    ModalFooter,
  },
  data() {
    return {
      currentPassword: '',
    };
  },
  methods: {
    async showDeleteAccountModal() {
      this.$modal.show('deleteAccount');
    },
    async deleteAccount() {
      if (!window.confirm(this.$t('confirms'))) return;
      const success = await this.$store.dispatch('auth/deleteAccount', {
        currentPassword: this.currentPassword,
      });
      if (success) {
        this.$gtm.trackEvent({
          eventCategory: 'Accounts',
          eventAction: 'delete',
          name: 'delete_account',
          component: 'setting_delete_account_button',
        });
        window.location.assign(this.localePath('index'));
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
</style>
