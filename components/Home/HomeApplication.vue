<template>
  <section class="c-app">
    <div class="custom-container">
      <v-row>
        <v-col xl="7" lg="5" md="4" sm="12" cols="12" class="c-app-banner">
          <div class="c-app-business">
            <nuxt-link to="/job/registration">
              <img src="~assets/img/businessman.png" alt="" />
            </nuxt-link>
          </div>
        </v-col>
        <v-col xl="5" lg="7" md="8" sm="12" cols="12" class="c-app-items">
          <div class="c-app-download">
            <v-row>
              <v-col class="c-app-download-img">
                <img src="~assets/img/iphone.png" class="phone" />
              </v-col>
              <v-col class="c-app-download-show text-center">
                <div class="text-right">
                  <img src="~assets/img/logo/logo.png" class="logo" />
                  <span class="download-text">دانلود اپلیکیشن ۲۱۱۸</span>
                </div>
                <div class="pa-2 c-app-download-res-icons">
                  <v-col  lg="12" class="btn-padding px-sm-0 text-sm-right">
                    <nuxt-link to="/" class="c-app-btn bazzar">
                      <i class="icon-cafebazaar-logo" />
                      دریافت از
                      <i class="icon-cafebazaar" />
                    </nuxt-link>
                  </v-col>
                  <v-col  lg="12" class="btn-padding px-sm-0 text-sm-right">
                    <nuxt-link to="/" class="c-app-btn google-play">
                      <i class="icon-google-play" />
                      دریافت از گوگل پلی
                    </nuxt-link>
                  </v-col>
                  <v-col  lg="12" class="btn-padding px-sm-0 text-sm-right">
                    <nuxt-link to="/" class="c-app-btn sibche">
                      <i class="icon-sibche-logo" />
                      دریافت از
                      <i class="icon-sibche" />
                    </nuxt-link>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <div class="spancers-title">حامیان ما</div>
      </v-row>
        <v-row style="margin-top:0">
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser1.png" alt="">
          </v-col>
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser2.png" alt="">
          </v-col>
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser3.png" alt="">
          </v-col>
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser4.png" alt="">
          </v-col>
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser5.png" alt="">
          </v-col>
          <v-col lg="2" cols="4" class="sponser-container" >
            <img class="sponser-img" src="~assets/img/sponser6.png" alt="">
          </v-col>
        </v-row>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.c-app {
  padding-top: 70px;
  padding-bottom: 10px;
  background: #dedede;

  @media (max-width: 960px){
    padding-top: 100px;
  }
  &-banner {
    @media (max-width: 960px) {
      margin-top: -70px;
    }
    @media (max-width: 600px) {
      margin-top: -100px;
    }
  }
  &-items {
    @media (max-width: 960px) {
      margin-top: 275px;
    }
    @media (max-width: 600px) {
      margin-top: 45px;
    }
    @media (max-width: 450px) {
      margin-top: 10px;
    }
  }
}
.sponser-img{
  width: 100px;
  height: 120px;
}
.btn-padding{
  @media (max-width: 600px) {
    padding: 5px 12px;
  }
}
.sponser-container{
  display: flex;
  justify-content: center;
}
.c-app-business {
  position: relative;
  a {
    position: absolute;
    top: -35px;
    @media (max-width: 1263px) {
      top: 0;
    }
    @media (max-width: 960px) {
      top: -35px;
    }
  }
}
.c-app-download {
  backdrop-filter: blur(30px);
  background-image: linear-gradient(-57deg, #ffffff 69%, #fbfbfb 8%);
  border-radius: $bradius;
  box-shadow: $bshadow2;
  &-img {
    @media (max-width: 448px) {
      display: none;
    }
  }
  .phone {
    width: 189px;
    margin-top: -66px;
    margin-right: 40px;
  }
  .logo {
    width: 30px;
  }
  .download-text {
    font-size: 20px;
    font-weight: bold;
    @media (max-width: 600px) {
      font-size: 15px;
    }
  }
  &-res-icons {
    padding: 10px 10px 10px 25px !important;
  }
  .c-app-download-show {
    padding: 18px;
    margin-right: 52px;
    @media (max-width: 600px) {
      padding: 5px 0;
    }
  }
  .c-app-btn {
    padding: 12px 14px;
    color: #fff;
    border-radius: 10px;

    @media (max-width: 448px) {
      width: 100%;
      display: block;
      text-align: center;
    }
    a {
      font-size: 18px;
    }
    i {
      font-size: 30px !important;
      margin: 0px 5px;
      vertical-align: middle;
      @media (max-width: 600px) {
        font-size: 20px !important;
      }
    }
    .icon-google-play {
      position: relative;
      right: -8px;
      @media (max-width: 600px) {
        right: 0;
      }
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
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .google-play {
    background: #00d0fc;
    margin-top: 5px;
    padding: 11px 18px !important;
    @media (max-width: 600px) {
      font-size: 12px;
      padding: 11px 7px !important;
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

@media (max-width: 600px) {
  .px-sm-0 {
    padding-right: 0;
    padding-left: 0;
  }

  .text-sm-right {
    text-align: right;
  }
}

@media only screen and (max-width: 600px) {
  .phone {
    // display: none;
    margin-right: 0 !important;
  }
  .c-app-download-show {
    margin-right: 5% !important;
  }
  .c-app-business {
    a {
      position: unset;
    }
  }
}
.spancers-title{
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  @media (max-width: 450px){
    margin-top: 0px;
  }
}
</style>
