<template>
  <div v-if="loading" class="loading-page">
    <div>
      <img class="footer__logo" src="~/assets/img/logo/vertical-logo.svg">
    </div>
    <div class="loading-text">
      <img class="loading ma-auto" src="~/assets/img/loading.svg">
      <span>کمی صبر کنید...</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 15%;
  font-size: 30px;
  z-index: 99999;
}
.loading {
  height: 40px;
}
.loading-text {
  direction: rtl;
}
span {
  color: #152d72;
}
</style>
