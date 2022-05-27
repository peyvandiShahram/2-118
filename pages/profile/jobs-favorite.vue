<template>
  <div>
    <v-row>
      <v-col v-for="result in results" :key="result.i" lg="6" cols="12">
        <div class="c-job-results pa-0">
          <div class="c-job-result__cover">
            <img :src="result.cover" alt="" />
          </div>
          <div class="c-job-result__logo">
            <img :src="result.logo" />
          </div>
          <div class="c-job-results__body mt-2">
            <nuxt-link :to="'/page/' + result.office_id">
              {{ result.office_title }}
            </nuxt-link>

            <nuxt-link :to="'/page/' + result.office_user_id" class="link">
              <p class="mt-2">
                {{ result.about }}
              </p>
            </nuxt-link>
            <div>
              <v-col md="12" cols="12">
                <v-btn
                  outlined
                  block
                  color="red"
                  @click="deletefav(result.office_user_id)"
                >
                  حذف
                </v-btn>
              </v-col>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "profile",
  async fetch() {
    const data = await this.$axios.post("list_of_office_like", {
      token: this.user.token
    });
    if(data.data[0].res===1)
      this.results = data.data;
  },
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
    editJob(id) {
      this.$router.push("/job/edit/" + id);
    },
    deletefav(id) {
      this.$axios
        .post("/delete_office_like", {
          office_user_id: id,
          token: this.user.token
        })
        .then(res => {
          this.results.forEach((element,index) => {
            if(element.office_user_id===id){
              console.log(id)
              this.results.splice(index,1)
            }
              
          });
          this.$toast.global.msgSuccess({
            message: "با موفقیت به لیست علاقه مندی ها حذف شد"
          });
          this.$router.push("/profile/jobs-favorite");
        })
        .catch(err => {
          this.$toast.global.msgError({
            message: "خطایی پیش امده"
          });
        });
    }
  }
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
  .link {
    font-weight: 400 !important;
    font-size: 12px !important;
    color: black !important;
  }
}
</style>
