<template>
  <div class="c-stepper">
    <h4 class="text-center">
      فرآیند تکمیل ثبت آگهی
    </h4>
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progressBar">
          <ul class="progressBar">
            <li :class="[step == 1 ? 'active' : '' || step > 1 ? 'last-active': '']">
              اطلاعات پایه
            </li>
            <li :class="[step == 2 ? 'active' : '' || step > 2 ? 'last-active': '']">
              محل کسب و کار
            </li>
            <li :class="[step == 3 ? 'active' : '' || step > 3 ? 'last-active': '']">
              فضای مجازی
            </li>
            <li :class="[step == 4 ? 'active' : '' || step > 4 ? 'last-active': '']">
              ساعت فعالیت
            </li>
            <li :class="[step == 5 ? 'active' : '' || step > 5 ? 'last-active': '']">
              مارکتینگ
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      default: '1',
      type: String
    }
  }
}
</script>

<style lang="scss">
.c-stepper {
  margin-top: 2px;
  background: #ebebeb;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 3;
}
.progressBar li {
    list-style-type: none;
    float: right;
    width: 20%;
    position: relative;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: $text-color !important;
}

.progressBar li:before {
    content: " ";
    line-height: 30px;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    border: 2px solid $primary;
    display: block;
    text-align: center;
    margin: 0 auto 10px;
    background-color: transparent
}

.progressBar li:after {
    content: " ";
    position: absolute;
    width: 88%;
    height: 2px;
    background-color: $primary;
    top: 8px;
    right: -44%;
    // z-index: -1;
}

.progressBar li:first-child:after {
    content: none;
}

.progressBar li.active:before {
    border-color: $primary !important;
    background-color: #9ab7e5 !important;
}

.progressBar li.active:after {
    background-color: $primary !important;
}
.progressBar li.last-active:before {
    border-color: $primary !important;
    background-color: $primary !important;
}

.progressBar li.last-active:after {
    background-color: $primary !important;
}
</style>
