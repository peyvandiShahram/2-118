<template>
  <div>
    <AppBox
      step="2"
      title="محل کسب و کار"
      description="در صورتی که کسب و کار شما دارای بیش از یک شعبه است، با گزینه افزودن شعبه میتوانید محل شعبات خود را اضافه کنید"
    >
      <v-col lg="9" cols="12" class="c-job-address">
        <div>
          <v-col lg="12" cols="12">
            <div>
              <span class="hilight-text">شعبه اصلی</span>
            </div>
            <div
              v-for="(branch, index) in form.branchs"
              :key="branch.i"
              class="c-job_form"
            >
              <v-row>
                <v-col lg="6" cols="12">
                  <div>
                    <div>
                      <h3>استان</h3>
                      <v-select
                        v-model="form.branchs[index].state"
                        :items="states"
                        item-text="name"
                        item-value="id"
                        label="انتخاب استان"
                        dense
                        outlined
                        hide-details="true"
                        persistent-hint
                        return-object
                        @change="getCity(index)"
                      />
                    </div>
                    <div v-if="cities" class="select-city">
                      <h3>شهر</h3>
                      <v-select
                        v-model="form.branchs[index].city"
                        :items="cities"
                        label="شهر"
                        item-text="name"
                        item-value="id"
                        dense
                        outlined
                        hide-details="true"
                        persistent-hint
                        return-object
                      />
                    </div>
                    <div class="mt-4">
                      <h3 class="ma-2">آدرس پستی</h3>
                      <v-textarea
                        v-model="form.branchs[index].address"
                        name="address"
                        label="آدرس"
                        hint="خیابان میرفندرسکی ..."
                        hide-details="true"
                        outlined
                      />
                    </div>
                    <div class="mt-2">
                      <h3>افزودن روی نقشه</h3>
                      <!-- <div  id="map"></div> -->
                      <Map @setLocation="getLocation" />
                    </div>
                    <span
                      v-if="form.branchs.length > 1"
                      class="red--text d-block text-left"
                      @click="delBranch(index)"
                      >حذف</span
                    >
                  </div>
                </v-col>
                <v-col lg="6" cols="12">
                  <div>
                    <h3>کد پستی</h3>
                    <v-text-field
                      v-model="form.branchs[index].postalCode"
                      label="کد پستی خود را وارد کنید"
                      outlined
                      dense
                      hide-details="true"
                    />
                  </div>
                  <h3 class="mt-4">توضیحات</h3>
                  <p>
                    درباره محصولات و خدماتی که ارائه می‌کنید کامل توضیح دهید، به
                    خصوص اگر محصول یا سرویسی منحصر به فرد ارائه می‌کنید
                  </p>
                  <p>داستان کسب و کار خود را برای ما شرح دهید</p>
                  <p>
                    جوایز و افتخاراتی که کسب کرده‌اید، سال تأسیس و سابقه کار،
                    ساعات کاری و در مورد مشتریان خوب خود را برای ما بنویسید
                  </p>
                  <div>
                    <v-textarea
                      v-model="form.description"
                      name="description"
                      label="توضیحات شما"
                      outlined
                      hide-details="true"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
            <div>
              <span class="add-row" @click="addBranch()">افزودن شعبه</span>
            </div>
            <v-btn color="primary" class="btn-job" @click="sendForm()">
              <v-icon medium> mdi-chevron-right </v-icon>
              ثبت و ادامه
            </v-btn>
          </v-col>
        </div>
      </v-col>
    </AppBox>
  </div>
</template>

<script>
import Map from "~/components/AppMap.vue";
import AppBox from "~/components/job/AppBaseForm";
import AppOverlay from "~/components/job/AppOverlay";
import Modal from "~/components/AppModal.vue";

export default {
  components: {
    Map,
    AppBox,
    AppOverlay,
    Modal
  },
  async fetch() {
    await this.$axios.post("list_of_state").then(res => {
      this.states = res.data;
    });
    await this.$axios.post("list_of_office_groups").then(res => {
      this.jobActivity = res.data;
    });
  },
  data() {
    return {
      states: [],
      cities: null,
      map:null,
      jobActivity: [],
      showModal:false,
      branchIndex: "",
      isMapModalOpen: false,
      lat:null,
      lng:null,
      form: {
        name: "",
        jobActivity: "",
        description: "",
        phones: [
          {
            type: "",
            number: ""
          }
        ],
        branchs: [
          {
            state: "",
            city: "",
            address: "",
            postalCode: "",
            lat: "",
            long: ""
          }
        ]
      },
      items: ["تلفن ثابت", "موبایل"]
    };
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    }
  },
  methods: {
    businessModalFunc(e) {
      this.isMapModalOpen = e;
    },
    delrow(index) {
      this.form.phones.splice(index, 1);
    },
    getLocation(location){
      this.lat=location.lat
      this.lng=location.lng
    },
    addRow() {
      this.form.phones.push({
        type: "",
        number: ""
      });
    },
    addBranch() {
      this.form.branchs.push({
        state: "",
        city: "",
        address: "",
        postalCode: "",
        description: ""
      });
    },
    delBranch(index) {
      this.form.branchs.splice(index, 1);
    },
 
    getCity(index) {
      this.$nuxt.$loading.start();
      this.$axios
        .post("list_state_city", {
          id: this.form.branchs[index].state.id
        })
        .then(res => {
          this.cities = res.data[0].city;
          this.$nuxt.$loading.finish();
        });
    },


    sendForm(index) {
      this.$axios
        .post("update_office_loc", {
          address: this.form.branchs[0].address,
          latetiud: this.lat,
          longetiud: this.lng,
          city_id: this.form.branchs[0].city.id,
          postal_code: this.form.branchs[0].postalCode,
          about: this.form.description,
          branch_array:
            this.form.branchs.length <= 1
              ? "[]"
              : JSON.stringify(this.form.branchs),
          office_user_id: this.$route.params.id,
          token: this.user.token
        })
        .then(res => {
          if (res.data[0].res === 1) {
            this.$emit("nextstep");
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            });
          }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.c-job_form {
  background: #fff;
  padding: 15px;
  border-radius: $bradius;
  border: solid 1px $border-color;
  margin-top: 10px;
  margin-bottom: 15px;
}
.hilight-text {
  font-size: 16px;
  font-weight: bold;
  color: $text-color;
}
#map{
  height: 200px;
}
.c-job-address {
  margin: 10px auto;
}
.c-modal {
  position: relative;
  background: #fff;
  border-radius: $bradius2;
  padding: 20px;
  box-shadow: $bshadow2;
  @media (max-width: 1264px) {
    height: 500px;
  }
  @media (max-width: 992px) {
    height: 350px;
    // top: 20%;
  }
  @media (max-width: 768px) {
    height: 250px;
    // top: 20%;
  }
  @media (max-width: 520px) {
    height: 200px;
    // top: 30%;
  }
  i {
    position: absolute;
    left: 20px;
    cursor: pointer;
    font-size: 23px;
    top: 2px;
  }
}
.modal-lg {
  height: 400px;
}
.business-modal {
  padding: 9px 0;
}
</style>
