<template>
  <v-col lg="8" cols="12" class="c-aboutUs ">
    <div class="c-aboutUs-title">
      <h3 class="pa-4">
        درباره ما
      </h3>
    </div>
    <div class="pa-5">
      <div class="c-aboutUs-info">
        <v-row>
          <v-col lg="6" cols="12" class="text-justify">
            <p>سامانه ملی اصناف و مشاغل در راستای توصیه‌های مقام معظم رهبری جهت رونق تولید و اشتغال و حمایت از کارآفرینان و فراهم شدن زمینه‌های مناسب‌تر برای افزایش توان رقابت پذیری واحدهای صنفی، افزایش بهره‌وری، جایگاه‌سازی و برندسازی اصناف و مشاغل و با رویکرد دیجیتال نمودن اطلاع‌رسانی آن‌ها با نام تجاری «۲۱۱۸» و با حمایت شتاب دهنده ایده‌های شرکت مخابرات ایران (شاما) ایجاد گردید</p>
            <p>رسالت اصلی این سامانه یکپارچه‌سازی و ساماندهی مشاغل کشور بوده و نه تنها به عنوان پل ارتباطی بین مشتریان و اصناف محسوب خواهد شد بلکه خدمات مدرن‌تر و بیشتری به بنگاه‌های اقتصادی ارائه خواهد نمود بطوریکه با خلق ارزش بیشتر، حذف دلالان و واسطه‌ها، پائین آمدن قیمت‌های کالاها، افزایش تراکنش‌ها و سهولت دسترسی به بازارهای هدف باعث رونق بیشتر بازار و اشتغال خواهد شد</p>
          </v-col>
          <v-col lg="6" cols="12">
            <h3>
              دفتر مرکزی
            </h3>
            <span>
              اصفهان، خیابان باغ گلدسته، خیابان شهید بهشتی نژاد، ساختمان نقش جهان
            </span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pa-5">
      <div class="c-aboutUs-call">
        <h4>تلفن تماس</h4>
        <div class="c-aboutUs__phoneNumber">
          <span class="areaـcode">
            ۰۲۱ -
          </span>
          <div class="d-inline number">
            <span>۲</span>
            ۱۱۸
          </div>
        </div>
        <span class="c-aboutUs__time">
          پاسخ‌گویی از ساعت ۸ صبح الی ۱۷
          روزهای شنبه تا پنجشنبه
        </span>
        <div class="c-aboutUs-email">
          <h4>پست الکترونیکی</h4>
          <h3>Support@2118.com</h3>
        </div>
      </div>
    </div>
    <div class="c-aboutUs-social">
      <h4> شبکه‌های اجتماعی</h4>
    </div>
  </v-col>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.c-aboutUs {
    background: #ffffff;
    padding-top: 70px;
    padding-bottom: 50px;
    border-radius: $bradius;
    margin: 20px auto;
    .c-aboutUs-title {
        border-bottom: solid 2px $border-color;
    }
    .c-aboutUs-info {
        font-weight: bold;
        line-height: 1.9;
        border-bottom: solid 2px $border-color;
    }
    .c-aboutUs-call {
        text-align: center;
        padding: 10px;
        border-bottom: solid 2px $border-color;
        .c-aboutUs-email {
            margin-top: 20px;
        }
    }
    .c-aboutUs-social {
        text-align: center;
        padding: 10px;
    }
}
@media only screen and (max-width: 960px){
    .c-aboutUs{
      padding-top: 0px;
    }
}
.c-aboutUs__phoneNumber {
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
.c-aboutUs__time {
    background: $c-gray;
    color: #404040;
    font-size: 10px;
    text-align: center;
    border-radius: $bradius;
    padding: 5px 10px;
    font-weight: bold;
}
</style>
