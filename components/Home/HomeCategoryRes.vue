<template>
  <div >
    <div class="c-category">
      <v-row class="swiper">
        <client-only>
          <div  class="icons ">
            <div  v-for="(item,index) in cats.length < 1 ? items : cats" :key="index">
              <div :class="[{ category__active : active_el == index + 1},'c-home-category__item']"
              @click="showTabCategory(index,item)">
                <img :src="item.icon" width="70%">
              </div>
              <div class="item-title">{{ item.title }}</div>
            </div>
            <div class="c-home-category__item more-item" @click="more=true">
                <v-icon size="30px" color="#152d72">
                  mdi-dots-horizontal
                </v-icon>
                <div class="more-title">بیشتر</div>
            </div>
          </div>
        </client-only>
      </v-row>
    </div>
    <v-expand-transition>
      <CategoryAccordin v-if="showTab" :items="subs" :title="title" @closeTab="closeTab()" />
      <CategoryFullAccordin v-if="more" @closeTab="closeMoreTab()" />
    </v-expand-transition>
  </div>
</template>

<script>
import CategoryAccordin from '~/components/Home/HomeCategoryAccordin'
import CategoryFullAccordin from '~/components/Home/HomeCategoryFullAccordin'

export default {
  components: {
    CategoryAccordin,
    CategoryFullAccordin
  },

  data () {
    return {
      showTab: false,
      active_el: 0,
      items: [],
      subs: [],
      cats:[],
      title: '',
      more:false
    }
  },
  methods: {
    async fetch () {
      const data = await this.$axios.post('list_of_office_groups')
      this.items = data.data.splice(0, 4)
    },
    showTabCategory (index,item) {
      this.subs = item.subgroup
      this.title = item.title
      this.showTab = true
      if (this.active_el === index + 1) {
        this.showTab = false
        this.active_el = 0
      } else { this.active_el = index + 1 }
    },
    closeTab () {
      this.showTab = false
      this.active_el = 0
    },
    closeMoreTab(){
      this.more=false
    }
  },
  created () {
    this.fetch();
  },
}
</script>

<style lang="scss" scoped>
.swiper-wrapper{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  
}
.icons{
  margin: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.more-item{
  height: 67px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
.more-title{
  flex-basis: 100%;
  font-weight: 700;
  text-align: center;
  font-size: 15px;
  color: #152d72;
}
.c-category {
    margin-top: 30px;
    .c-home-category__item {
        border-radius: 10px;
        background: #fff;
        border: solid 2px $primary;
        cursor: pointer;
        text-align: center;
        width: 65px;
        img {
            padding: 15px 5px;
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
    .category__active {
      background: $primary;
      color: #fff;
      border-radius:20px 20px 0px 0px;
    }
    .c-home-category__item:hover{
      border-color: #fff;
    -webkit-box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    -moz-box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    box-shadow: 10px 11px 15px 0px rgba(153,153,153,1);
    }
}
.item-title{
  width: 100%;
  text-align: center;
  font-size: 6px;
  font-weight: 700;
  padding: 5px 17px ;
}
@media only screen and (max-width: 600px) {
    .c-category {
        padding: 10px;
        margin-top: 5px;
    }
}
</style>
