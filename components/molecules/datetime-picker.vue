<template>
  <div class="datetime-picker">
    <input
      ref="date"
      :value="date"
      data-test-id="date"
      class="date"
      type="date"
      step="1"
      @input="update"
    />
    <input
      ref="time"
      :value="time"
      data-test-id="time"
      class="time"
      type="time"
      step="1"
      @input="update"
    />
  </div>
</template>

<script>
import { format, formatISO, parseISO, isValid, isEqual } from 'date-fns';

export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      date: '',
      time: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        const date = parseISO(this.value);
        if (!isValid(date)) return;
        if (isEqual(this.getInputtedDate(), date)) return;
        this.date = format(date, 'yyyy-MM-dd');
        this.time = format(date, 'HH:mm:ss');
      },
    },
  },
  methods: {
    getInputtedDate() {
      if (this.$refs.date && this.$refs.time) {
        return parseISO(`${this.$refs.date.value}T${this.$refs.time.value}`);
      } else {
        return parseISO(new Date());
      }
    },
    update() {
      const date = this.getInputtedDate();
      this.$emit('input', isValid(date) ? formatISO(date) : undefined);
    },
  },
};
</script>

<style scoped lang="scss">
.datetime-picker {
  display: flex;
  flex: 1;
}

.datetime-picker input {
  background: none;
  border: 0;
  border-bottom: 1px $border solid;
  border-radius: 0;
  height: 46px;
  margin-right: 10px;
  max-width: 160px;
  width: 100%;

  &:last-child {
    margin-right: 0;
  }
}
</style>
