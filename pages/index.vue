<template>
  <section class="index">
    <big-timer class="big-timer" />
    <div class="content">
      <section class="day">
        <h1>一昨日<span>・月曜日</span></h1>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <p></p>
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
      </section>
      <section class="day">
        <h1>3日前<span>・日曜日</span></h1>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
        <article>
          <project-name
            class="project"
            color="#4ab8b8"
            name="データベースの構築"
          />
          <time>01:23:45</time>
          <base-button type="button" class="has-icon repeat-button">
            <icon name="repeat-icon" />
          </base-button>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
import BigTimer from '@/components/organisms/big-timer';
import ProjectName from '@/components/molecules/project-name';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    BigTimer,
    ProjectName,
    Icon,
    BaseButton
  },
  head: {
    title: 'Timer'
  }
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.big-timer {
  width: 100%;
}
.content {
  width: 100%;
  margin-top: 90px;
}
.project {
  flex: 1;
}
.day {
  padding: 0 0;
  margin-top: 50px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px $border solid;
}
.day article {
  display: flex;
  border-top: 1px $border solid;
  border-radius: 5px;
  padding: 23px 50px;
  .project {
    margin-right: 20px;
  }
}
.day h1 {
  font-size: 18px;
  font-weight: normal;
  margin-left: 40px;
  padding-bottom: 10px;
  span {
    font-size: 16px;
    color: $text-light;
  }
}
.day p {
  margin: 0;
  padding: 0;
  flex: 1;
}
.day time {
  color: $text-light;
  font-family: $font-family-duration;
  margin-right: 20px;
}
@include mq(small) {
  .day {
    margin-top: 80px;
  }
  .day:first-child {
    margin-top: 40px;
  }
  .day h1 {
    margin-left: 30px;
  }
  .day article {
    padding: 23px 30px;
  }
  .day time {
    margin-right: 0;
  }
  .repeat-button {
    display: none;
  }
}
</style>
