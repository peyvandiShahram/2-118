<template>
  <div>
    <v-row v-if="results.length > 0">
      <v-col v-for="result in results" :key="result.i" lg="6" cols="12">
        <nuxt-link :to="'/business/' + result.office_id">
        <div class="c-job-results pa-0">
          <div class="c-job-result__cover">
            <img :src="result.cover" alt="" />
          </div>
          <div class="c-job-result__logo">
            <img :src="result.logo" />
          </div>
          <div class="c-job-results__body mt-2">
              {{ result.office_title }}
            
            <p class="mt-2">
              {{ result.about }}
            </p>
            <div>
              <v-row>
                <v-col md="6" cols="12">
                  <v-btn outlined block color="red" @click.prevent="deleteJob(result)">
                    حذف
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </nuxt-link>
      </v-col>
    </v-row>
    <div v-else class="job-empty">
      <div>شما تاکنون شغلی ایجاد نکرده اید</div>
      <div>
        هم اکنون به جمع مشاغل ۲۱۱۸ بپیوندید و از امکانات رایگان استفاده نمایید
      </div>
      <nuxt-link to="/job/registration"> ثبت رایگان مشاغل </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: "profile",

  data() {
    return {
      results: []
    };
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async fetch() {
      const data = await this.$axios.post("office_user_info", {
        token: this.user.token
      });
      this.results = data.data;
    },
    async deleteJob(e) {
      await this.$axios
        .post("/office_delete", {
          id: e.office_id,
          token: this.user.token
        })
        .then(res => {
          this.results.forEach((element,index) => {
            if(element.office_id===e.office_id)
              this.results.splice(index,1)
          });

          this.$toast.global.msgSuccess({
            message: "شغل با موفقیت حذف شد"
          });
        })
        .catch((err) =>{
          console.log(err)
          this.$toast.global.msgError({
            message: "خطلا در ارتباط لطفا دوباره تلاش کنید"
          })
        });
    }
  },
  mounted () {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>

.c-job-results {
  border-radius: 14px;
  box-shadow: $bshadow2;
  background: #fff;
  position: relative;
  .c-job-result__cover {
    max-height: 112px;
    img {
      object-fit: cover;
      width: 100%;
      height: 112px;
      border-radius: 14px 14px 0px 0px;
    }
  }
  .c-job-result__logo {
    height: 30px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 40px;
      position: absolute;
      top: 80px;
      right: 12px;
    }
  }
  .c-job-results__body {
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
  .job-btn {
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
.job-empty {
  text-align: center;
  font-size: 16px;
  color: $text-color;
  a {
    color: $primary !important;
  }
}
</style>
