<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <header>
      <form class="timer-form">
        <heading class="title">{{ $t('title') }}</heading>
        <project-tooltip />
        <input type="text" name="" value="" placeholder="何を始めますか？" />
        <base-button
          v-tooltip="{ content: '計測を始める', offset: 5 }"
          type="button"
          class="is-primary is-circle has-dropshadow add-button"
          @click="showModal"
        >
          <icon name="plus-icon" />
        </base-button>
      </form>
      <!-- <heading>{{ $t('title') }}</heading>
      <base-button
        type="button"
        class="is-primary is-circle has-dropshadow add-button"
        @click="showModal"
      >
        <icon name="plus-icon" />
      </base-button> -->
    </header>

    <!-- <base-button
      type="button"
      class="is-primary is-circle has-dropshadow add-button-sm"
      @click="showModal"
    >
      <icon name="plus-icon" />
    </base-button> -->
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
import ProjectTooltip from '@/components/molecules/project-tooltip';
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
    ProjectName,
    ProjectTooltip,
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
.timer-form {
  width: 100%;
  display: flex;
  align-items: center;
  // padding: 0 25px;
  border-bottom: 1px $grey-eee solid;
  // margin-bottom: 10px;
  // border-radius: 5px;
  padding: 0 40px;
  padding-left: 0;
  padding-right: 58px;
  box-sizing: border-box;
  box-shadow: 0 2px 3px #00000008;
}
.project-name {
  margin-right: 45px;
  // padding: 0 40px;
  display: flex;
  align-items: center;
  height: 60%;
  padding-right: 45px;
  border-right: 1px #eee solid;
}
.timer-form input {
  height: 100%;
  border: 0;
  flex: 1;
}
.add-button {
}
.add-button-sm {
  display: none;
}
.title {
  display: none;
}

@include mq(small) {
  .title {
    flex: 1;
    display: flex;
  }
  .timer-form {
    // display: none;
    padding: 0 30px;
  }
  .timer-form .project-name {
    width: 100px;
    display: none;
  }
  .timer-form input {
    width: 100px;
    display: none;
  }
  .add-button-sm {
    display: flex;
    position: fixed;
    z-index: 9999;
    width: 43px !important;
    height: 43px !important;
    bottom: 30px;
    right: 30px;
  }
}
</style>
