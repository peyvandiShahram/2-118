<template>
    <v-row class="c-footer__app align-center">
      <v-col sm="8" md="4" class="c-footer__email">
        <div class="download">
          <span class="c-footer__email-title">
            پست الکترونیکی
          </span>
          <span class="c-footer__email-text">Support@2118.com</span>
        </div>
      </v-col>
      <v-col cols="12" md="8" class="c-app-download">
        <v-row class="c-app-download-show">
          <!-- <div class="app-container"> -->
            <v-col cols="12" md="3">
              <div class="download">
                <img src="~assets/img/logo/vertical-logo.svg" class="logo" />
                <span class="download-text">دانلود اپلیکیشن ۲۱۱۸</span>
              </div>
            </v-col>
            <v-col cols="12" md="9" class="pa-2 c-app-download-res-icons">
              <v-col cols="4" class="text-sm-right">
                <nuxt-link to="/" class="c-app-btn">
                  <v-btn color="#a4cf37">
                    <i class="icon-cafebazaar-logo" />
                      دریافت از
                    <i class="icon-cafebazaar" />
                  </v-btn>
                </nuxt-link>
              </v-col>
              <v-col cols="4" class="text-sm-right">
                <nuxt-link to="/" class="c-app-btn">
                  <v-btn color="#316eb7">
                    <i class="icon-sibche-logo" />
                    دریافت از
                    <i class="icon-sibche" />
                  </v-btn>
                </nuxt-link>
              </v-col>
              <v-col cols="4" class="text-sm-right">
                <nuxt-link to="/" class="c-app-btn ">
                  <v-btn color="#00d0fc">
                    <i class="icon-google-play" />
                    دریافت از گوگل پلی
                  </v-btn>
                </nuxt-link>
              </v-col>
            </v-col>
          <!-- </div> -->
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.c-footer__app {
    .c-footer__email-title {
        font-size: 18px;
        font-weight: bold;
        color: $primary;
        vertical-align: middle;
        margin-right: 20px;
    }
    .c-footer__email-text {
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
        vertical-align: middle;
    }
    .sponser-img {
      margin-left: 30px;
    }
}
.c-app-download {

  &-img {
    @media (max-width: 448px) {
      display: none;
    }
  }
  .logo {
    width: 30px;
    @media  (max-width:700px) {
      width: 70px;
    }
  }
  .download-text {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    margin-top: 10px;
    @media (max-width: 700px) {
      margin: 20px;
    }
  }
  &-res-icons {
    padding: 10px 10px 10px 25px !important;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .c-app-download-show {
    padding: 18px;
    @media (max-width: 600px) {
      padding: 5px 0;
    }
  }
  .c-app-btn {
    padding: 12px 14px;
    color: #fff;
    border-radius: 10px;
    // width: 100%;

    a {
      font-size: 18px;
    }
    i {
      font-size: 30px !important;
      margin: 0px 5px;
      color: #fff;
      vertical-align: middle;
      @media (max-width: 1100px) {
        font-size: 20px !important;
      }
    }
    .icon-google-play{
      font-size: 30px !important;
      padding: 10px 0;
    }
    .icon-cafebazaar,
    .icon-sibche {
      font-size: 50px !important;
      @media (max-width: 600px) {
        font-size: 20px !important;
      }
    }
  }
  .bazzar {
    background-color: #a4cf37;
    padding: 10px;
    width: 100%;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .google-play {
    background: #00d0fc;
    width: 100%;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .sibche {
    margin-top: 5px;
    background: #316eb7;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
}
.app-container{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.download{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
