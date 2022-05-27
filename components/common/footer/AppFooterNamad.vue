<template>
  <div class="c-footer__namad">
    <v-row>
    </v-row>
    <v-row justify="space-around" no-gutters>
      <div class="c-footer__namad">
        <img src="~assets/img/namad/sabt.svg" width="40px">
        <div>
          نشان ملی ثبت
          (رسانه‌های دیجیتال)
        </div>
      </div>
      <div class="c-footer__namad enamad">
        <img src="~assets/img/namad/enamad.svg" width="90px">
        <div>نماد اعتماد الکترونیک</div>
      </div>
    </v-row>
    <AppFooterEmail v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"/>
  </div>
</template>

<script>
import AppFooterEmail from '~/components/common/footer/AppFooterEmail'
export default {
  components: {
    AppFooterEmail
  },
}
</script>

<style lang="scss" scoped>
.c-footer__namad {
    .c-footer__namad {
        width: 90px;
        margin-top: 14px;
        margin-bottom: 14px;
        border-radius: 16px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
        text-align: center;
        padding: 7px 7px;
        div {
            font-size: 8px;
            margin-top: 3px;
        }

    }
    .enamad {
        background: #eec239;
    }
    .c-footer__newsletter {
        p {
            color: #7e7e7e;
            font-size: 12px;
            font-weight: bold;
        }
        button {
            margin-top: 5px;
            font-size: 12px;
        }
    }
    .c-footer__input {
      width: 100%;
      height: 35px;
      margin: 0 auto;
      border: solid 1px #7e7e7e !important;
      border-radius: $bradius;
      padding: 0 15px;
    }
}
</style>

