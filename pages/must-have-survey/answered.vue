<i18n src="~/assets/locales/pages/must-have-survey/answered.json"></i18n>

<template>
  <section class="wrapper">
    <login-guard />
    <span class="emoji">✉️</span>
    <h1 class="title">{{ $t('thanks') }}</h1>
    <p class="description">
      {{ $t('description')[0] }}<br />{{ $t('description')[1] }}
    </p>

    <footer class="footer">
      <base-button class="is-rounded is-primary" @click="back">
        {{ $t('back') }}
      </base-button>
    </footer>
  </section>
</template>

<script>
import LoginGuard from '~/components/atoms/login-guard';
import BaseButton from '~/components/atoms/base-button';

export default {
  components: {
    LoginGuard,
    BaseButton,
  },
  methods: {
    back() {
      this.$router.replace(this.localePath('index'));
    },
  },
};
</script>

<style scoped lang="scss">
.emoji {
  font-size: 40px;
}
.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 40px 25px;
}
.title {
  font-size: 21px;
  font-weight: normal;
  margin-bottom: 10px;
}
.description {
  color: $text-light;
  text-align: center;
}
.footer {
  margin-top: 30px;
}
</style>
