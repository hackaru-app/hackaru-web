<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <content-header>
      <heading>{{ $t('title') }}</heading>
      <base-button
        type="button"
        class="is-primary is-circle has-dropshadow add-button"
        @click="showModal"
      >
        <icon name="plus-icon" />
      </base-button>
    </content-header>

    <activity-day
      v-for="prev in [0, 1, 2, 3, 4, 5, 6]"
      :key="prev"
      :day="`${addDays(new Date(), -prev)}`"
    />
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import ContentHeader from '@/components/organisms/content-header';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ActivityDay from '@/components/organisms/activity-day';
import { mapGetters } from 'vuex';
import { addDays } from 'date-fns';

export default {
  components: {
    Dot,
    ContentHeader,
    Heading,
    Icon,
    BaseButton,
    ActivityDay
  },
  head: {
    title: 'Timers'
  },
  data() {
    return {
      addDays
    };
  },
  computed: {
    ...mapGetters({
      activities: 'activities/workings'
    })
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
    this.$store.dispatch('activities/fetchByRange', {
      start: addDays(new Date(), -7),
      end: new Date()
    });
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.add-button {
  margin-right: -5px;
}
</style>
