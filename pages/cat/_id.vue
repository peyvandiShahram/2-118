<template>
  <v-container class="mt-4 mb-4">
    <v-col cols="12" class="c-category-filter d-flex mb-4">
      <h3>مرتب سازی براساس:</h3>
      <span
        v-for="filter in filters"
        :key="filter.i"
        @click="filterData(filter.type)"
      >
        {{ filter.title }}
      </span>
    </v-col>
    <span>{{ results.length }} مورد یافت شده</span>
    <v-row>
      <v-col v-for="result in results" :key="result.i" lg="3" cols="12">
        <div class="c-category-results pa-0">
          <div class="c-category-result__cover">
            <img src="~assets/img/piza.jpg" alt="" />
          </div>
          <div class="c-category-result__logo">
            <img :src="result.logo" />
          </div>
          <div class="c-category-results__body">
            <nuxt-link :to="'/page/' + result.office_id">
              {{ result.title }}
            </nuxt-link>
            <Favorit :office_id="result.office_user_id" imgheight="120" />
            <p>{{ result.about }}</p>
            <div class="search-btn">
              <v-row v-if="user">
                <v-col class="c-category__btn" md="6" cols="12">
                  <a
                    :href="
                      'https://www.google.com/maps/dir/' +
                        result.latetiud +
                        ',' +
                        result.longetiud
                    "
                    target="_blank"
                  >
                    نقشه
                  </a>
                </v-col>
                <v-col class="c-category__btn" md="6" cols="12">
                  <a :href="'tel:' + result.phone">تماس</a>
                </v-col>
              </v-row>
              <div v-else>
                <nuxt-link to="/login" class="mt-2">
                  برای مشاهده اطلاعات وارد شوید
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Favorit from "~/components/common/AppFavorit";

export default {
  components: {
    Favorit
  },
  async fetch() {
    const data = await this.$axios.post("list_of_group_of_office", {
      group_id: this.$route.params.id
    });
    if (data.data[0].res === 0) {
      this.$router.push("/");
      this.$toast.global.msgError({
        message: "نتیجه ایی یافت نشد"
      });
    }
    this.results = data.data;
  },
  data() {
    return {
      showModal: false,
      lat: "",
      long: "",
      results: [],
      filters: [
        { title: "جدیدترین", type: "" },
        { title: "محبوب ترین", type: "popular" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    filterData(type) {
      this.$router.push({ query: { q: this.$route.query.q, sort: type } });
      this.$axios
        .post("search_customer", {
          title: this.$route.query.q,
          ordering: type
        })
        .then(res => {
          if (res.data[0].res === 1) {
            this.results = res.data;
          } else {
            this.$toast.global.msgError({
              message: "خطایی پیش آمده"
            });
          }
        });
    },
    showMap(lat, long) {
      const routeData = this.$router.resolve({
        name: "routeName",
        query: { data: "someData" }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.c-category-filter {
  background: #fff;
  border-radius: $bradius;
  border: solid 1px $border-color;
  span {
    padding: 2px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.c-category-results {
  border-radius: $bradius;
  box-shadow: $bshadow2;
  background: #fff;
  position: relative;
  .c-category-result__cover {
    max-height: 80px;
    img {
      object-fit: cover;
      width: 100%;
      height: 112px;
      border-radius: 14px 14px 0px 0px;
    }
  }
  .c-category-result__logo {
    height: 30px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 40px;
      position: absolute;
      top: 70px;
      right: 12px;
    }
  }
  .c-category-results__body {
    margin-top: 30px;
    padding: 5px 15px;
    a {
      font-size: 14px;
      font-weight: bold;
      color: $primary;
    }
    p {
      font-size: 12px;
    }
  }
  .search-btn {
    border-top: solid 1px $border-color;
    a {
      background: $primary;
      color: #fff;
      padding: 6px 0px;
      display: block;
      text-align: center;
      font-weight: 300;
      border-radius: $bradius;
    }
  }
}

@media only screen and (max-width: 600px) {
  .c-category-filter {
    display: block !important;
  }
}
</style>
