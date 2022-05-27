<template>
  <v-col lg="3" cols="12">
    <div
      class="c-profile-aside__mobile d-lg-none d-xl-flex"
      @click="show = !show"
    >
      منو
    </div>
    <transition name="slide-fade">
      <ProfileMobileSidebar v-if="show" @closeTab="closeMenu" />
    </transition>
    <div class="c-profile-aside responsive">
      <div class="c-profile-user">
        <div class="c-profile__welcome">
          خوش آمدید
        </div>
        <h3 class="c-profile__username">{{ userInfo.name }} {{ userInfo.family }}</h3>
      </div>
      <div class="c-profile-menu">
        <ul>
          <li>
            <nuxt-link to="/profile/my-jobs">
              <i class="icon-myworks" />
              مشاغل من
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile/jobs-favorite">
              <i class="icon-suitheart" />
              مشاغل مورد علاقه
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile/">
              <i class="icon-setting" />
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
        <span>
          <i class="icon-logout" />
          خروج</span
        >
      </div>
    </div>
  </v-col>
</template>

<script>
import ProfileMobileSidebar from "~/components/sidebar/ProfileMobileSidebar.vue";

export default {
  components: {
    ProfileMobileSidebar
  },
  data() {
    return {
      show: false,
      userInfo:''
    };
  },
  //  computed: {
  //    user() {
  //      this.$store.dispatch('fetchUser')
  //      return this.$store.getters.getUser;
  //    }
  //  },
  methods: {
    async exit() {
      await this.$auth.logout();
      this.$router.push("/");
    },
    user() {
      this.$store.dispatch('fetchUser')
      this.userInfo= this.$store.getters.getUser;
    },
    closeMenu(){
      this.show=false
    }
  },
   mounted () {
     this.user();
   },
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
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 70px;
  margin-bottom: 35px;
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
        i {
          font-size: 19px;
          vertical-align: middle;
          margin-left: 10px;
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
      font-weight: bold;
    }
    i {
      font-size: 19px;
      vertical-align: middle;
      margin-left: 10px;
      color: $primary;
    }
  }
}

// responsive mobile
.c-profile-aside__mobile {
  background: #fff;
  border-radius: $bradius;
  border: solid 1px $border-color;
  padding: 15px 24px 14px 0px;
  margin-bottom: 10px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 10px;
  margin-top: 10px;
}
@media only screen and (max-width: 600px) {
  .responsive {
    display: none;
  }
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
