<template>
  <input :value="value" class="base-input" v-on="listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit('input', e.target.value);
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">
.base-input.has-border {
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 0 20px;
  height: 50px;
  font-size: $font-size;
  line-height: 1;
  background: none;
  border: 1px $border solid;
  transition: border-color 0.2s;
  margin-bottom: 15px;
  box-shadow: none;
  &::placeholder {
    color: $grey-999;
    opacity: 1;
  }
  &:focus {
    border-color: $yellow;
  }
  &:placeholder-shown {
    border-color: $border;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
@media (prefers-color-scheme: dark) {
  .base-input.has-border {
    background-color: $background-dark;
    border-color: transparent;
    &:placeholder-shown {
      border-color: transparent;
    }
  }
}
</style>
