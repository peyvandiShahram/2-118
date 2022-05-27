<template>
  <div class="register">
    <AppAuth>
      <v-container>
        <!-- send mobile number -->
        <div>
          <div>
            <h2>ثبت نام</h2>
            <p>
              برای ثبت نام شماره تلفن و خود را وارد کنید
            </p>
            <v-text-field
              v-model="mobile"
              label="شماره همراه"
              outlined
              clearable
              hint="حداقل ۱۱ کاراکتر وارد نمایید"
            />
            <v-btn
              block
              color="primary"
              class="pa-3"
              @click="register"
            >
              ادامه
            </v-btn>
          </div>
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
          <div class="c-register-login">
            آیا حساب کاربری دارید؟
            <nuxt-link to="/login">
              ورود
            </nuxt-link>
          </div>
        </div>
      </v-container>
    </AppAuth>
  </div>
</template>

<script>
import AppAuth from '~/components/AppAuth.vue'

export default {
  components: {
    AppAuth
  },
  data () {
    return {
      mobile: ''
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post
      ('add_register_user', {mobile: this.mobile})
        if (res.data[0].res === 1) {
          this.step = this.step + 1
          this.$store.commit('setPhoneNumber', this.mobile)

          this.$router.push('/register/verify')

        }
        else {
          this.$toast.global.msgError({
            message: res.data[0].msg
          })
        }
    }
  }
}
</script>
<style lang="scss" scoped>

    .register{
        padding-top: 80px;
        padding-bottom: 50px;
        background: #fff;
    }
    @media only screen and (max-width: 960px){
        .register{
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
.c-register-login {
  text-align: center;
  a {
    color: $primary !important;
  }
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
  color: dodgerblue;
}
@media only screen and (max-width: 600px) {
    .c-login-terms {
      padding: 0px 10px;
    }
}
</style>
