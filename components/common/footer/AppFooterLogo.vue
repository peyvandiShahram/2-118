<template>
  <div>
    <v-row justify="center">
      <img src="~assets/img/logo/vertical-logo.svg" alt="">
      <span class="Rectangle-39" />
      <img src="~assets/img/logo/Telec.png" alt="">
    </v-row>
    <div class="c-footer__info">
      سامانه الکترونیکی 218 خدمتی نوین از شرکت مخابرات ایران جهت تسریع و تسهیل در دسترسی کاربران به اطلاعات مشاغل
    </div>
    <div class="c-footer__phoneNumber">
      <span class="areaـcode">
        ۰۲۱ -
      </span>
      <div class="d-inline number">
        <span>۲</span>
        ۱۱۸
      </div>
    </div>
    <div class="c-footer__time">
پاسخگوئی از ساعت 8 الی 14 بجز روزهای تعطیل و پنجشنبه
    </div>
  </div>
</template>

<script>




</script>

<style lang="scss" scoped>
.Rectangle-39 {
  width: 2px;
  height: 70px;
  margin: 7px;
  transform: rotate(10deg);
  background: linear-gradient(to bottom, #ffffff, #404040 52%, #ffffff);
}
.c-footer__info {
    text-align: center;
    margin-top: 24px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.56;
}
.c-footer__phoneNumber {
    direction: ltr;
    color: $primary;
    text-align: center;
    .areaـcode {
        font-size: 24px;
        font-weight: bold;
    }
    .number {
        font-size: 50px;
        font-weight: bold;
        span {
            color: $c-orange;
        }
    }
}
.c-footer__time {
    background: $c-gray;
    color: #404040;
    font-size: 10px;
    text-align: center;
    border-radius: $bradius;
    padding: 5px;
}
.social{
  width: 100%;
  margin: 20px 0;
}
</style>
