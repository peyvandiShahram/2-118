<template>
  <div class="user">
    <AppAuth>
      <v-container>
        <!-- send user information -->
        <div>
          <h2>تکمیل مشخصات</h2>
          <p>
            لطفاً مشخصات کاربری خود را تکمیل نمایید
          </p>

          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            name="input-10-1"
            label="نام"
            outlined
            clearable
          />
          <v-text-field
            v-model="family"
            :rules="[rules.required]"
            name="input-10-1"
            label="نام خانوادگی"
            outlined
            clearable
          />
          <v-text-field
            v-model="register_password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="کلمه عبور"
            hint="حداقل ۶ کاراکتر وارد نمایید"
            outlined
            clearable
            @click:append="show1 = !show1"
          />
          <v-text-field
            v-model="email"
            name="input-10-1"
            label="پست الکترونیک"
            outlined
            clearable
          />
          <v-radio-group
            v-model="sex"
            row
          >
            <span>
              جنسیت:
            </span>
            <v-radio
              label="مرد"
              value="1"
            />
            <v-radio
              label="زن"
              value="2"
            />
          </v-radio-group>
          <v-btn
            block
            color="primary"
            class="pa-3"
            @click="addUser"
          >
            ارسال
          </v-btn>
        </div>
      </v-container>
    </AppAuth>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuth from '~/components/AppAuth.vue'

export default {
  //middleware: 'isAuthenticated',
  components: {
    AppAuth
  },
  asyncData ({ store, redirect }) {
    if (!store.state.phone) {
      redirect('/register')
    }
  },
  data () {
    return {
      mobile: '',
      verifyCode: '',
      password: '',
      name: '',
      family: '',
      register_password: '',
      email: '',
      role_id: 2,
      sex: '',
      show1: false,
      rules: {
        required: value => !!value || 'کامل کرد این فیلد الزامی است',
        min: v => v.length >= 11 || 'حداقل ۱۱ کاراکتر وارد نمایید',
        emailMatch: () => ('فرمت وارد شده صحیح نمی باشد')
      }
    }
  },
  computed: {
   phone() {
     return this.$store.getters.getPhone;
    }
  },
  methods: {
    addUser () {
      this.$axios.post('add_user', {
        name: this.name,
        family: this.family,
        user: this.phone,
        password: this.register_password,
        email: this.email,
        role_id: 2,
        sex: this.sex,
        mobile: this.phone
      })
        .then((res) => {
          if (res.data[0].res === 1) {
            this.$router.push('/login')
            this.$toast.global.msgSuccess({
              message: res.data[0].msg
            })
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
    .user{
        padding-top: 140px;
        padding-bottom: 50px;
        background: #fff;
    }
    @media only screen and (max-width: 960px){
        .user{
            padding-top: 0px;
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
