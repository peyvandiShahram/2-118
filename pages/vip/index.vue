<template>
    <div>
        <v-row class="ads-container">
            <v-col cols="4">
                <v-card height="40vh">
                    <v-card-title>درج تبلیغات</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-carousel 
                    v-model="model"
                    cycle
                    show-arrows-on-hover
                    hide-delimiters 
                    height="42vh"
                >
                    <v-carousel-item
                    v-for="(color, i) in colors"
                    :key="color"
                    >
                    <v-sheet
                        :color="color"
                        height="100%"
                        tile
                    >
                        <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                        >
                        <div class="text-h2">
                            تبلیغات {{ i + 1 }}
                        </div>
                        </v-row>
                    </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <div class="search-box">
            <AppSearch  />
        </div>
        <v-row class="tab-bar">
            <v-card class="filter-container" width="100%" rounded>
                <v-tabs
                    background-color="#fff"
                    height="30"
                >
                    <div class="order-title">
                        <v-icon size="25px">
                            mdi-order-bool-ascending-variant
                        </v-icon>
                        :مرتب سازی بر اساس
                    </div>
                    <v-tab @click="newest()">
                    جدیدترین
                    </v-tab>
                    <v-tab @click="popular()">
                    محبوب ترین
                    </v-tab>
                    <v-tab @click="discount()">
                     تخفیف دار
                    </v-tab>
                    <v-tab @click="all()">
                    همه
                    </v-tab>
                </v-tabs>
            </v-card>
        </v-row>

        <div class="items-accordion" >
          <v-expansion-panels  class="mb-6">
            <v-expansion-panel>
              <v-expansion-panel-header color="#fff">
                <span class="mr-2">{{acTitle}}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                        hide-actions
                        @click="changeTitle(0); discount()"
                    >
                      تخفیف دار
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                        hide-actions
                        @click="changeTitle(1); newest()"
                    >
                      جدید ترین
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header
                        hide-actions
                        @click="changeTitle(2); popular()"
                    >
                      محبوب ترین
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header
                        hide-actions
                        @click="changeTitle(3);all()"
                    >
                      همه
                    </v-expansion-panel-header>
                  </v-expansion-panel>                  
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>








        <v-row style="margin:0 20px 20px 20px">
            <v-col cols="12" sm="6" md="3" v-for="(item,index) in showItem" :key="index" >
                <nuxt-link :to="'/business/' + item.office_id">
                    <v-card
                        rounded
                        class="card-container"
                    >
                        <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                        </template>

                        <v-img
                            class="card-img"
                            :src="item.logo"
                        >
                        </v-img>
                        <div>
                            <img class="tab-logo" src="~/assets/img/logo/logo.png" alt="">
                        </div>
                        <v-card-title style="color:#152d72;padding:10px 16px" >{{item.title}}</v-card-title>
                        <v-card-text style="padding:5px 16px;height:70px">
                        <div>{{aboutJob(item.about)}}</div>
                        </v-card-text>
                        <v-chip-group style="margin-bottom:10px">
                            <v-chip disabled>{{item.group_title}}</v-chip>
                        </v-chip-group>
                        <v-row >
                            <div class="item-btns">
                                <v-btn color="#152d72" width="35%" dark>
                                    <v-icon color="#fff" size="25px">mdi-map</v-icon>
                                    نقشه
                                </v-btn>
                                <v-btn color="#152d72" width="35%" dark>
                                    <v-icon color="#fff" size="25px">mdi-phone</v-icon>
                                    تماس
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card>
                </nuxt-link>
            </v-col>
        </v-row>
        <v-row v-if="results.length>7">
            <div class="showMore" @click="showMore= !showMore">
                <p v-if="showMore">نمایش کمتر</p>
                <p v-else  >نمایش بیشتر</p>
            </div>
        </v-row>
    </div>
</template>

<script>
import AppSearch from '~/components/Home/HomeSearch'

  export default {
    components: {
        AppSearch,
    },
    data: () => ({
      model: 0,
      up:false,
      showMore:false,
      title:'محبوب ترین',
      item:[
        {title: 'تخفیف دار', func:()=>{this.discount()}},
        {title:'جدید ترین', func:()=>{this.newest()}},
        {title:'محبوب ترین', func:()=>{this.popular()}},
        {title:'همه', func:()=>{this.all()}}
      ],
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      results:[]
    }),
    methods: {
        changeTitle(index){
            this.title=this.item[index].title
        },
        async popular() {
            const data = await this.$axios.post("/search_customer", {
                ordering: "popular"
            });
            this.results = data.data;
        },
        async newest() {
            const data = await this.$axios.post("/search_customer", {
                ordering: "newest"
            });
            console.log(data)
            this.results = data.data;
        },
        async discount(){
            const data = await this.$axios.post("/search_customer", {
                ordering: "discounted"
            });
            this.results = data.data;
        },
        async all(){
            const data = await this.$axios.post("/search_customer", {
                ordering: ""
            });
            this.results = data.data;
        },
        aboutJob(about) {
            if (about && about.length >= 100) {
                return about.substring(0, 100) + "...";
            } else {
                return about;
            }
        },
        show(index) {
            if(index<8)
                return true
            return false 
        }
    },
    computed: {
        acTitle() {
            return this.title
        },
        showItem(){
            if(!this.showMore)
                return this.results.splice(0, 8)
            return this.results
        }
    },
    mounted () {
        this.newest();
    },
  }
</script>

<style lang="scss" scoped>
    .ads-container{
        margin: 125px 20px 20px;
    }
    .filter-container{
        font-size: 15px;
        font-weight: 700;
        margin: 0 40px 30px 40px;
        border:2px solid #dedede;
        border-radius: 20px;
        padding: 15px 50px;
    }
    .more{
        margin-top:-70px
    }
    .showMore{
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #152d72;
        font-weight: 700;
        margin-bottom: 30px;
        cursor: pointer;
    }
    .items-accordion{
        padding: 5px 15px;
    }
    .card-container{
        border-radius: 20px;
        .card-img{
            height: 150px;
        }
        .item-btns{
            display: none;
        }
        .tab-logo{
        width: 45px;
        height: 45px;
        border-radius: 50px;
        background: #fff;
        padding: 5px;
        position: absolute;
        top: 115px;
        right: 12px;
        }
        &:hover{
            .card-img{
                height: 100px;
            }
            .item-btns{
                width: 100%;
                display: flex;
                justify-content: space-around;
                font-size: 15px;
                font-weight: 700;
                color: #fff;
                padding-bottom: 10px ;
            }
            .tab-logo{
                top: 65px;
            }

        }
    }
    @media only screen and (min-width: 690px){
        .search-box {
            display: none;
        }
        .items-accordion{
            display: none;
        }
    }
    @media only screen and (max-width: 690px) {
        .ads-container{
            display: none;
        }
        .tab-bar{
            display: none;
        }

    }

        
   

</style>