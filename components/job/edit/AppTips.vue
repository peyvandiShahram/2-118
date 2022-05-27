<template>
  <div class="c-submit-job__tips">
    <div class="c-tips-header">
      <div class="c-tips-header__title">
        مزایای ثبت نام در ۲۱۱۸
      </div>
    </div>
    <div class="c-tips-text">
      <ul>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
        <li>بی نیاز از داشتن وبسایت و هزینه های مرتبط با آن</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.c-submit-job__tips {
    background: #fff;
    position: relative;
    // top: 150px;
    margin-top: 35px;
    box-shadow: $bshadow2;
}
.c-tips-header {
  background: rgb(67,126,185);
  background: radial-gradient(circle, rgba(67,126,185,1) 0%, rgba(47,87,129,1) 100%);
  height: 130px;
  border-bottom: 25px solid transparent;
  clip-path: polygon(0 0, 100% 0%, 100% 82%, 0 100%);
}
.c-tips-header__title {
  padding-top: 10%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  font-weight: bold;
}
.c-tips-text {
  padding: 20px;
  li {
    margin-top: 20px;
    color: $text-color;
  }
}
</style>
