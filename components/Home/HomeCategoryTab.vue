<template>
  <div >
    <v-bottom-sheet  hide-overlay v-model="sheet">
      <v-sheet
        class="sheet"
        style="z-index: 100000000 !important; background:#efefef "
      >
        <v-btn
          class="mt-6"
          text
          color="#152d72"
          @click="$emit('closeTab')"
          dir="ltr"
          style="margin-right:30px"
        >
          <v-icon size="30px">
            mdi-close-circle
          </v-icon>
        </v-btn>
          <section class="c-category__tabs">
            <div>
              <v-tabs vertical>
                <span class="v-home-category__tab--title">{{ title }}</span>
                <v-tab v-for="item in items" :key="item.i">
                  <img :src="item.icon" width="30px">
                  <div class="mr-2 c-category__tabs--item">
                    {{ item.title }}
                  </div>
                </v-tab>
                <v-tab-item v-for="item in items" :key="item.i">
                      <ul class="c-category__tabs--item">
                        <li v-for="sub in item.subgroup" :key="sub.i">
                          <nuxt-link :to="'/cat/' + sub.id">
                            {{ sub.title }}
                          </nuxt-link>
                        </li>
                      </ul>
                </v-tab-item>
              </v-tabs>
            </div>
          </section>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>


<script>
export default {
  props: {
    items: {
      default: null,
      type: Array
    },
    title: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      sheet: true
    }
  },
}
</script>

<style lang="scss">
.c-category__tabs {
      margin: 5px auto 24px auto;
      border-radius: 15px 15px 0px 15px;
      background:#efefef;
      padding: 0 100px;
      .v-tabs.v-tabs--vertical.theme--light {
        min-height: 500px;
      }
    .v-tabs-bar {
        padding: 10px 0px;
        background: #fff !important;
        border-radius:15px;
        margin-left: 20px;
        border-top: solid 2px #152d72;
    }
    .v-tabs-items {
        padding:10px 50px 10px 10px;
        border-radius: 15px;
        border-top: solid 2px #152d72;
        width: 500px !important;
    }
    .v-tab {
        justify-content: start;
    }
    .v-tab--active {
        color: #404040 !important;
        background: #fff;
    }
    .v-tabs-slider-wrapper {
        display: none;
    }
    .c-category__tabs--item li {
      font-size: 13px;
      font-weight: 500;
      float: right;
      width: 26%;
      margin-top: 12px;
    }
    .c-category__tabs--item ul:not(:first-child){
      border-right: solid 1px red;
    }
    .v-home-category__tab--title {
      font-size: 20px;
      font-weight: bold;
      color: #292929;
      margin-right: 10px;
    }

}
</style>
