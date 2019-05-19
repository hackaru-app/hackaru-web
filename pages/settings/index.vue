<i18n src="@/assets/locales/pages/settings/index.json" />

<template>
  <section>
    <modal-wrapper name="deleteAccount">
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
            class="input inline"
            required
          />
        </modal-item>
        <modal-footer>
          <btn type="submit" class="is-rounded is-danger">
            {{ $t('deleteAccountModal.delete') }}
          </btn>
        </modal-footer>
      </form>
    </modal-wrapper>

    <article>
      <heading class="is-small">
        <icon name="mail-icon" class="icon" />
        {{ $t('titles.email') }}
      </heading>
      <form class="email" @submit.prevent="changeEmail">
        <text-field
          v-model="emailForm.email"
          :placeholder="$t('email')"
          type="email"
          class="has-border"
          required
          @focus="$event.target.select()"
        />
        <text-field
          v-model="emailForm.currentPassword"
          :placeholder="$t('password')"
          type="password"
          class="has-border"
          required
        />
        <btn class="is-rounded is-primary" type="submit">{{
          $t('update')
        }}</btn>
      </form>
    </article>
    <article>
      <heading class="is-small">
        <icon name="lock-icon" class="icon" />
        {{ $t('titles.password') }}
      </heading>
      <form class="password" @submit.prevent="changePassword">
        <text-field
          v-model="passwordForm.currentPassword"
          :placeholder="$t('password')"
          type="password"
          class="has-border"
          size="1"
          required
        />
        <text-field
          v-model="passwordForm.password"
          :placeholder="$t('newPassword')"
          type="password"
          class="has-border"
          size="1"
          required
        />
        <text-field
          v-model="passwordForm.passwordConfirmation"
          :placeholder="$t('confirmNewPassword')"
          type="password"
          class="has-border"
          size="1"
          required
        />
        <btn class="is-rounded is-primary" type="submit">{{
          $t('update')
        }}</btn>
      </form>
    </article>
    <article>
      <heading class="is-small">
        <icon name="globe-icon" class="icon" />
        {{ $t('titles.language') }}
      </heading>
      <locale-select />
    </article>
    <article>
      <heading class="is-small">
        <icon name="log-out-icon" class="icon" />
        {{ $t('titles.logout') }}
      </heading>
      <btn
        class="is-rounded logout-button is-primary"
        type="button"
        @click="logout"
      >
        Logout
      </btn>
    </article>
    <article>
      <heading class="is-small">
        <icon name="user-x-icon" class="icon" />
        {{ $t('titles.deleteAccount') }}
      </heading>
      <btn
        class="is-rounded delete-account-button is-danger"
        type="button"
        @click="showDeleteAccountModal"
      >
        {{ $t('deleteAccount') }}
      </btn>
    </article>
  </section>
</template>

<script>
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';
import Btn from '@/components/atoms/btn';
import TextField from '@/components/atoms/text-field';
import LocaleSelect from '@/components/molecules/locale-select';
import ModalWrapper from '@/components/organisms/modal-wrapper';
import ModalItem from '@/components/molecules/modal-item';
import ModalLabel from '@/components/molecules/modal-label';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';

export default {
  components: {
    Icon,
    Heading,
    Btn,
    TextField,
    LocaleSelect,
    ModalWrapper,
    ModalItem,
    ModalLabel,
    ModalHeader,
    ModalFooter
  },
  data() {
    return {
      emailForm: {
        email: this.$store.getters['auth/getEmail'],
        currentPassword: ''
      },
      passwordForm: {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      },
      deleteAccountForm: {
        currentPassword: ''
      }
    };
  },
  methods: {
    async changeEmail({ store }) {
      const success = await this.$store.dispatch('auth/changeEmail', {
        ...this.emailForm
      });
      if (success) this.$toast.success(this.$t('changed.email'));
    },
    async changePassword({ store }) {
      const success = await this.$store.dispatch('auth/changePassword', {
        ...this.passwordForm
      });
      if (success) this.$toast.success(this.$t('changed.password'));
    },
    async logout() {
      if (!window.confirm(this.$t('confirms.logout'))) return;
      this.$ga.event('auth', 'logout');
      await this.$store.dispatch('auth/logout');
      window.location.assign(this.localePath('index'));
    },
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
article {
  padding: 0 40px;
  padding-bottom: 40px;
  background-color: $white;
  border-bottom: 1px $border solid;
  h1 {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    margin-top: 5px;
    height: 90px;
  }
}
article form {
  display: flex;
  flex-direction: column;
  button {
    align-self: flex-start;
    margin-top: 10px;
  }
}
.alert-icon {
  flex-shrink: 0;
  margin-right: 15px;
}
@include mq(small) {
  article {
    padding-left: 30px;
    padding-right: 30px;
  }
  .empty {
    padding: 20px 0;
    width: 100%;
  }
}
</style>
