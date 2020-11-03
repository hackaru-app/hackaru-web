<i18n src="@/assets/locales/components/organisms/pwa-popover.json"></i18n>

<template>
  <section class="pwa-popover">
    <v-popover :open="opened" data-test-id="popover" class="popover">
      <span class="tooltip-target" />
      <template slot="popover">
        <div class="content">
          <section class="logo">
            <img src="@/assets/logo.svg" class="logo-icon" />
          </section>
          <section class="about">
            <h1>{{ $t('title') }}</h1>
            <i18n path="about" tag="p">
              <icon name="share-icon" class="share-icon" />
            </i18n>
          </section>
        </div>
      </template>
    </v-popover>
  </section>
</template>

<script>
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';

export default {
  timers: {
    hide: {
      time: 10000,
      autostart: true,
    },
  },
  components: {
    Icon,
    BaseButton,
  },
  data() {
    return {
      opened: false,
    };
  },
  mounted() {
    const learned = localStorage.getItem('pwaPopover');
    const pwa = this.$platform.isPWA();
    const ios = this.$platform.isIOS();
    this.opened = !learned && !pwa && ios;
  },
  methods: {
    hide() {
      this.opened = false;
      localStorage.setItem('pwaPopover', true);
    },
  },
};
</script>

<style scoped lang="scss">
.pwa-popover {
  display: flex;
  justify-content: center;
  width: 100%;
}
.popover {
  position: absolute;
  z-index: index($z, pwa-popover);
  right: 140px;
  top: 0;
}
.content {
  position: relative;
  justify-content: center;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
}
.logo {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  background: $background-dark;
  border-radius: 3px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  .logo-icon {
    width: 20px;
    height: 20px;
  }
}
.about {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1px;
  h1 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: $font-size;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
    padding-right: 10px;
    display: flex;
    color: $grey-666;
  }
}
.share-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
@include mq(small) {
  .popover {
    top: auto;
    right: auto;
    bottom: 15px;
  }
}
</style>
