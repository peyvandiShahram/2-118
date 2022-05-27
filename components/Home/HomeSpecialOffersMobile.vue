<template>
  <section class="c-home-offers">
    <v-container class="c-home-offers-container">
      <v-row class="pt-2 align-center justify-space-between flex-row-reverse">
        <v-col lg="12" md="12" class="c-home-offers__tab">
          <ul>
            <li :class="[active == 1 ? 'active' : '']" @click="popular()">
              محبوب ترین
            </li>
            <li :class="[active == 2 ? 'active' : '']" @click="newest()">
              جدید ترین
            </li>
          </ul>
        </v-col>
        <v-col lg="4" md="4" class="c-home-offers__title">
          <div v-if="active == 1">
            <div>محبوب ترین</div>
          </div>
          <div v-if="active == 2">
            <div>جدیدترین</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="12" class="d-flex align-center pa-0">
      <!-- <v-col cols="3" class="c-home-offers__title pa-0">
        <div v-if="active == 1">
          <div>محبوب ترین</div>
        </div>
        <div v-if="active == 2">
          <div>جدیدترین</div>
        </div>
        <div v-if="active == 3">
          <div>تخفیف های</div>
          <div>شگفت انگیز</div>
        </div>
      </v-col> -->
      <v-col cols="12" class="pl-0">
        <div v-swiper:specialOffers="specialOffersOptions" class="swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in results"
              :key="index"
              class="py-0 swiper-slide"
            >
              <div class="c-home-offers__item">
                <!-- <div class="ribbon-wrapper-green">
                  <div class="ribbon-green">٪ 10</div>
                </div> -->
                <img :src="item.logo" :alt="item.title" />
                <div class="c-home-offers__item-content">
                  <nuxt-link :to="'/page/' + item.office_user_id">
                    <h3>{{ item.title }}</h3>
                  </nuxt-link>
                  <nuxt-link :to="'/page/' + item.office_user_id">
                    {{ item.group_id }}
                  </nuxt-link>
                  <p>
                    {{ aboutJob(item.about) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-col>
  </section>
</template>

<script>
// import Favorit from '~/components/common/AppFavorit'

export default {
  components: {
    // Favorit
  },
  data() {
    return {
      active: 3,
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
    fetchJobs() {
      this.$axios
        .post("/list_of_office", {
          last_id: -1,
          count: 5
        })
        .then(res => {
          this.results = res.data;
        });
    },
    aboutJob(about) {
      if (about && about.length >= 100) {
        return about.substring(0, 100) + "...";
      } else {
        return about;
      }
    },
    async popular() {
      this.active = 1;
      const data = await this.$axios.post("/search_customer", {
        ordering: "popular"
      });
      this.results = data.data;
      console.log(data);
    },
    async newest() {
      this.active = 2;
      const data = await this.$axios.post("/search_customer", {
        ordering: "newest"
      });
      this.results = data.data;
      console.log(data);
    }
  }
};
</script>
<style lang="scss">
.c-home-offers {
  &-container {
    padding: 10px 25px !important;
  }
}
</style>
<style lang="scss" scoped>
.c-home-offers__tab {
  background: #fff;
  float: left;
  padding: 5px !important;
  border-radius: $bradius;
  ul {
    background: #eeeef0;
    border-radius: $bradius;
    padding: 3px !important;
    @media (max-width: 600px) {
      display: flex;
      white-space: nowrap;
    }
    li {
      width: 49%;
      text-align: center;
      font-weight: bold;
      display: inline-block;
      cursor: pointer;
      @media (max-width: 600px) {
        font-size: 12px;
        // width: 100%;
        margin: 3px 4px;
      }
    }
    .active {
      background: #fff;
      border-radius: $bradius;
      padding: 3px 0px;
      color: $primary;
      @media (max-width: 600px) {
        padding: 0;
      }
    }
  }
}
.c-home-offers {
  background-color: #112663;
  background-image: url("~@/assets/img/specialoffers-bg.png");
  background-position: right;
  .c-home-offers__title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    @media (max-width: 600px) {
      font-size: 13px;
    }
  }
  .c-home-offers__showAll {
    width: 360px;
    background: #ffb637;
    text-align: center;
    border-radius: 40px 8px 40px 8px;
    transform: rotate(-90deg);
    padding: 20px;
    cursor: pointer;
    box-shadow: 4px 45px 45px -20px $primary;
    h3 {
      font-size: 30px;
      color: #fff;
    }
  }
}
.swiper-slide {
  width: 225px;
  height: 280px;
  margin-left: 8px;
}
.c-home-offers__item {
  height: 100%;
  background: #fff;
  border-radius: 8px 40px 8px 40px;
  position: relative;
  img {
    border-radius: 8px 40px 0px 20px;
    margin-bottom: 10px;
    height: 140px;
    width: 100%;
  }
  h3 {
    color: #404040;
    font-size: 16px;
    margin-bottom: 4px;
  }
  p {
    font-size: 10px;
    margin-top: 16px;
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
.ribbon-wrapper-green {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  left: -3px;
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
@media only screen and (max-width: 600px) {
  .c-home-offers__showAll {
    display: none;
  }
  .c-home-offers__showAll-mobile {
    background: #ffb637;
    min-height: 50px;
    border-radius: $bradius;
    text-align: center;
    margin-bottom: 5px;
    a {
      color: #fff !important;
      font-weight: bold;
    }
  }
  .ribbon-green {
    left: 10px;
  }
}
</style>
