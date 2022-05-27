<template>
  <div class="app-form">
    <h3>اطلاعات پایه</h3>
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
      <p>در صورت تمایل می‌توانید بیش از یک شماره اضافه کنید</p>
      <span class="hilight-text">شماره اصلی</span>
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
    <span class="add-row" @click="addRow()">افزودن شماره</span>
    <div>
      <v-btn color="primary" class="btn-job" @click="sendForm()">
        <v-icon small> mdi-chevron-right </v-icon>
        ثبت و ادامه
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.post("list_of_office_groups").then(res => {
      this.jobActivity = res.data;
    });
  },
  data() {
    return {
      jobActivity: [],
      form: {
        name: "",
        jobActivity: "",
        discountActive: false,
        discount: "",
        jobActivity_id:"",
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
    fetchData(){
      this.$axios.
      $post("office_info1", {
          id: this.$route.params.id
      })
      .then((res)=>{
        this.form.phones=res[0].tel.length>0 ? res[0].tel : [ {ttype: 1,tel: ""}]
        this.form.name=res[0].title
        this.form.jobActivity=res[0].group_title
        this.form.jobActivity_id=res[0].group_id
      })
      
    },
    delrow(index) {
      this.form.phones.splice(index, 1);
    },
    addRow() {
      this.form.phones.push({
        ttype: "",
        tel: "" 
      });
    },
    sendForm() {
      
      this.$axios
        .post("add_office1", {
          title: this.form.name,
          group_id: this.form.jobActivity_id,
          discount: this.form.discount,
          tel_array: JSON.stringify(this.form.phones),
          token: this.user.token
        })
        .then(res => {
          console.log(res)
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            });
            this.$router.push({ path: `/job/edit/${this.$route.params.id}`, query: { step: 2 }})
            setTimeout(()=>{
              this.$router.go(this.$router.currentRoute)
            },10)
          }
        })
        .catch(err => console.log(err));
    }  
  }, 
  created () {
    this.fetchData();
  },
}; 
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 900px){
  .app-form{
    margin: 0 70px;
  }
}

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
  background: #cacaca;
  border: solid 1px #cacaca;
}
.discount-row {
  margin-top: -30px;
}


.add-container{
  color: #152d72;
  font-size: 15px;
  font-weight: 700;
  padding: 15px;
  cursor: pointer;
}
</style>
 