<template>
  <v-app>
    <div class="header-lg">
      <AppHeader v-if="$nuxt.$route.path === '/'" />
      <AppHeader2 v-else />
    </div>
    <div class="d-flex d-sm-none">
      <AppHeaderRes />
    </div>
    <v-main>
      <v-container>
        <v-row class="profile">
          <ProfileSidebar />
          <v-col lg="9" cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from "~/components/common/AppHeader";
import AppHeader2 from "~/components/common/AppHeader2";
import AppFooter from "~/components/common/footer/AppFooter";
import ProfileSidebar from "~/components/sidebar/ProfileSidebar.vue";
import AppHeaderRes from "~/components/common/AppHeaderRes";

export default {
  middleware: ["checkAuth", "isAuthenticated"],
  componen: {
    AppHeader,
    AppFooter,
    ProfileSidebar,
    AppHeader2,
    AppHeaderRes
  }
};
</script>

<style lang="scss" scoped>
.profile {
  padding-top: 140px;
  padding-bottom: 50px;
  background: #fff;
}
@media only screen and (max-width: 960px) {
  .profile {
    padding-top: 0px;
  }
}
@media only screen and (max-width: 600px) {
  .header-lg {
    display: none;
  }
}
</style>
