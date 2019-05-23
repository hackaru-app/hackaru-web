<i18n src="@/assets/locales/pages/settings/index.json" />

<template>
  <setting-box>
    <base-modal name="deleteAccount">
      <form class="delete-account" @submit.prevent="deleteAccount">
        <modal-header>
          <h1>{{ $t('deleteAccountModal.title') }}</h1>
        </modal-header>
        <modal-item>
          <icon name="alert-triangle-icon" class="icon alert-icon" />
          {{ $t('deleteAccountModal.warning') }}
        </modal-item>
        <modal-item>
          <input
            v-model="deleteAccountForm.currentPassword"
            :placeholder="$t('deleteAccountModal.currentPassword')"
            type="password"
            required
          />
        </modal-item>
        <modal-footer>
          <base-button type="submit" class="is-rounded is-danger">
            {{ $t('deleteAccountModal.delete') }}
          </base-button>
        </modal-footer>
      </form>
    </base-modal>

    <template v-slot:heading>
      <icon name="user-x-icon" class="icon" />
      {{ $t('titles.deleteAccount') }}
    </template>

    <base-button
      class="is-rounded delete-account-button is-danger"
      type="button"
      @click="showDeleteAccountModal"
    >
      {{ $t('deleteAccount') }}
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
    ModalFooter
  },
  data() {
    return {
      deleteAccountForm: {
        currentPassword: ''
      }
    };
  },
  methods: {
    async showDeleteAccountModal() {
      this.$modal.show('deleteAccount');
    },
    async deleteAccount() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      const success = await this.$store.dispatch('auth/deleteAccount', {
        ...this.deleteAccountForm
      });
      if (success) {
        this.$ga.event('auth', 'deleteAccount');
        window.location.assign(this.localePath('index'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.alert-icon {
  flex-shrink: 0;
  margin-right: 15px;
}
</style>
