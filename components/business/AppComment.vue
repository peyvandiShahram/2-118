<template>
  <v-col cols="12">
    <v-row v-if="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm" >
      <v-col cols="6" class="work-time-title-container">
        <v-row>
          <v-icon color="#51badd" size="30">
              mdi-star
          </v-icon>
          <div class="work-time-title">
              ثبت امتیاز
          </div>
        </v-row>
      </v-col>
      <v-col cols="6" >

        <v-row dir="ltr" style="margin:20px 0">
          <div class="point">
            امتیاز دهید
          </div>
            <v-rating
              v-model="rating"
              background-color="#92939f"
              color="yellow accent-4"
              dense
              hover
              size="25"
              style="margin-top:10px"
            ></v-rating>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-text-field
        v-model="subject"
        label="عنوان نظر"
        outlined
        hide-details="auto"
        clearable
        dense
      />
    </div>
    <br />
    <div>
      <v-textarea v-model="text" label="متن پیام شما" outlined dense />
    </div>
    <div class="text-left">
      <v-btn dark color="#0288d1" @click="sendForm()"> ثبت و ارسال نظر </v-btn>
    </div>
  </v-col>
</template>

<script>
export default {

  data() {
    return {
      rating: 4,
      subject:'',
      text:''
    }
  },

  methods: {
    sendForm() {
      this.$axios
        .post("/add_office_opinion", {
          opinion :`${this.subject}\n${this.text}`,
          score :this.rating,
          token: this.user.token,
          office_user_id: this.$route.params.id,
        })
        .then(res => {
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            })
          }
        })
        .catch(err => {
          this.$toast.global.msgError({
            message: "خطا در ارتباط لطفا مجددا تلاش کنید"
          });
          console.log(err);
        });
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

<style scoped>
    .work-time-title-container{
        width: 100%;
        padding: 20px;
    }
    .work-time-title{
        font-size: 17px;
        font-weight: 700;
        margin-right: 10px;
    }
    .title-contact{
      width: 100%;
      font-size: 13px;
      font-weight: 500;
      text-align: left;
    }
    .point{
      background: #000;
      height: 50px;
      width: 100px;
      display: flex;
      justify-content: center;
      clip-path: polygon(0 20%, 76% 19%, 100% 49%, 78% 80%, 0 80%);
      color: #ff9900;
      padding: 15px 5px 0 0;
    }
</style>