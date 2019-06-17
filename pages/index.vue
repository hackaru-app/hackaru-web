<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <content-header>
      <heading>Timers</heading>
      <base-button
        v-tooltip="'ここから計測を開始しましょう！'"
        type="button"
        class="is-primary is-circle add-button"
        @click="showModal"
      >
        <icon name="plus-icon" class="icon" />
      </base-button>
    </content-header>
    <activity
      v-for="activity in workings"
      :key="activity.id"
      v-bind="activity"
    />
    <activity-day
      v-for="prev in [0, 1, 2, 3, 4, 5, 6]"
      :key="prev"
      :day="`${addDays(new Date(), -prev)}`"
    />
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import ProjectName from '@/components/molecules/project-name';
import ContentHeader from '@/components/organisms/content-header';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ActivityDay from '@/components/organisms/activity-day';
import Activity from '@/components/organisms/activity';
import { mapGetters } from 'vuex';
import { addDays } from 'date-fns';

export default {
  components: {
    Dot,
    ContentHeader,
    ProjectName,
    Heading,
    Icon,
    BaseButton,
    ActivityDay,
    Activity
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
      workings: 'activities/workings'
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
