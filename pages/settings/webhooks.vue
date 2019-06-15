<i18n src="@/assets/locales/pages/settings/webhooks.json" />

<template>
  <section>
    <base-modal name="webhook">
      <form @submit.prevent="addWebhook">
        <modal-header>
          <h1>{{ $t('modalTitle') }}</h1>
        </modal-header>
        <modal-item>
          <label>
            {{ $t('event') }}
          </label>
          <select v-model="event" class="event-select">
            <option v-for="event in events" :key="event" :value="event">
              {{ $t(`events.${event}`) }}
            </option>
          </select>
        </modal-item>
        <modal-item>
          <label>
            {{ $t('targetUrl') }}
          </label>
          <input
            v-model="targetUrl"
            type="url"
            class="target-url"
            placeholder="https://"
          />
        </modal-item>
        <modal-footer>
          <base-button type="submit" class="is-rounded is-primary">
            {{ $t('add') }}
          </base-button>
        </modal-footer>
      </form>
    </base-modal>

    <section class="content">
      <header class="header">
        <heading class="is-small">
          <icon name="anchor-icon" />
          {{ $t('title') }}
        </heading>
        <base-button
          type="button"
          class="is-primary is-circle add-button"
          @click="showModal"
        >
          <icon name="plus-icon" />
        </base-button>
      </header>

      <div v-for="webhook in webhooks" :key="webhook.id" class="webhook">
        <p>{{ $t(`events.${webhook.event}`) }}</p>
        <h1>{{ webhook.targetUrl }}</h1>
        <base-button
          type="button"
          class="delete-button has-icon"
          @click="deleteWebhook(webhook.id)"
        >
          <icon name="x-icon" class="is-danger" />
        </base-button>
      </div>

      <p v-if="webhooks.length <= 0" class="empty">
        {{ $t('empty') }}
      </p>
    </section>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Icon from '@/components/atoms/icon';
import ContentHeader from '@/components/organisms/content-header';
import BaseModal from '@/components/organisms/base-modal';
import BaseButton from '@/components/atoms/base-button';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import { mapGetters } from 'vuex';

export default {
  components: {
    Heading,
    ContentHeader,
    Icon,
    BaseModal,
    ModalItem,
    ModalHeader,
    ModalFooter,
    BaseButton
  },
  data() {
    const events = [
      'activity:created',
      'activity:stopped',
      'activity:updated',
      'activity:deleted',
      'project:created',
      'project:updated',
      'project:deleted'
    ];
    return {
      event: events[0],
      targetUrl: '',
      events
    };
  },
  computed: {
    ...mapGetters({
      webhooks: 'webhooks/all'
    })
  },
  mounted() {
    this.$store.dispatch('webhooks/fetch');
  },
  methods: {
    async addWebhook({ store }) {
      const success = await this.$store.dispatch('webhooks/add', {
        event: this.event,
        targetUrl: this.targetUrl
      });
      if (success) {
        this.$modal.hide('webhook');
        this.$ga.event('webhook', 'addWebhook');
        this.$toast.success(this.$t('added'));
      }
    },
    deleteWebhook(id) {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('webhooks/delete', id);
      this.$ga.event('webhook', 'deleteWebhook');
      this.$toast.success(this.$t('deleted'));
    },
    showModal() {
      this.targetUrl = '';
      this.event = this.events[0];
      this.$modal.show('webhook');
    }
  }
};
</script>

<style scoped lang="scss">
.event-select {
  flex: 1;
  box-sizing: border-box;
  border: 0;
  background: none;
  appearance: none;
  cursor: pointer;
  margin: 0;
  padding-right: 30px;
  height: 42px;
  box-sizing: border-box;
}
.header {
  display: flex;
  border-bottom: 1px $border solid;
  align-items: baseline;
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
.content {
  padding: 0 40px;
  padding-bottom: 50px;
  background-color: $white;
}
.webhook {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
}
.webhook h1 {
  flex: 1;
  font-size: $font-size;
  font-weight: normal;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.webhook p {
  margin-right: 20px;
  color: $text-light;
}
.empty {
  padding: 15px 0;
  color: $text-light;
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
