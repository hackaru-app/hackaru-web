<template>
  <article>
    <header class="header">
      <heading class="is-small">
        <slot name="heading" />
      </heading>
      <p class="description">
        <slot name="description" />
      </p>
    </header>
    <slot />
  </article>
</template>

<script>
import Heading from '~/components/atoms/heading';

export default {
  components: {
    Heading,
  },
};
</script>

<style scoped lang="scss">
article {
  border-bottom: 1px $border solid;
  margin: 0 40px;
  padding-bottom: 40px;

  h1 {
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    margin-top: 35px;
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

.header {
  margin-bottom: 25px;
}

.description {
  color: $text-light;
  margin-bottom: 30px;
  margin-top: 15px;
}

@include mq(small) {
  article {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
