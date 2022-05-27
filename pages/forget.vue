<template>
  <div class="forget">
    <AppAuth>
      <v-container>
        <!-- send mobile number -->
        <div>
          <div>
            <h2>بازیابی کلمه عبور</h2>
            <p>
              برای بازیابی کلمه عبور  شماره تلفن و خود را وارد کنید
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
              @click="forget"
            >
              ادامه
            </v-btn>
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
    forget () {
      this.$axios.post('forget_password', {
        mobile: this.mobile
      })
        .then((res) => {
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            })
            this.$router.push('/login')
          } else {
            this.$toast.global.msgError({
              message: res.data[0].msg
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.forget{
  padding-top: 140px;
  padding-bottom: 50px;
}
@media only screen and (max-width: 960px){
  .forget{
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
