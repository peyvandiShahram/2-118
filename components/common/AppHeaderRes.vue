<template>
  <header class="c-header">
    <client-only>
      <v-container class="d-flex flex-wrap align-center">
        <v-row class="align-center">
          <v-col cols="1" class="pr-0">
            <div class="c-header__menu">
              <v-container
                class="d-flex flex-nowrap align-center pr-0"
                style="white-space: nowrap"
              >
              <!-- <v-icon 
                  color="#152d72"
                  size="30px" 
                  @click="open = !open"
              >
                mdi-menu
              </v-icon> -->
              <AppHeaderMenuRes
 
                :userInfo="user"
                @closeMenu="updateOpen"
               />

              </v-container>
            </div>
          </v-col>
          <v-col  cols="5">
            <div class="c-header__logo">
              <nuxt-link to="/">
                <img src="~/assets/img/logo/logo1.png" />
              </nuxt-link>
            </div>
          </v-col>
          <v-col cols="6" class="pl-0 text-center">
            <div dir="ltr" v-if="!user"  >
              <div class="btn-container">
                <nuxt-link to="/login">
                  <v-icon size="35px" color="#da920a">
                    mdi-account-outline
                  </v-icon>
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
            </div>
            <div class="d-flex" v-else>
              <v-menu transition="fab-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" sm v-on="on">
                  mdi-chevron-down
                </v-icon>
                <v-icon v-bind="attrs" medium v-on="on">
                  mdi-account
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
                    <a to="/">
                      خروج
                    </a>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>          
              <h4 class="ml-2">
                {{ user.name }} {{ user.family }}
              </h4>
            </div>
          </v-col> 
        </v-row>
      </v-container>
      <v-row class="menu-container">
        <v-col cols="3" style="padding:5px 10px">
          <nuxt-link to="/menu">
            <v-icon class="menu-icon" color="#152d72" size="25px">mdi-menu</v-icon>
            <p class="menu-title">دسته بندی</p>
          </nuxt-link>
        </v-col>
          <v-col cols="3" style="padding:5px 10px">
            <nuxt-link to="/تماس-با-ما">
              <v-icon class="menu-icon" color="#152d72" size="25px">mdi-phone-classic</v-icon>
              <p class="menu-title">تماس با ما</p>
            </nuxt-link>
          </v-col>
          <v-col cols="3" style="padding:5px 10px">
            <nuxt-link to="/">
              <v-icon class="menu-icon" color="#152d72" size="25px">mdi-home</v-icon>
              <p class="menu-title">خانه</p>
            </nuxt-link>
          </v-col>
          <v-col cols="3" style="padding:5px 10px">
            <nuxt-link to="/login">
              <v-icon class="menu-icon" color="#152d72" size="25px">mdi-account-arrow-right-outline</v-icon>
              <p class="menu-title">ثبت نام</p>
            </nuxt-link>
          </v-col>
        
      </v-row>
    </client-only>
  </header>
</template>

<script>
import Modal from "~/components/AppModal";
import CategoryFullAccordin from '~/components/Home/HomeCategoryFullAccordin'
import AppHeaderMenuRes from '~/components/common/AppHeaderMenuRes'
import Cookie from "js-cookie";

export default {
  components: {
    Modal,
    CategoryFullAccordin,
    AppHeaderMenuRes
  },
  data() {
    return {
      // drawer: false,
      drawer: true,
      showModal: false,
      open:false,
      show:false,
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
    updateOpen(){
      this.open=false
    },
    getState() {
      this.$nuxt.$loading.start();
      this.showCity = false;
      this.showModal = true;
      this.$axios.post("list_of_state").then(res => {
        this.states = res.data;
        this.$nuxt.$loading.finish();
      });
    },
    closeMoreTab(){
      this.show=false
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
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-container{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.c-header {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.16);
  padding: 5px 0px;
  color: #404040;
  margin-bottom: 10px;
}
.c-header__auth {
  font-size: 10px;
  font-weight: bold;
  border-radius: 4px;
  border: solid 1px #404040;
  padding: 6px 20px;
  display: block;
  text-align: center;
  a {
    color: #404040 !important;
  }
  @media (max-width: 600px){
    padding: 6px 15px;
  }
}
.c-header__menu {
  .c-header__menu--selected {
    @media (max-width: 768px) {
      font-size: 11px;
      font-weight: bold;
    }
  }
  .c-header__menu--city {
    font-size: 12px;
    @media (max-width: 768px) {
      font-size: 11px;
      font-weight: bold;
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
}
.meun-title {
  background: $primary;
  color: #fff;
  padding: 10px 10px;
}
.c-modal-useCity {

  padding: 20px;
  box-shadow: $bshadow2;
  ul {
    max-height: 400px;
    li {
      padding: 10px;
      border-bottom: solid 1px $border-color;
      cursor: pointer;
    }
  }
}
.c-modal-useCity__search {
  border: solid 1px $border-color;
  border-radius: $bradius;
  width: 100%;
  padding: 4px;
}


.mobile-bottom-menu {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999999999;
  &__header {
    display: flex;
    align-items: center;
    margin: 0;
    justify-content: space-between;
    @media (max-width: 900px) {
      padding: 15px 55px !important;
    }
    @media (max-width: 620px) {
      padding: 10px 5px !important;
    }
    li {
      a {
        font-weight: bold;
        font-size: 20px;
        position: relative;
        top: 4px;
        @media (max-width: 900px) {
        }
        @media (max-width: 620px) {
          font-size: 9px;
        }
      }
      .nuxt-link-exact-active {
        padding: 8px 10px 8px 10px;
        border-radius: 35px;

        text-decoration: none;
        color: white;
        background-color: #ffffff33;
        transition: 0.2s;
      }
    }
  }
}
.menu-container{
  padding-bottom: 10px;
  margin-top: 50px;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 99999999999999 !important;
  -webkit-box-shadow: 0px -10px 17px 0px rgba(194,194,194,1);
  -moz-box-shadow: 0px -10px 17px 0px rgba(194,194,194,1);
  box-shadow: 0px -10px 17px 0px rgba(194,194,194,1);
  p{
    margin-bottom: 0;
  }
} 
.menu-title{
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  color:#152d72 ;
  font-weight: 700;
}
.menu-icon{
  width:100%;
  text-align: center
}

</style>
