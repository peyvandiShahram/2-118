<template>
  <div class="verify">
    <AppAuth>
      <v-container>
        <!-- send verify code -->
        <div>
          <h2>تأیید همراه</h2>
          <p>
            لطفاً کد ۵ رقمی ارسال شده به تلفن همراه خود را وارد نمایید
          </p>
          <div
            class="text-center c-verify-change__number"
            @click="changeNumber()"
          >
            اصلاح شماره همراه
          </div>
          <input
            v-model="verifyCode"
            type="text"
            class="digitinput"
            name="verify"
            maxlength="5"
          />
          <v-btn block color="primary" class="pa-3" @click="verify">
            تایید
          </v-btn>
          <div class="text-center mt-3 c-verify-timer">
            <div>زمان وارد کردن کد تایید</div>
            0:{{ timer }}
          </div>
        </div>
      </v-container>
    </AppAuth>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppAuth from "~/components/AppAuth.vue";

export default {
  components: {
    AppAuth
  },
  asyncData({ store, redirect }) {
    if (!store.getters.getPhone) {
      redirect("/register");
    }
  },
  data() {
    return {
      mobile: null,
      verifyCode: "",
      timer: 60,
      rules: {
        required: value => !!value || "کامل کرد این فیلد الزامی است",
        min: v => v.length >= 11 || "حداقل ۱۱ کاراکتر وارد نمایید",
        emailMatch: () => "فرمت وارد شده صحیح نمی باشد"
      }
    };
  },
  computed: {
    phone() {
      return this.$store.getters.getPhone;
    }
  },
  created() {
    this.countDownTimer();
  },
  methods: {
    verify() {
      this.$axios
        .get(
          `register_login?mobile=${this.phone}&register_code=${this.verifyCode}`
        )
        .then(res => {
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            });
            this.$router.push("/register/user");
          } else {
            this.$toast.global.msgError({
              message: res.data[0].msg
            });
          }
        });
    },
    changeNumber() {
      this.$store.commit("setPhoneNumber", null);
      this.$router.push("/register");
    },
    countDownTimer() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.verfy {
  padding-top: 100px;
}
@media only screen and (max-width: 960px) {
  .register {
    padding-top: 0px;
  }
}
.c-verify-change__number {
  color: $primary;
  cursor: pointer;
}

.c-verify-timer {
  color: $text-color;
}
// digipoint
.digitinput {
  text-align: left;
  display: block;
  margin: 1em auto;
  border: none;
  padding: 0;
  width: 7.5ch;
  background: repeating-linear-gradient(
      90deg,
      dimgrey 0,
      dimgrey 1ch,
      transparent 0,
      transparent 1.5ch
    )
    0 100%/ 10ch 2px no-repeat;
  font: 5ch droid sans mono, consolas, monospace;
  letter-spacing: 0.5ch;
}
.digitinput:focus {
  outline: none;
  color: $primary;
}
@media only screen and (max-width: 600px) {
  .c-login-terms {
    padding: 0px 10px;
  }
}
</style>
