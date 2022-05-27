<template>
    <div>
        <v-row>
            <v-icon 
                color="#152d72"
                size="30px" 
                @click.stop="drawer = !drawer"
            >
                mdi-menu
            </v-icon>
        </v-row>
            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                color="#152d72"
                style="z-index: 10000000000"
                @click="$emit('closeMenu')"
            >
            <div>
                <v-row class="user-img-container">
                    <v-icon class="user-img" color="#fff" size="80px">
                        mdi-account-circle
                    </v-icon>
                </v-row>
                <client-only>
                    <v-row v-if="userInfo">
                        <div class="userName">{{ user.name }} {{ user.family }}</div>
                    </v-row>
                    <v-row v-else>
                        <div class="userName">کاربر ناشناس</div>
                    </v-row> 
                    <v-row v-if="userInfo">
                        <div class="userName" style="color: #fff;font-size:12px">{{ user.email }}</div>
                    </v-row>
                </client-only>
            </div>
            <v-list dense>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    style="margin:15px 0"
                >
                <v-list-item-icon>
                    <v-icon color="#fff">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                    <nuxt-link :to="item.link">
                        <v-list-item-content>
                            <div class="link-title">{{ item.title }}</div>
                        </v-list-item-content> 
                    </nuxt-link >
                </v-list-item>
                <v-list-item
                    link
                    style="margin:15px 15px 15px 0"
                    @click="logout"
                     v-if="!userInfo"
                >
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-exit-to-app</v-icon>
                    </v-list-item-icon> 
                    <v-list-item-content>
                            <div class="link-title">خروج</div>
                    </v-list-item-content> 
                </v-list-item>
            </v-list>
            </v-navigation-drawer> 
    </div>
</template>
<script>
import Cookie from "js-cookie";

import CategoryFullAccordin from '~/components/Home/HomeCategoryFullAccordin'
  export default {
    props: {
        userInfo: {
            type: Object,
            require:true 
        },
    },
    components: {
        CategoryFullAccordin,
    },
    computed: {
        user() {
            this.$store.dispatch('fetchUser') 
            return this.$store.getters.getUser;
            
        },
    },
    data () {
      return {
        drawer:null,
        show:false,
        items: [
          { title: 'خانه', icon: 'mdi-home', link:'/' },
          { title: 'ثبت نام', icon: 'mdi-account-arrow-right-outline',link:'/login' },
          { title: 'جستجوی پیشرفته', icon: 'mdi-magnify',link:'/advance-search' },
          { title: 'تماس با ما', icon: 'mdi-phone-classic',link:'/تماس-با-ما' },
          { title: 'درباره ما', icon: 'mdi-information-outline',link:'/درباره-ما' },
          { title: 'دسته بندی', icon: 'mdi-menu',link:'/menu' },
        ],

      }
    },
    methods: {
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
    },

  }
</script>
<style scoped>
    .user-img-container{
        display: flex;
        justify-content: center;
    }
    .user-img{
        margin: 30px 0 0 15px;
    }
    .userName{
        width: 100%;
        text-align: center;
        color: #ffb637;
        font-size: 15px;
        font-weight: 700;
        margin-top: 10px;
    }
    .link-title{
        color: #fff;
        font-weight: 500;
        font-size: 15px;
    }
</style>