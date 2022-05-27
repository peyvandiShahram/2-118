<template>
  <div>
    <AppBox step="3" title="فضای مجازی">
      <v-col lg="9" cols="12" class="c-job-social">
        <div class="c-job_form">
          <v-row>
            <v-col lg="6" cols="12">
              <div>
                <h3>ایمیل</h3>
                <p>
                  شما با استفاده از فاصله یا ویرگول “ , “ می توانید چند آدرس
                  ایمیل درج نمایید
                </p>
                <v-text-field
                  v-model="email"
                  class="mt-2"
                  label="ایمیل"
                  outlined
                  dense
                  hint="example@mail.com"
                />
              </div>
            </v-col>
            <v-col lg="6" cols="12">
              <div>
                <h3>وبسایت</h3>
                <p>
                  شما با استفاده از فاصله یا ویرگول “ , “ می توانید چند آدرس
                  وبسایت درج نمایید
                </p>
                <v-text-field
                  v-model="website"
                  class="mt-2"
                  label="وبسایت"
                  outlined
                  dense
                  hint="www.exaple.com"
                />
              </div>
            </v-col>
          </v-row>
        </div>
        <span class="hilight-text">شبکه اجتماعی اصلی</span>
        <div class="c-job_form">
          <div v-for="(social, index) in socials" :key="index" class="mt-3">
            <v-row>
              <v-col lg="4" cols="12" style="padding:5px">
                <v-select
                  v-model="social.social_network_id"
                  :items="items"
                  item-value="type"
                  item-text="name"
                  class="c-job-phone"
                  dense
                  outlined
                  hide-details="true"
                />
              </v-col>
              <v-col lg="8" cols="12" style="padding:5px">
                <v-text-field
                  v-model="social.link"
                  label="آدرس"
                  outlined
                  dense
                  hide-details="true"
                  class="position-relative"
                  :append-icon="
                    social.social_network_id == 1
                      ? 'mdi-instagram'
                      : 'mdi-facebook'
                  "
                  prepend-inner-icon="mdi-close-box"
                  @click:prepend-inner="delrow(index)"
                />
              </v-col>
            </v-row>
          </div>
          <v-row class="add-container" @click="addRow()">
            <v-icon color="#152d72">
              mdi-plus-box
            </v-icon>
            افزودن شبکه اجتماعی دیگر
          </v-row>
        </div>
        <div>
          <span class="add-row" @click="addRow()">افزودن آدرس</span>
        </div>
        <v-btn color="primary" class="btn-job" @click="sendForm()">
          <v-icon medium> mdi-chevron-right </v-icon>
          ثبت و ادامه
        </v-btn>
      </v-col>
    </AppBox>
  </div>
</template>

<script>
import AppBox from "~/components/job/edit/AppBaseForm";

export default {
  components: {
    AppBox
  },
  async fetch() {
    const data = await this.$axios.post("list_of_social_network");
    this.socialItems = data.data;
    this.select = data.data[0];
  },
  data() {
    return {
      email: "",
      website: "",
      socialItems: [],
      select: [],
      socials: [],
      items: [
        {
          type: 0,
          name: "فیسبوک"
        },
        {
          type: 1,
          name: "اینستاگرام"
        }
      ],
    };
  },
  mounted() {
    this.fetchDataForEdit();
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    }
  },
  methods: {
    addRow() {
      this.socials.push({ social_network_id: "", link: "" });
    },
    delrow(index) {
      this.socials.splice(index, 1);
    },
    sendForm(index) {
      this.$axios
        .post("update_office_web_link", {
          website: this.website,
          email: this.email,
          social_network_array: JSON.stringify(this.socials),
          office_user_id: this.$route.params.id,
          token: this.user.token
        })
        .then(res => {

          this.$toast.global.msgSuccess({
            message: res.data[0].msg
          });

          this.$router.push(`/business/${this.$route.params.id}`)
        })
        .catch(err => console.log(err));
    },
    async fetchDataForEdit() {
      await this.$axios
        .post("/office_web_network", {
          id: this.$route.params.id
        })
        .then(res => {
          this.email = res.data[0].email;
          this.website = res.data[0].website;
          this.socials[0] = res.data[0] ? res.data[0].link[0].length>0  : { social_network_id: "", link: "" };
          this.socials[1] = res.data[0] ? res.data[0].link[1].length>0  : { social_network_id: "", link: "" };

        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.c-job_form {
  background: #fff;
  padding: 15px;
  border-radius: $bradius;
  border: solid 1px $border-color;
  margin-bottom: 15px;
  margin-top: 10px;
}
.hilight-text {
  font-size: 16px;
  font-weight: bold;
  color: $text-color;
}
.c-job-social {
  margin: 10px auto;
}
.c-job-phone {
  background: #e9e9e9;
  border: solid 1px #e9e9e9;
  font-size: 13px;
}

.add-container{
  color: #152d72;
  font-size: 15px;
  font-weight: 700;
  padding: 15px;
  cursor: pointer;
}
</style>
