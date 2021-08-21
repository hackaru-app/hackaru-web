<template>
  <div class="highlight">
    <slot />
  </div>
</template>

<style lang="scss">
.highlight {
  background: $highlight-background;
  border-radius: 8px;
  padding: 20px 25px;
}
</style>
