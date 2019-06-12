<template>
  <section class="project-tooltip">
    <button class="button" type="button" @click="showTip = !showTip">
      <project-name color="#ccc" name="No Project" class="selected" />
    </button>
    <!-- <transition name="fade">
      <div v-if="showTip" class="tip">
        <div class="item">
          <project-name
            color="#ccc"
            name="No Project"
          />
          <base-button
            class="has-icon edit-button"
            type="button"
          >
            <icon name="edit-3-icon" class="is-primary edit-icon" />
          </base-button>
        </div>
        <div class="item">
          <project-name
            color="#ccc"
            name="No Project"
          />
          <base-button
            class="has-icon edit-button"
            type="button"
          >
            <icon name="edit-3-icon" class="is-primary edit-icon" />
          </base-button>
        </div>
        <div class="add">
          <icon name="plus-icon" />
          新規
        </div>
      </div>
    </transition> -->
  </section>
</template>

<script>
import Icon from '@/components/atoms/icon';
import ProjectName from '@/components/molecules/project-name';
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    Icon,
    ProjectName,
    BaseButton
  },
  data() {
    return {
      showTip: false
    };
  }
};
</script>

<style scoped lang="scss">
.project-tooltip {
  position: relative;
  width: 180px;
  display: flex;
  box-sizing: border-box;
  height: 90px;
  align-items: center;
  margin-right: 45px;
}
.button {
  display: flex;
  align-items: center;
  height: 100%;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 100%;
  border: 0;
}
.button:hover {
}
.selected {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60%;
  padding: 0 40px;
  border-right: 1px #eee solid;
}
.tip {
  display: flex;
  flex-direction: column;
  border-radius: 0 0 5px 0;
  width: 300px;
  box-shadow: 0 3px 5px #00000008;
  position: absolute;
  top: 90px;
  left: 0;
  border: 1px $grey-eee solid;
  border-left: 0;
  border-top: 0;
  background-color: #fff;
  background-color: #fff;
  z-index: 999;
}
.item {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-top: 1px $grey-f5f5f5 solid;
  cursor: pointer;
  &:hover {
    background-color: $grey-fdfdfd;
  }
  .project-name {
    flex: 1;
    margin-left: 20px;
  }
  .edit-icon {
    margin-top: 3px;
    width: 20px;
    height: 20px;
  }
}
.add {
  height: 60px;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding: 0 35px;
  border-top: 1px $grey-f5f5f5 solid;
  .icon {
    margin-right: 8px;
  }
}
</style>
