<template>
  <div class="custom-container">
    <v-col cols="10" sm="11"  lg="10" class="c-category">
      <div v-swiper:category="categoryOptions" class="swiper">
        <div class="swiper-wrapper">

            <v-slide-group
              multiple
              show-arrows
            >
              <client-only>
                <v-slide-item
                  v-for="(item, index) in items" :key="index"
                >
                <div style="margin:0 2px">
                  <div class='c-home-category__item'
                  @click="showTabCategory(index)">
                    <img :src="item.icon" width="52px">
                  </div>
                  <div class="icon-title">{{ item.title }}</div>
                </div>
                </v-slide-item>
              </client-only>
            </v-slide-group>

        </div>
      </div>
    </v-col>
    <v-expand-transition>
      <CategoryTab v-if="showTab" :items="subs" :title="title" @closeTab="closeTab()" />
    </v-expand-transition>
  </div>
</template>

<script>
import CategoryTab from '~/components/Home/HomeCategoryTab'


export default {
  components: {
    CategoryTab,
  },

  data () {
    return {
      showTab: false,
      active_el: 0,
      items: [],
      subs: [],
      title: '',
      categoryOptions: {
        slidesPerView: 7,
        slidesPerGroup: 11,
        lazy: true,
        navigation: {
          nextEl: '.c-category__next',
          prevEl: '.c-category__prev'
        }

      }
    }
  },
  methods: {
    async fetch () {
      const data = await this.$axios.post('list_of_office_groups')
      this.items = data.data
    },
    showTabCategory (index) {
      this.subs = this.items[index].subgroup
      this.title = this.items[index].title
      this.showTab = true
      if (this.active_el === index + 1) {
        this.showTab = false
        this.active_el = 0
      } else { this.active_el = index + 1 }
    },
    closeTab () {
      this.showTab = false
      this.active_el = 0
    }
  },
  created () {
    this.fetch();
  },
}
</script>

<style lang="scss" scoped>
.icon-title{
  text-align: center;
  font-family: IRANSans, tahoma !important;
  font-size:10px ;
  font-weight: 700;
  width: 100px;
}
.c-category {
    margin: 65px auto 1px auto;
    position: relative;
    .c-home-category__item {
        border-radius: 15px;
        background: #fff;
        border: solid 1px $primary;
        // box-shadow: $bshadow2;
        cursor: pointer;
        text-align: center;
        height: 90px;
        margin: 0 auto;
        width: 100px;
        img {
            padding: 15px 5px 5px 5px;
        }
    }
    .c-category__prev,
    .c-category__next {
      top: calc(50% - 30px);
      position: absolute;
      z-index: 2;
      cursor: pointer;
      color: $primary;
      
    }
    .c-category__next {
      left: -20px;
    }
    .c-category__prev {
      right: -20px;
    }
    .category__active {
      background: $primary;
      color: #fff;
      border-radius:20px 20px 0px 0px;
    }
    .swiper-slide {
      margin-right: 10px;
    }
    .c-home-category__item:hover{
      border-color: #fff;
    -webkit-box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    -moz-box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    }
}

@media only screen and (max-width: 900px) {
    .c-category {
      padding: 10px;
      margin: 0px 10px 1px 10px;
    }
}
</style>
