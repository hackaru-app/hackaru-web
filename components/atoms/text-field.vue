<template>
  <input :value="value" @input="input" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
input.has-border {
  display: flex;
  border-radius: 3px;
  padding: 12px 15px;
  font-size: $font-size;
  line-height: 1.2rem;
  border: 1px $grey-eee solid;
  transition: border-color 0.3s;
  box-shadow: 0 3px 3px #00000005 inset;
  margin-bottom: 15px;
  &::placeholder {
    color: $grey-999;
    opacity: 1;
  }
  &:focus {
    border-color: $yellow;
  }
  &:invalid {
    box-shadow: 0 3px 3px #00000005 inset;
  }
  &:placeholder-shown {
    border-color: $grey-eee;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
</style>
