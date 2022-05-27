<template>

  <v-col cols="12" class="c-profile__home">
    <div class="c-profile__home--title">
      <h2 class="pa-4">
        تنظیمات کاربری
      </h2>
    </div>

    <!-- name and family -->
    
      <div>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="updatedUser.name"
                label="نام"
                outlined
                dense
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="updatedUser.family"
                label="نام خانوادگی"
                outlined
                dense
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="updatedUser.mobile"
                label="شماره همراه"
                outlined
                dense
                hide-details="auto"
                readonly
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="password"
                label="رمز عبور"
                outlined
                dense
                hide-details="auto"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-2"
                hint="حداقل ۶ کاراکتر وارد نمایید"
                @click:append="show1 = !show1"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="updatedUser.email"
                label="پست الکترونیک"
                outlined
                dense
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-btn block color="primary" class="pa-3" @click="updateuser">
                ویرایش
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
  </v-col>
</template>

<script>
export default {
  layout: "profile",
  data() {
    return {
      show1: false,
      password: "",
      updatedUser:null
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.updatedUser.name = this.user.name;
  //     this.updatedUser.family = this.user.family;
  //     this.updatedUser.email = this.user.email;
  //   });
  // },
  // computed: {
  //   user() {
  //     return this.$store.getters.getUserInfo;
  //   }
  // },
  methods: {
    user() {
      this.$store.dispatch('fetchUser')
      this.updatedUser= this.$store.getters.getUser;
    },
    updateuser() {
      this.$axios
        .post("edit_user", {
          name: this.updatedUser.name,
          family: this.updatedUser.family,
          user: this.user.mobile,
          password: this.password,
          email: this.updatedUser.email,
          user_id: this.user.user_id,
          token: this.user.token
        })
        .then(res => {
          if (res.data[0].res === 1) {
            // console.log(res.data[0])
            this.$toast.global.msgSuccess({
              message: "اطلاعات شما با موفقیت بروز شد لطفا دوباره وارد شوید"
            });
            this.$auth.logout();
          } else {
            this.$toast.global.msgError({
              message: res.data[0].msg
            });
          }
        });
    }
  },
  created () {
    this.user();
  },
  
};
</script>

<style lang="scss" scoped>

.c-profile__home {
  background: #fff;
  border: solid 1px $border-color;
  border-radius: $bradius;
  margin-top: 10px;
}


.c-profile__home--title {
  border-bottom: solid 1px $border-color;
}
.c-profile__edit--name {
  border-bottom: solid 1px $border-color;
}
</style>
