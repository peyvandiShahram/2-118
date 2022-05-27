<template>
  <div class="c-footer__social">
    <div class="text-center mb-1">
      <a href="/">
        <i class="icon-linkedin" />
      </a>
      <a href="/">
        <i class="icon-facebook" />
      </a>
      <a href="/">
        <i class="icon-twitter" />
      </a>
      <a href="/">
        <i class="icon-instagram" />
      </a>
      <a href="/">
        <i class="icon-telegram" />
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.c-footer__social {
  text-align: center;
  margin-right: 20px;
  span {
    font-size: 11px;
  }
}
i {
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  padding: 8px;
  font-size: 17px;
  }
  .icon-facebook {
    background-color: #385697;
  }
  .icon-telegram {
    background-color: #2ba0da;
  }
  .icon-twitter {
    background-color: #00acee;
  }
  .icon-linkedin {
    background-color: #0182b9;
  }
  .icon-instagram {
    background-image: linear-gradient(266deg,#4e60d3,#913baf 35%,#d52d88 68%,#f26d4f);
  }
</style>

