<template>
  <div class="c-header">
    <client-only>
      <v-row>
        <v-col cols="6" class="c-header__menu">
          <div class="custom-container">
            <ul class="header_title">
              <li class="d-flex">
                <AppHeaderMenu />
                  نام مشاغل یا کسب و کار
              </li>
              <li>
                <nuxt-link to="/تماس-با-ما">
                  <div class="c-header-icon__bg" />
                  <i class="icon-contact" />
                  تماس با ما
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/درباره-ما">
                  <div class="c-header-icon__bg" />
                  <i class="icon-aboutus" />
                  درباره ما
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/قوانین-و-مقررات">
                  <div class="c-header-icon__bg" />
                  <i class="icon-terms" />
                  قوانین و مقررات
                </nuxt-link>
              </li>
            </ul>
          </div>
        </v-col>
        <v-col cols="2" class="c-header__logo">
          <nuxt-link to="/">
            <img src="~/assets/img/logo/logo1.png" />
          </nuxt-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col dir="ltr" cols="3" style="padding-bottom:5px" v-if="!user" >
          <div class="btn-container">
            <nuxt-link to="/profile">
              <button class="c-header__auth">
                ورود/ثبت نام
                <v-icon size="20px" color="#da920a">
                  mdi-account-outline
                </v-icon>
              </button>
            </nuxt-link>
            <nuxt-link to="/profile">
              <button
                class="c-header__auth"
                style="background: #152d72; color:#fff"
              >
                ثبت رایگان مشاغل
              </button>
            </nuxt-link>
          </div>
        </v-col>
        <v-col cols="3" v-if="user" >
          <v-row class="userAuth">
            <v-icon  medium>
                mdi-account
            </v-icon>
            <v-menu transition="fab-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" sm v-on="on">
                mdi-chevron-down
              </v-icon>
            </template>
            <v-list>
              <v-list-item v-for="item in menuItems" :key="item.i">
                <v-list-item-title>
                  <nuxt-link :to="item.link">
                    {{ item.title }}
                  </nuxt-link>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="logout">
                  <a href="/">
                    خروج
                  </a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
            </v-menu>
            <h4 class="ml-2">
              {{ user.name }} {{ user.family }}
            </h4>
          </v-row>
        </v-col>
      </v-row>
      <modal :show="showModal" class="pa-4" @close="showModal = false">
        <v-col lg="6" cols="12" class="c-modal-useCity">
          <i class="icon-closefill close-modal" @click="showModal = false" />
          <div v-if="showCity == false">
            <h4>انتخاب استان</h4>
            <ul>
              <li
                v-for="(state, index) in states"
                :key="state.i"
                @click="sendState(index)"
              >
                {{ state.name }}
              </li>
            </ul>
          </div>
          <div v-else>
            <h4>انتخاب شهر</h4>
            <ul>
              <li
                v-for="(city, index) in cities"
                :key="city.i"
                @click="setCity(index)"
              >
                {{ city.name }}
              </li>
            </ul>
          </div>
        </v-col>
      </modal>
    </client-only>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import Modal from "~/components/AppModal";
import AppHeaderMenu from '~/components/common/AppHeaderMenu'
export default {
  components: {
    Modal,
    AppHeaderMenu
  },
  data() {
    return {
      showModal: false,
      states: [],
      cities: [],
      yourCity: this.$cookies.get("city"),
      stateSearch: "",
      showCity: false,
      menuItems: [
        { title: "تنظیمات کاربری", link: "/profile" },
        { title: "مشاغل من", link: "/profile/my-jobs" }
      ]
    };
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    getState() {
      this.$nuxt.$loading.start();
      this.showCity = false;
      this.showModal = true;
      this.$axios.post("list_of_state").then(res => {
        this.states = res.data;
        this.$nuxt.$loading.finish();
      });
    },
    sendState(index) {
      this.$axios
        .post("list_state_city", {
          id: index + 1
        })
        .then(res => {
          this.cities = res.data[0].city;
          // console.log(this.cities)
          this.showCity = true;
        });
    },
    setCity(index) {
      this.$cookies.set("city", this.cities[index]);
      this.yourCity = this.$cookies.get("city");
      this.showModal = false;
    },
    async logout() {
      await this.$auth.logout();
      Cookie.remove("jwt");
      Cookie.remove("user");
      if (process.client) {
        localStorage.removeItem("auth.token");
        localStorage.removeItem("auth.user");
      }
      this.$store.state.userInfo=null
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.header_title{
  display: flex;
  flex-wrap: nowrap;
}
.c-header {
  background: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.16);
  padding: 5px 0px;
  color: #404040;
  z-index: 100000000 !important;
  position: fixed;
  width: 100%;
}
.c-header__logo {
  margin-right: -30px;
}
.userAuth{
  direction: ltr;
  margin-top: 5px;
  margin-left: 30px;
}
.c-header__auth {
  font-size: 13px;
  font-weight: bold;
  border-radius: 4px;
  border: solid 2px #152d72;
  padding: 5px 10px;
  color: #152d72;
  left: 40px;

}
.btn-container{
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.c-header__menu {
  padding-bottom:0 12px;
  margin: 10px 0 5px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  li {
    display: inline;
    font-size: 15px;
    position: relative;
    a {
      color: #404040;
    }
  }
  ul li:not(:first-child) {
    margin-right: 20px;
  }
  @media (max-width: 1264px){
    margin: 15px 0;
    li {
      display: inline;
      font-size: 12px;
      position: relative;
      font-weight: 700;
  }
    ul li:not(:first-child) {
      margin-right: 10px;
    }
  }
  .insert-job {
    padding: 4px 19px;
    border-radius: 4px;
    border: solid 1px $primary;
    font-size: 12px;
    a {
      color: $primary !important;
    }
  }
  .c-header__menu--city {
    font-size: 12px;
  }
  .c-header-icon__bg {
    background: #da9228;
    width: 17px;
    height: 17px;
    position: absolute;
    display: inline-block;
    opacity: 0.5;
    border-radius: 50%;
    bottom: 8px;
    right: 3px;
  }
  i {
    vertical-align: middle;
    color: $primary;
    font-size: 16px;
    margin-left: 5px;
  }
}
.c-modal-useCity {
  position: relative;
  background: #fff;
  border-radius: $bradius2;
  padding: 20px;
  box-shadow: $bshadow2;
  ul {
    max-height: 400px;
    overflow-y: scroll;
    li {
      padding: 10px;
      border-bottom: solid 1px $border-color;
      cursor: pointer;
    }
  }
  i {
    position: absolute;
    left: 20px;
    cursor: pointer;
  }
}
.c-modal-useCity__search {
  border: solid 1px $border-color;
  border-radius: $bradius;
  width: 100%;
  padding: 4px;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: $bradius2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: $bradius2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: $bradius2;
}
.scroll {
  unicode-bidi: bidi-override;
  direction: ltr;
  overflow: scroll;
  overflow-x: hidden !important;
}
</style>
