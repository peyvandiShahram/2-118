<template>
  <div>
    <Slider />
    <AppSearch />
    <AppCategory id="category" class="c-category-lg"  />
    <CategoryRes id="category" class="c-category-sm" />
    <AppSpecialOffers />
    <Application />
  </div>
</template>

<script>
import Slider from '~/components/Home/HomeSlider'
import AppSearch from '~/components/Home/HomeSearch'
import AppCategory from '~/components/Home/HomeCategory'
import CategoryRes from '~/components/Home/HomeCategoryRes'
import AppSpecialOffers from '~/components/Home/HomeSpecialOffers'
import AppSpecialOffersMobile from '~/components/Home/HomeSpecialOffersMobile'
import Application from '~/components/Home/HomeApplication'


export default {
  components: {
    Slider,
    AppSearch,
    AppCategory,
    AppSpecialOffers,
    AppSpecialOffersMobile,
    Application,
    CategoryRes
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  @media only screen and (min-width: 690px){
    .c-category-sm{
        display: none;
      }
  }
  @media only screen and (max-width: 690px) {
    .c-category-lg {
      display: none;
    }
      
  }

</style>
