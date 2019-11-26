<template>
  <div class="datetime-picker">
    <input
      :value="date"
      class="date"
      type="date"
      step="1"
      @input="updateDate"
      @focus="setCurrent"
    />
    <input
      :value="time"
      class="time"
      type="time"
      step="1"
      @input="updateTime"
      @focus="setCurrent"
    />
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';
const timeFormat = 'HH:mm:ss';

export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      date: '',
      time: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (!this.value) return;
        this.date = format(parseISO(this.value), dateFormat);
        this.time = format(parseISO(this.value), timeFormat);
      }
    }
  },
  methods: {
    update(date, time) {
      const datetime = parseISO([date, time].join(' '));
      const formatString = `${dateFormat} ${timeFormat} XXX`;
      this.$emit(
        'input',
        isNaN(datetime) ? undefined : format(datetime, formatString)
      );
    },
    updateDate(e) {
      this.update(e.target.value, this.time);
    },
    updateTime(e) {
      this.update(this.date, e.target.value);
    },
    setCurrent() {
      this.update(
        this.date || format(new Date(), dateFormat),
        this.time || format(new Date(), timeFormat)
      );
    }
  }
};
</script>

<style scoped lang="scss">
.datetime-picker {
  display: flex;
  flex: 1;
}
.datetime-picker input {
  margin-right: 10px;
  border: 0;
  width: 100%;
  max-width: 160px;
  height: 46px;
  border-radius: 0;
  background: none;
  border-bottom: 1px $border solid;
  &:last-child {
    margin-right: 0;
  }
}
</style>
