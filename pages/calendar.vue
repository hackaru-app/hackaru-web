<i18n src="~/assets/locales/pages/calendar.json"></i18n>

<template>
  <section>
    <date-header
      :title="title"
      :has-today="hasToday"
      data-test-id="date-header"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />

    <loop-slider
      v-slot="{ slideStyle }"
      ref="slider"
      :enabled="sliderEnabled"
      data-test-id="loop-slider"
      @slide-left="prev"
      @slide-right="next"
    >
      <section class="sticky">
        <div :style="slideStyle" class="headers-wrapper">
          <div v-for="page in [-1, 0, 1]" :key="page" class="headers">
            <calendar-day-header
              v-for="day in getDays(page)"
              v-show="loaded"
              :key="formatISO(day)"
              :day="formatISO(day)"
            />
          </div>
        </div>
      </section>

      <section class="contents-wrapper">
        <section :style="slideStyle" class="contents">
          <calendar-content :days="[]" class="slider-item" />
          <calendar-content
            :days="days"
            class="slider-item"
            @dragging="sliderEnabled = false"
            @drop="sliderEnabled = true"
          />
          <calendar-content :days="[]" class="slider-item" />
        </section>
      </section>
    </loop-slider>
  </section>
</template>

<script>
import DateHeader from '~/components/organisms/date-header';
import LoopSlider from '~/components/organisms/loop-slider';
import CalendarContent from '~/components/organisms/calendar-content';
import CalendarDayHeader from '~/components/organisms/calendar-day-header';
import { mapGetters } from 'vuex';
import {
  isSameDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isToday,
  format,
  formatISO,
  addDays,
  eachDayOfInterval,
} from 'date-fns';

export default {
  components: {
    LoopSlider,
    CalendarContent,
    CalendarDayHeader,
    DateHeader,
  },
  data() {
    return {
      addDays,
      formatISO,
      isToday,
      sliderEnabled: true,
      date: new Date(),
      sliding: undefined,
      loaded: false,
    };
  },
  head: {
    title: 'Calendar',
  },
  computed: {
    ...mapGetters({
      startDay: 'user/startDay',
    }),
    title() {
      return format(this.date, this.$t('format') || 'yyyy/MM');
    },
    days() {
      return this.getDays(0);
    },
    hasToday() {
      return isSameDay(
        startOfWeek(new Date(), { weekStartsOn: this.startDay }),
        startOfWeek(this.date, { weekStartsOn: this.startDay })
      );
    },
  },
  watch: {
    date: {
      handler: 'fetchActivities',
    },
    startDay: {
      handler: 'fetchActivities',
    },
  },
  async activated() {
    this.$store.dispatch('projects/fetch');
    await this.$store.dispatch('user/fetch');
    this.fetchActivities();
    this.loaded = true;
  },
  methods: {
    async fetchActivities() {
      await this.$store.dispatch('activities/fetchByRange', {
        start: startOfWeek(this.date, { weekStartsOn: this.startDay }),
        end: endOfWeek(this.date, { weekStartsOn: this.startDay }),
      });
    },
    getDays(page) {
      const baseDate = addWeeks(this.date, page);
      return eachDayOfInterval({
        start: startOfWeek(baseDate, { weekStartsOn: this.startDay }),
        end: endOfWeek(baseDate, { weekStartsOn: this.startDay }),
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    prev() {
      this.$mixpanel.track('Show prev calendar', {
        component: 'calendar',
      });
      const current = startOfWeek(this.date, { weekStartsOn: this.startDay });
      this.date = addWeeks(current, -1);
    },
    next() {
      this.$mixpanel.track('Show next calendar', {
        component: 'calendar',
      });
      const current = startOfWeek(this.date, { weekStartsOn: this.startDay });
      this.date = addWeeks(current, 1);
    },
    today() {
      this.$mixpanel.track('Show today calendar', {
        component: 'calendar',
      });
      this.date = new Date();
    },
  },
};
</script>

<style scoped lang="scss">
.sticky {
  background-color: $background-translucent;
  border-bottom: 1px $border-dark solid;
  box-shadow: 0 3px 3px $shadow;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: index($z, calendar-day-header);
}

.headers-wrapper {
  display: flex;
}

.headers {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-width: 100%;
  padding-left: 60px;
  height: 65px;
}

.contents-wrapper {
  overflow: hidden;
}

.contents {
  display: flex;
}

.slider-item {
  min-width: 100%;
}

@include mq(small) {
  .sticky {
    top: $side-bar-min-height;
  }

  .headers {
    padding-left: 25px;
  }
}
</style>
