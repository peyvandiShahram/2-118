<template>
  <div class="text-center">
    <v-icon 
      color="#152d72"
      size="30px" 
      @click.stop="drawer = !drawer"
      >
        mdi-menu
    </v-icon>
    <div  @click.stop="drawer = !drawer" style="position:relative" >  
    <v-overlay :value="drawer" >
      <div class="list-container">  
        <v-list light>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-menu
              nudge-left="200px"
              z-index="999999999999"
            > 
              <template v-slot:activator="{ on, attrs }">
                <div class="menu-item"  v-bind="attrs" v-on="on" >
                  <img :src="item.icon" style="margin-right:10px" width="30px">
                  <v-list-item-title >{{ item.title }}</v-list-item-title>
                  <v-icon size="20">
                    mdi-chevron-left
                  </v-icon>
                </div>  
              </template>
              <v-list>
                <v-list-item
                  v-for="(info, num) in items[index].subgroup"
                  :key="num"
                  
                >
                  <v-list-item-title>{{ info.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </div>  
    </v-overlay>
    </div>
  </div>
</template>
<script>
  export default {

    async fetch () {
      const data = await this.$axios.post('list_of_office_groups')
      this.items = data.data
    },
    data: () => ({
      items: [],
      subs:[],
      open:false,
      offset: true,
      drawer: false,
    }),
    methods: {
      showTabCategory (index) {
        this.subs = this.items[index].subgroup
        this.open=true
      },
    },
  }
</script>
<style scoped>
  .innerMenu{
    margin-right: 100px;
  }
  .menu-item{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .list-container{
    position: absolute;
    top: -250px;
    right: -510px;
    direction: rtl;
    z-index:9999999999999 !important ;
  }
  @media only screen and (max-width: 1100px){
    .list-container{
      top:-320px
    }
  } 
  .menuable__content__active{
    z-index: 99999999999999999;
  }
</style>