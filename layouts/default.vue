<template>
  <v-app>
      <div class="header-lg">
      <AppHeader v-if="$nuxt.$route.path === '/'" />
       <AppHeader2 v-else/> 
    </div> 
     <div class="d-none header-sm">
      <AppHeaderRes />
    </div> 
    <v-main>
      <nuxt />
    </v-main>
     <AppFooter /> 
  </v-app>
</template>

<script>
import AppHeader from '~/components/common/AppHeader'
import AppHeader2 from '~/components/common/AppHeader2'
import AppHeaderRes from '~/components/common/AppHeaderRes'
import AppFooter from '~/components/common/footer/AppFooter'

export default {

  componen: {
    AppHeader,
    AppHeader2,
    AppFooter,
    AppHeaderRes
  }
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 900px) {
  .header-lg {
    display: none;
  }
  .header-sm {
    display: block !important;
  }
}
</style>
