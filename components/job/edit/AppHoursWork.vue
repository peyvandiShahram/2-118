<template>
  <AppBox
    step="4"
    title="ساعات فعالیّت"
    description="روزهایی که در آن‌ها فعالیّت دارید، با انتخاب روز و کامل نمودن فیلدها وسپس با کلیک بر روی افزودن برای ما ارسال کنید؛عدم تکمیل هر روز، به معنی تعطیلی آن روز خواهد بود"
  >
    <v-col lg="9" cols="12" class="c-job-hour">
      <div class="c-job_form">
        <div>
          <v-col cols="12">
            <v-row
              v-for="(day, index) in days"
              :key="index"
              class="c-job-hour__box"
            >
              <v-col lg="1" cols="6">
                <h3 class="day-name">
                  {{ day.name }}
                </h3>
              </v-col>
              <v-col lg="1" cols="6">
                <v-switch
                  v-if="day.active"
                  v-model="day.active"
                  class="pt-0 mt-0"
                  inset
                  dense
                />
                <v-switch
                  v-if="!day.active"
                  v-model="day.active"
                  class="pt-0 mt-0"
                  inset
                  dense
                  error
                />
              </v-col>
              <v-col
                v-if="day.active && newWeekTime.length >= 1"
                class="pt-0"
                lg="7"
                cols="12"
              >
                <div v-for="(time, i) in newWeekTime[index].time" :key="i">
                  <div class="d-flex">
                    <v-col class="pt-0" lg="4" cols="6">
                      <v-text-field
                        v-model="newWeekTime[index].time[i].time1"
                        label="از ساعت"
                        outlined
                        dense
                        hide-details="true"
                        class="pt-0"
                      />
                    </v-col>
                    <v-col class="pt-0" lg="4" cols="6">
                      <v-text-field
                        v-model="newWeekTime[index].time[i].time2"
                        label="تا ساعت"
                        outlined
                        dense
                        hide-details="true"
                        class="pt-0"
                      />
                    </v-col>
                  </div>
                </div>
              </v-col>
              <v-spacer v-if="day.active" />
              <v-col v-if="day.active" lg="2" cols="12">
                <div class="add-hour" @click="addHour(index)">
                  افزودن ساعت فعالیت
                </div>
              </v-col>
              <v-col v-if="!day.active" lg="6" cols="12">
                <h3 class="red--text">
                  تعطیل است
                </h3>
              </v-col>
            </v-row>
          </v-col>
        </div>
      </div>
      <v-btn color="primary" class="btn-job" @click="sendForm()">
        <v-icon medium>
          mdi-chevron-right
        </v-icon>
        ثبت و ادامه
      </v-btn>
    </v-col>
  </AppBox>
</template>

<script>
import AppBox from "~/components/job/edit/AppBaseForm";

export default {
  components: {
    AppBox
  },
  data() {
    return {
      select: { day: "شنبه", id: "1" },
      days: [
        { name: "شنبه", id: "1", active: true },
        { name: "یکشنبه", id: "2", active: true },
        { name: "دوشنبه", id: "3", active: true },
        { name: "سه شنبه", id: "4", active: true },
        { name: "چهارشنبه", id: "5", active: true },
        { name: "پنجشنبه", id: "6", active: true },
        { name: "جمعه", id: "7", active: false }
      ],
      newWeekTime: [
        { week: "1", time: [{ time1: "", time2: "" }] },
        { week: "2", time: [{ time1: "", time2: "" }] },
        { week: "3", time: [{ time1: "", time2: "" }] },
        { week: "4", time: [{ time1: "", time2: "" }] },
        { week: "5", time: [{ time1: "", time2: "" }] },
        { week: "6", time: [{ time1: "", time2: "" }] },
        { week: "7", time: [{ time1: "", time2: "" }] }
      ],
    };
  },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    }
  },
  created() {
    this.fetchDataForEdit();
  },
  methods: {
    addHour(index) {
      this.newWeekTime[index].time.push({
        time1: "",
        time2: "" 
      });
    },
    sendForm() {
      this.$axios
        .post("/update_office_worktime1", {
          week_array: this.newWeekTime,
          office_user_id: this.$route.params.id,
          token: this.user.token
        })
        .then(res => {
          if (res.data[0].res === 1) {
            this.$router.push(`/business/${this.$route.params.id}`)
            this.$toast.global.msgSuccess({
              message: "با موفقیت ثبت شد..."
            });
          }
          console.log(res);
        })
        .catch(err => console.log(err));
    },
    async fetchDataForEdit() {
      await this.$axios
        .post("/office_worktime", {
          id: this.$route.params.id
        })
        .then(res => {
          console.log(res.data[0]);
          res.data[0].worktime.forEach(value => {
            this.newWeekTime.forEach(elm=>{
              if(elm.week==value.week)
                {
                  elm.time=[{ time1: value.time1, time2: value.time2 }]
                  console.log('***')
                }
            })
          });
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
.c-document-time__label {
  margin: auto 5px;
}
.c-document-add__time {
  text-align: center;
  display: block;
  color: $primary;
  cursor: pointer;
  margin-bottom: 5px;
}
.c-job-hour {
  margin: 10px auto;
}
.add-hour {
  font-size: 14px;
  text-align: left;
  font-weight: bold;
  color: $primary;
  cursor: pointer;
}
.c-job-hour__box {
  margin-bottom: 20px;
}
.c-job-hour__box:not(:last-child) {
  border-bottom: solid 1px $border-color;
}
@media only screen and (max-width: 600px) {
  .day-name {
    text-align: left;
  }
}
</style>
