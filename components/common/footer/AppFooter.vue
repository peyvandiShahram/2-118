<template>
  <footer class="footer-zindex">
    <div class="c-footer">
      <div class="custom-container">
        <v-row>
          <div class="moblie">
            <v-col cols="12" >
              <AppFooterEmail />
            </v-col>
            <v-col md="2" cols="12">
              <AppFooterLogo />
            </v-col> 
            <v-col cols="12">
              <div @click="more= !more" class="footer-link">
               دیگرخدمات شرکت مخابرات
              </div>
            </v-col>
          </div>
          <v-row v-if="more">
            <v-col md="2" cols="12" class="large">
              <AppFooterLogo />
            </v-col>
            <v-col md="2" cols="6">
              <AppFooterLink title="سامانه ۲۱۱۸" :list="FastAccessLink" />
            </v-col>
            <v-col md="2" cols="6">
              <AppFooterLink title="تلفن ثابت" :list="phoneLink" />
            </v-col>
            <v-col md="2" cols="6">
              <AppFooterLink title="اینترنت" :list="internetLink" />
            </v-col>
            <v-col md="2" cols="6">
              <AppFooterLink title="مخابرات من" :list="myContactLink" />
            </v-col>
            <v-col md="2" cols="12">
              <AppFooterNamad />
            </v-col>
          </v-row>
        </v-row>
        <v-row>
          <div class="social">
            <AppFooterSocial />
          </div>
          
        </v-row>
        <hr style="margin-top:10px">
      </div>
      <AppFooterSponser class="large"/>
      <hr>
      <AppfooterCopyright />
    </div>
  </footer>
</template>

<script>
import AppFooterLogo from '~/components/common/footer/AppFooterLogo'
import AppFooterLink from '~/components/common/footer/AppFooterLink'
import AppFooterNamad from '~/components/common/footer/AppFooterNamad'
import AppFooterSponser from '~/components/common/footer/AppFooterSponser'
import AppfooterCopyright from '~/components/common/footer/AppfooterCopyright'
import AppFooterEmail from '~/components/common/footer/AppFooterEmail'
import AppFooterSocial from '~/components/common/footer/AppFooterSocial'

export default {
  components: {
    AppFooterLogo,
    AppFooterLink,
    AppFooterNamad,
    AppFooterSponser,
    AppfooterCopyright,
    AppFooterEmail,
    AppFooterSocial
  },
  data () {
    return {
      more:true,
      FastAccessLink: [
        { title: 'پروفایل کاربری', link: '/' },
        { title: 'ثبت نام', link: '/' },
        { title: 'پلن ها', link: '/' },
        { title: 'بلاگ', link: '/' },
        { title: 'تماس با ما', link: '/' },
        { title: 'درباره ما', link: '/' },
        { title: 'قوانین و مقررات', link: '/' }
      ],
      phoneLink: [
        { title: 'ثبت نام تلفن ثابت', link: '/' },
        { title: 'ثبت نام تلفن رند', link: '/' },
        { title: 'پراخت قبض', link: '/' },
        { title: 'خدمات الکترونیک تلفن ثابت', link: '/' },
        { title: 'سرویس های ارزش افزوده', link: '/' }
      ],
      internetLink: [
        { title: 'دیتای تجاری', link: '/' },
        { title: 'ADSL', link: '/' },
        { title: 'تانوما', link: '/' },
        { title: 'بلاگ', link: '/' },
        { title: 'SIP Phone', link: '/' }
      ],
      myContactLink: [
        { title: 'پروفایل', link: '/' },
        { title: 'مدیریت قبض ها', link: '/' },
        { title: 'مدیریت قبض ها', link: '/' },
        { title: 'مدیریت اینترنت', link: '/' },
        { title: 'مدیریت طرح های ویژه', link: '/' },
        { title: 'کد پستی', link: '/' },
        { title: 'تست سرعت', link: '/' }
      ]
    }
  },

  computed: {
    showMore() {
      if(!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm){
        return true
      }
      return this.more  
    }
  },

}
</script>

<style lang="scss" scoped>
.c-footer {
  padding-top: 50px;
  background: #fff;
  color: #404040;
  position: relative;
  overflow: hidden;
  padding-bottom: 10px;
}
.footer-link {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: $primary;
  margin-bottom: 30px;
}
.social{
  width: 100%;
  display: flex;
  justify-content: center;
}
  @media only screen and (min-width: 690px){
    .moblie{
        display: none;
      }
    .footer-zindex{
      z-index: 10000000000
    }
  }
  @media only screen and (max-width: 690px) {
    .large {
      display: none;
    }
      
  }
</style>
