<template>
  <section class="c-home-offers">
    <v-container style="padding:0 20px">
       <v-row dir="ltr">
        <div class="c-home-offers__tab">
          <ul>
            <li :class="[active == 4 ? 'active' : '']" @click="all()">
              همه
            </li>
            <li :class="[active == 1 ? 'active' : '']" @click="popular()">
              محبوب ترین
            </li>
            <li :class="[active == 2 ? 'active' : '']" @click="newest()">
              جدید ترین
            </li>
            <li :class="[active == 3 ? 'active' : '']" @click="discount()">
              تخفیف دار
            </li>
          </ul>
        </div>
      </v-row> 
      <v-row align="center">
        <v-col v-if="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm" md="2" cols="12" class="c-home-offers__title">
          <div v-if="active == 1">
            <div>محبوب ترین</div>
          </div>
          <div v-if="active == 2">
            <div>جدیدترین</div>
          </div>
          <div v-if="active == 3">
            <div>تخفیف دار</div>
          </div>
          <div v-if="active == 4">
            <div>همه</div>
          </div>                    
        </v-col>

        <v-col cols="10" sm="9" md="10" style="margin-left:-58px">
          <v-row>
            <div v-swiper:specialOffers="specialOffersOptions" class="swiper">
              <div class="swiper-wrapper">
                <v-col 
                  cols="5" 
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="(item, index) in results"
                  :key="index"
                  style="padding:5px"
                  class="swiper-slide"
                >
                <nuxt-link :to="'/business/' + item.office_user_id">
                  <div class="c-home-offers__item">
                    <img class="img" :src="item.logo" :alt="item.title" />
                    <div >
                      <img class="tab-logo" src="~/assets/img/logo/logo.png" alt="">
                    </div>
                    <div class="c-home-offers__item-content">
                        <h3>{{jobTitle(item.title)}}</h3>
                        {{ item.group_id }}
                      <p>
                        {{ aboutJob(item.about) }}
                      </p>
                      <div class="more-info" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" >
                        <div  style="margin-bottom:10px">
                          <v-chip disabled>{{item.group_title}}</v-chip>
                        </div>
                        <v-row >
                          <div class="item-btns">
                              <v-btn color="#152d72" small dark>
                                  <v-icon color="#fff" size="20px">mdi-map</v-icon>
                                  نقشه
                              </v-btn>
                              <v-btn color="#152d72" small dark>
                                  <v-icon color="#fff" size="20px">mdi-phone</v-icon>
                                  تماس
                              </v-btn> 
                          </div>
                        </v-row>
                        <v-row dir="ltr">
                          <div class="like-container">
                            <v-col cols="6" class="like-container" style="padding:12px 2px">
                              <span>
                              ({{ item.rating }})
                              </span>
                              <v-rating
                                v-model="item.rating"
                                background-color="#92939f"
                                color="yellow accent-4"
                                dense
                                readonly
                                hover
                                size="12"
                              ></v-rating>
                            </v-col>
                            <v-col cols="4" style="padding:12px 2px">
                              <div class="tab-like">
                                <v-icon size="15">mdi-eye</v-icon>
                                {{item.count_of_like}}
                                <v-icon color="red" size="15" @click.prevent.self="like(item.office_user_id)">
                                  mdi-heart-outline
                                </v-icon>
                              </div>
                            </v-col>
                          </div>
                        </v-row>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
                </v-col>
                <v-spacer v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" ></v-spacer>
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col cols="1" md="2">
          <nuxt-link to="/vip">
            <div class="c-home-offers__showAll">
              <div v-if="active == 1">
                <h3>مشاهده محبوب ترین </h3>
              </div>
              <div v-if="active == 2">
                <h3>مشاهده جدیدترین</h3>
              </div>
              <div v-if="active == 3">
                <h3>مشاهده تخفیف دار</h3>
              </div>
              <div v-if="active == 4">
                <h3>مشاهده همه‌ موارد</h3> 
              </div>
            </div>
          </nuxt-link> 
        </v-col> 
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Favorit from "~/components/common/AppFavorit";

export default {
  components: {
    Favorit
  },
  data() {
    return {
      active: 3,
      rating: 4.3,
      link: "",
      results: [],
      specialOffersOptions: {
        slidesPerView: "auto"
      }
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      this.active = 1;
      const data = await this.$axios.post("/search_customer", {
        ordering: "popular"
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
    jobTitle(title) {
      if (title && title.length >= 15) {
        return title.substring(0, 15) + "...";
      } else {
        return title;
      }
    },
    jobImage(src){
      if(src==='http://65.21.119.84:3066/upload/null')
        return  
      return src
    },
    async popular() {
      this.active = 1;
      const data = await this.$axios.post("/search_customer", {
        ordering: "popular"
      });
      this.results = data.data;
    },
    async newest() {
      this.active = 2;
      const data = await this.$axios.post("/search_customer", {
        ordering: "newest"
      });
      this.results = data.data;
    },
    async discount(){
      this.active = 3;
      const data = await this.$axios.post("/search_customer", {
        ordering: "discounted"
      });
      this.results = data.data;
    },
    async all(){
      this.active = 4;
      const data = await this.$axios.post("/search_customer", {
        ordering: ""
      });
      this.results = data.data;
    },
    async like(id){
      if(this.user.token)
      {     
        try {
              await this.$axios.post("/add_office_like",{
                token:this.user.token,
                office_user_id:id,
                state:1
              })
              this.$toast.global.msgSuccess({
                message: "لایک شما ثبت شد"
              });
            } catch (err) {
              console.log(err);
              this.$toast.global.msgError({
                message: "خطایی رخ داده است لطفا مجدد تلاش کنید"
              });
            }
      }
      else{
        this.$toast.global.msgError({
          message: "برای لایک کردن ابتدا وارد حساب کاربری خود شوید"
        });
      }
    }
  },
  computed: {
    user() {
        this.$store.dispatch('fetchUser')
        return this.$store.getters.getUser;
    }
  },
};
</script>

<style lang="scss" scoped>
.c-home-offers__tab {
  background: #fff;
  display: flex;
  justify-content: left;
  margin-top: 10px;
  margin-left: -80px;
  padding: 5px 10px !important;
  border-radius: $bradius;
  position: relative;

  ul {
    display: flex;
    justify-content: space-around;
    background: #eeeef0;
    border-radius: $bradius;
    padding: 5px !important;
    li {
      text-align: center;
      font-weight: bold;
      display: inline-block;
      cursor: pointer;
      padding:5px 20px;
      font-size: 12px;
    }
    .active {
      background: #ffb637;
      border-radius: $bradius;
      padding:5px 20px;
      color: #fff;
    }
  }
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
.like-container{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.c-home-offers {
  background-color: #112663;
  background-image: url("~@/assets/img/specialoffers-bg.png");
  background-position: right;
  position: relative;
  height:425px;
  margin-top: 10px;
  .c-home-offers__title {
    color: #fff;
    font-size: 27px;
    text-align: right;
    padding: 12px 2px ;
  }
  .c-home-offers__showAll {
    width: 330px;
    background: #ffb637;
    text-align: center;
    cursor: pointer;
    margin-top: 50px;
    margin-right: -50px;
    border-radius: 40px 8px 40px 8px;
    position: absolute;
    top: 160px;
    left: -125px;
    z-index: 1;
    transform: rotate(-90deg);
    color: #fff;
    padding: 14px;
    cursor: pointer
    h3 {
      height: 100%;
      font-size: 35px;
      color: #fff;
     
    }
  }
}

.ribbon-wrapper-green {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  left: -3px;
}
.swiper{

  .c-home-offers__item {
    background: #fff;
    border-radius: 8px 40px 8px 40px;
    position: relative;
    margin: 5px 0 10px 0px;
    .img {
      border-radius: 8px 40px 0px 20px;
      margin-bottom: 10px;
      height: 140px;
      width: 100%;
    }
    h3 {
      color: #404040;
      font-size: 14px;
      margin-bottom: 4px;
      margin-top: 5px;
    }
    p {
      font-size: 10px;
      margin: 5px 0;
      height: 40px;
    }
    a {
      font-size: 12px;
      font-weight: 500;
    }
    .c-home-offers__item-content {
      // position: relative;
      padding: 10px;
    }
  }
    .item-btns{ 
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      padding-top: 10px;
    }

}

.ribbon-green {
  color: #333;
  text-align: center;
  text-shadow: rgba(255, 255, 255, 0.5) 0px 1px 0px;
  transform: rotate(-45deg);
  position: relative;
  padding: 2px 0;
  left: -5px;
  font-weight: bold;
  top: 15px;
  width: 120px;
  background-color: #e22828;
  color: #fff !important;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.ribbon-green:before,
.ribbon-green:after {
  content: "";
  border-top: 3px solid red;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  position: absolute;
  bottom: -2px;
}

.ribbon-green:before {
  right: 0;
}
.ribbon-green:after {
  right: 0;
}
.tab-like{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
@media only screen and (max-width: 900px) {
  .c-home-offers__tab{
    margin-left: 0px;
    ul{
      li{
        padding:5px 15px;
        font-size: 10px;
      }
    }
  }
}
@media only screen and (max-width: 690px) {
  .c-home-offers{
    height: 345px;
    .c-home-offers__showAll {
      width: 206px;
      top: 89px;
      left: -68px;
      padding: 10px;

    }
  }
  .c-home-offers{
    height: 285px;
  }
  .tab-logo{
    top:75px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
  .ribbon-green {
    left: 10px;
  }
  .c-home-offers__tab{
    margin-left: -15px;
  }
  .swiper{

    .c-home-offers__item {
      p{
        font-size: 8px;
        height: 40px;
      }
      h3{
        font-size: 12px;
      }
      .img{
        height: 100px;
      }
    }
  }
}
</style>
