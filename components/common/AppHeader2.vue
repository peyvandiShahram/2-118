<template>
  <header class="c-header">
    <client-only>
      <v-row>
        <v-col cols="2" class="c-header__logo">
          <nuxt-link to="/">
            <img src="~/assets/img/logo/logo1.png" />
          </nuxt-link>
        </v-col>
        <v-col cols="7" class="pa-0 mr-2 d-flex" style="margin-top:10px">
          <v-row>
            <v-col cols="3" style="padding-bottom: 17px" dir="rtl" class="d-flex">
              <AppHeaderMenu/>
              <p class="set">دسته بندی مشاغل</p>
            </v-col>
            <v-col cols="4" style="padding:12px 2px">
            <v-text-field
              v-model="textSearch"
              label="نام مشاغل یا کسب و کار"
              outlined
              hide-details="auto"
              dense
              height="30px"
              clearable
              class="fs-0-9"
            />
            </v-col>
            <v-col cols="2" style="padding:12px 2px">
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="500px"
                v-model="showModal"
              >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="yourCity.name"
              label="استان و شهر"
              outlined
              v-bind="attrs"
              v-on="on"
              hide-details="auto"
              clearable
              height="30px"
              dense
              class="fs-0-9"
              @click="getState"
              prepend-inner-icon="mdi-map-marker"
            />
          </template>
            <v-card class="c-modal-useCity">
              <v-card-text>
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
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @close="showModal = false"
                >بستن</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>

            </v-col>
            <v-col cols="1">
              <div class="c-header-search__btn" @click="search">
                <i class="icon-search" />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2">
            <div dir="ltr" v-if="!user" class="authIcon" >
              <nuxt-link to="/login">
                <v-icon size="35px" color="#da920a">
                    mdi-account
                </v-icon>
              </nuxt-link>
              <span style="width: 2px;background: gray;margin-right: 1rem;margin-left: 0.5rem"></span>
              <nuxt-link to="/profile">
                <button
                  class="c-header__auth"
                  style="background: #152d72; color:#fff"
                >
                  ثبت رایگان مشاغل
                </button>
              </nuxt-link>
            </div>
          <v-row v-else class="userAuth">
            <v-icon medium>
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
      <div class="c-header__menu" v-show="!scroll">
        <div class="d-flex flex-wrap align-center">
          <ul>
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
      </div>
    </client-only>
  </header>
</template>

<script>
import Modal from "~/components/AppModal";
import AppHeaderMenu from '~/components/common/AppHeaderMenu'
import Cookie from "js-cookie";

export default {
  components: {
    Modal,AppHeaderMenu
  },
  data() {
    return {
      scroll: null,
      textSearch: "",
      showModal: false,
      states: [],
      cities: [],
      yourCity: '',
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
    },
    search () {
      if (this.textSearch) {
        this.$router.push({
          path: `/search/?q=${this.yourCity.id}-${this.textSearch}`
        })
        setTimeout(()=>{
          this.$router.go(this.$router.currentRoute)
        },100)

      } else {
        this.$toast.global.msgSuccess({
          message: 'متنی برای جستجو وارد نمایید'
        })
      }
    },
    handleScroll(e) {
      this.scroll = window.scrollY || window.scrollTop
    }
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll);
    }

  },
  destroyed() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }
};
</script>

<style lang="scss" scoped>

.c-header {
  background: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.16);
  padding: 10px 20px 10px 10px;
  color: #404040;
  position: fixed;
  z-index: 10000;
  width: 100%;

  p{
    margin: 0 !important;
  }

}

.authIcon{
  display: flex;
  justify-content: left;
  margin-left: -40px;
}
.c-header__auth {
  font-size: 11px;
  font-weight: bold;
  border-radius: 4px;
  padding: 5px 15px;
  height: 100%;
  margin-right:10px ;
  a {
    color: #404040 !important;
  }
}
.userAuth{
  margin-top: 5px;
  direction: ltr;
}
.c-header-search__btn {
  background: #142d73;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  i {
    color: #fff;
    font-size: 19px;
    margin-top: 5px;
  }
}
.c-header__menu {
  margin-top: 5px;
  border-top: 1px solid #edededcf;
  padding-top: 0.5rem;
  li {
    display: inline;
    font-size: 15px;
    position: relative;
    a {
      color: #404040;
    }
  }
  ul li:not(:first-child) {
    margin-right: 30px;
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
.set{
  font-size: 15px;
  font-weight: 700;
  margin-top: 5px;
}


</style>
