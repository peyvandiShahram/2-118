<template>
  <div class="login">
    <AppAuth>
      <v-container>
        <h2>ورود</h2>
        <p>
          برای ورود شماره تلفن و رمز عبور خود را وارد کنید
        </p>
        <v-text-field
          v-model="username"
          name="input-10-1"
          label="شماره همراه"
          hint="حداقل ۱۱ کاراکتر وارد نمایید"
          outlined
          clearable
          @click:append="show1 = !show1"
        />
        <div class="c-login-forget">
          <nuxt-link to="/forget">
            کلمه عبور خود را فراموش کرده‌ام
          </nuxt-link>
        </div>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          label="کلمه عبور"
          hint="حداقل ۶ کاراکتر وارد نمایید"
          outlined
          clearable
          @click:append="show1 = !show1"
        />
        <v-btn block color="primary" class="pa-3" style="margin-bottom:20px" @click="login">
          ورود
        </v-btn>
        <nuxt-link to="/register">
          <v-btn block color="primary" class="pa-3">
            ثبت نام
          </v-btn>
        </nuxt-link>
        <p class="c-login-terms">
          با ورود و یا ثبت نام در سامانه ۲۱۱۸ شما
          <nuxt-link to="/">
            شرایط و قوانین
          </nuxt-link>
          و
          <nuxt-link to="/">
            ضوابط حریم خصوصی
          </nuxt-link>
          این بستر را می‌پذیرید
        </p>
      </v-container>
    </AppAuth>
  </div>
</template>

<script>
import AppAuth from "~/components/AppAuth.vue";
import Cookie from "js-cookie";

export default {
  components: {
    AppAuth
  },
  data() {
    return {
      username: "",
      password: "",
      show1: false,
      rules: {
        required: value => !!value || "کامل کرد این فیلد الزامی است",
        min: v => v.length >= 8 || "حداقل ۱۱ کاراکتر وارد نمایید"
      }
    };
  },
  methods: {
    async login() {
      try {
        const res=await this.$axios.$post("login", {
            username: this.username,
            password: this.password,
            role_id: 2
        });

        

        this.$store.dispatch('storeUser',res[0])
        this.$toast.global.msgSuccess({
          message: "ورود شما موفقیت آمیز بود!"
        });
      } catch (err) {
        console.log(err);
        this.$toast.global.msgError({
          message: "خطایی رخ داده است لطفا مجدد تلاش کنید"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login{
  padding-top: 70px
}
@media only screen and (max-width: 960px){
    .login{
        padding-top: 0px;
    }
}
.c-login-forget {
  text-align: left;
  a {
    color: $primary !important;
    font-size: 10px;
  }
}
.c-login-terms {
  margin-top: 14px;
  font-size: 12px;
  padding: 0px 60px;
  text-align: center;
  a {
    color: $primary !important;
  }
}
.c-login-register {
  text-align: center;
  a {
    color: $primary !important;
  }
}
@media only screen and (max-width: 600px) {
  .c-login-terms {
    padding: 0px 10px;
  }
}
</style>
