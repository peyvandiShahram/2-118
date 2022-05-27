<template>
  <div>
    <v-bottom-sheet fullscreen hide-overlay v-model="sheet">
      <v-sheet
        class="sheet"
        style="z-index: 100000000 !important; background:#efefef "
        height="100%"
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
        <div class="c-category">
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(subcat,index) in items"
              :key="index"
              class="c-subcategory-accordin"
            >
              <v-expansion-panel-header>
                {{ subcat.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <ul class="c-category__tabs--item">
                  <li v-for="sub in subcat.subgroup" :key="sub.i">
                    <nuxt-link :to="'/cat/' + sub.id">
                      {{ sub.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
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

<style lang="scss" scoped>
.c-category {
    margin: 5px auto 1px auto;
}

.c-category-accordin {
    margin-top: 5px !important;
    border-radius: 5px !important;
    box-shadow: $box-shadow !important;
    border-bottom: solid 2px $primary;
}
.c-subcategory-accordin {
    box-shadow: unset !important;
    background: #f4f4f4 !important;
    ul{
        padding:0px 15px;
        background: #fff;
        li {
            padding: 10px;
            margin-top: 10px;
            border-top: solid 1px $border-color;
        }
    }
}
.show-more {
  font-size: 16px;
  margin-top: 15px;
  color: $primary;
  background: #fff;
  padding: 5px 33px;
  border-radius: $bradius;
  box-shadow: $bshadow2;
  i {
    font-size: 12px !important;

  }
}
@media only screen and (max-width: 600px) {
    .c-category {
        padding: 10px;
    }
}
</style>
