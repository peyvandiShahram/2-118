<template>
  <div>
    <v-bottom-sheet fullscreen hide-overlay v-model="sheet" scrollable>
      <v-sheet
        class="sheet"
        style="z-index: 100000000000 !important; background:#f0f0f0 "
        height="100%"
      >
        <nuxt-link to="/">
          <v-btn
            class="mt-6"
            text
            color="#152d72"
            @click="$emit('closeTab')"
            dir="ltr"
            style="margin:0 5px 15px 0"
          >
            <v-icon size="30px">
              mdi-close-circle
            </v-icon>
          </v-btn>
        </nuxt-link>
        <v-row>
            <v-text-field
                v-model="textSearch"
                label="جست وجوي دسته بندي"
                outlined
                hide-details="auto"
                clearable
                dense
                prepend-inner-icon="mdi-magnify"
                class="search-input"
                background-color="#fff"
            />
        </v-row>
        <div class="c-category">
          <v-expansion-panels  class="mb-6">
            <v-expansion-panel
              v-for="(item,i) in items"
              :key="i"
              class="c-category-accordin"
            >
              <v-expansion-panel-header color="#f0f0f0">
                <v-img
                  max-height="30"
                  max-width="30"
                  :src="item.icon"
                />
                <span class="mr-2">{{ item.title }}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- //sub -->

                <v-expansion-panels accordion>
                  <v-expansion-panel
                    v-for="(subcat,index) in item.subgroup"
                    :key="index"
                    class="c-subcategory-accordin"
                  >
                    <v-expansion-panel-header color="#f0f0f0">
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
              <!-- //end sub -->
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
  async fetch () {
    const data = await this.$axios.post('list_of_office_groups')
    this.items = data.data
  },
  data () {
    return {
      items: [],
      cats: [],
      sheet:true,
      textSearch:''
    }
  },
  methods: {
    more () {
      this.$axios.post('list_of_office_groups')
        .then((res) => {
          this.cats = res.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-category {
  margin: 5px auto 1px auto;
  height: 600px;   
  overflow-y : scroll;
}

.c-category-accordin {
    margin-top: 5px !important;
    border-bottom: solid 2px #92939f;
    background: #f0f0f0;
}
.c-subcategory-accordin {
    background: #f0f0f0;
    ul{
        padding:0px 15px;
        background: #f0f0f0;
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
.search-input{
    margin: 10px 20px;
}
</style>
