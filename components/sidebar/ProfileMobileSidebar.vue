<template>
  <div class="c-profile-aside">
    <div class="c-profile-user">
      <div class="c-profile__welcome">
        خوش آمدید
      </div>
      <h3 class="c-profile__username">{{ user.name }} {{ user.family }}</h3>
    </div>
    <div class="c-profile-menu">
      <ul>
        <li @click="$emit('closeTab')">
          <nuxt-link to="/profile/my-jobs">
            مشاغل من
          </nuxt-link>
        </li>
        <li @click="$emit('closeTab')">
          <nuxt-link to="/profile/jobs-favorite">
            مشاغل مورد علاقه
          </nuxt-link>
        </li>
        <li @click="$emit('closeTab')">
          <nuxt-link to="/profile/">
            تنظیمات کاربری
          </nuxt-link>
        </li>
      </ul>
      <div class="font-weight-bold pa-2">
        <nuxt-link class="create-job-link" to="/job/registration">
          ثبت رایگان مشاغل
        </nuxt-link>
      </div>
    </div>
    <div class="c-profile-exit" @click="exit()">
      <span>خروج</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async exit() {
      await this.$auth.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.create-job-link {
  padding: 8px 0;
  border-radius: 4px;
  border: solid 1px #132b73;
  font-size: 12px;
  display: block;
  text-align: center;
  color: #132b73;
}
.c-profile-aside {
  background: #fff;
  border-radius: $bradius;
  border: solid 1px $border-color;
  min-height: 590px;
  position: relative;
  .c-profile-user {
    padding: 15px 24px 14px 0px;
    border-bottom: solid 1px $border-color;
  }
  .c-profile__welcome {
    color: $text-color;
    font-size: 10px;
  }
  .c-profile__username {
    color: $title-color;
  }
  .c-profile-menu {
    ul {
      .c-profile-menu__item {
        padding: 20px 20px;
      }
      li {
        border-bottom: solid 1px $border-color;
        .c-profile-menu__item {
          padding: 15px 20px;
        }
        a {
          display: block;
          padding: 15px;
        }
      }
    }
  }
  .nuxt-link-exact-active {
    border-left: solid 2px $primary;
    color: $primary;
    font-weight: bold;
  }
  .c-profile-exit {
    width: 100%;
    position: absolute;
    bottom: 0;
    cursor: pointer;
    border-top: solid 1px $border-color;
    padding: 14px 0px;
    span {
      color: $text-color;
      padding: 0px 24px;
    }
  }
}
</style>
