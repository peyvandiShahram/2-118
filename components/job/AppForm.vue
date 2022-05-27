<template>
  <div>
    <h3>اطلاعات پایه
      <span class="title-detail">(پر کردن اطلاعات پایه <span style="color:red">ضروری</span> است)</span>
    </h3>
    <div class="c-job_form">
      <div>
        <h3>نام کسب و کار</h3>
        <v-text-field
          v-model="form.name"
          class="mt-2"
          placeholder="مثال: گل فروشی بهار"
          outlined
          dense
          hint="مثال: گل فروشی بهار"
        />
      </div>
      <div>
        <h3>فعالیّت شغلی</h3>
        <p>
          نوع کسب و کار خود را جستجو کنید و از لیست انتخاب کنید (حداکثر سه مورد)
          و در صورت عدم یافتن کسب و کار خود، با پشتیبانی تماس بگیرید
        </p>
        <v-select
          v-model="form.jobActivity"
          :items="jobActivity"
          label="فعالیّت شغلی"
          item-text="title"
          item-value="id"
          dense
          outlined
          persistent-hint
          return-object
        />
      </div>
      <div>
        <h3>تخفیف</h3>
        <p>آیا کسب و کار شما دارای تخفیف است؟</p>
        <v-row class="discount-row">
          <v-col lg="4">
            <v-switch
              v-model="form.discountActive"
              inset
              dense
              :label="form.discountActive ? 'بله' : 'خیر'"
            />
          </v-col>
          <v-col lg="8" cols="8">
            <v-text-field
              v-if="form.discountActive"
              v-model="form.discount"
              class="mt-2"
              placeholder="مثال: 10"
              outlined
              dense
              hint="بر اساس درصد وارد نمایید"
              type="number"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <div>
      <h3>اطلاعات تماس</h3>
    </div>
    <div class="c-job_form">
      <div v-for="(phone, index) in form.phones" :key="phone.i" class="mt-3">
        <v-row>
          <v-col lg="4" cols="12" style="padding:5px">
            <v-select
              v-model="form.phones[index].ttype"
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
              v-model="form.phones[index].tel"
              label="شماره"
              outlined
              dense
              hide-details="true"
              class="position-relative"
              :append-icon="
                form.phones[index].ttype == 1
                  ? 'mdi-phone'
                  : 'mdi-phone-classic'
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
        افزودن شماره دیگر
      </v-row>
    </div>
    <div>
      <v-btn color="primary" class="btn-job" @click="sendForm()">
        <v-icon small> mdi-chevron-right </v-icon>
        ثبت و ادامه
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiPhone, mdiPhoneClassic } from "@mdi/js";

export default {
  async fetch() {
    await this.$axios.post("list_of_office_groups").then(res => {
      this.jobActivity = res.data;
    });
  },
  data() {
    return {
      mdiPhone,
      jobActivity: [],
      form: {
        name: "",
        jobActivity: "",
        discountActive: false,
        discount: "",
        phones: [
          {
            ttype: 0,
            tel: ""
          }
        ]
      },
      items: [
        {
          type: 0,
          name: "شماره ثابت"
        },
        {
          type: 1,
          name: "شماره همراه"
        }
      ]
    };
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    }
  },
  methods: {
    delrow(index) {
      this.form.phones.splice(index, 1);
    },
    addRow() {
      this.form.phones.push({
        ttype: 0,
        tel: ""
      });
    },
    sendForm(index) {
      this.$axios
        .post("add_office1", {
          title: this.form.name,
          group_id: this.form.jobActivity.id,
          discount: this.discount,
          tel_array: JSON.stringify(this.form.phones),
          token: this.user.token
        })
        .then(res => {
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            });
            this.$router.push(
              "/job/registration/" + res.data[0].office_user_id
            );
          }
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
.c-job-phone {
  background: #e9e9e9;
  border: solid 1px #e9e9e9;
  font-size: 13px;
}
.discount-row {
  margin-top: -30px;
}
.phone-icon {
  position: absolute;
}
.title-detail{
  color: #92939f;
}
.add-container{
  color: #152d72;
  font-size: 15px;
  font-weight: 700;
  padding: 15px;
  cursor: pointer;
}
</style>
