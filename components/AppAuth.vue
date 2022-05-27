<template>
  <v-col cols="12" lg="7" class="c-auth d-flex">
    <v-col lg="4" class="c-auth__logo">
      <div class="d-flex justify-center">
        <img src="~assets/img/logo/logo-light.svg" alt="">
        <span class="Rectangle-39" />
        <img src="~assets/img/logo/Telec-light.svg" alt="">
      </div>
    </v-col>
    <v-col lg="8" cols="12" class="mt-auto mb-auto">
      <slot />
    </v-col>
  </v-col>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.c-auth {
  background: #fff;
  margin: 40px auto;
  box-shadow: $bshadow2;
  border-top-left-radius: 40px;
  padding: 0px;
  .c-auth__logo {
    background-color: $primary;
    min-height: 500px;
    img {
      margin: 10px;
    }
  }
}
.Rectangle-39 {
  width: 2px;
  height: 70px;
  margin: 7px;
  transform: rotate(10deg);
  background: linear-gradient(to bottom, $primary, #ffffff 52%, $primary);
}
@media only screen and (max-width: 600px) {
    .c-auth {
        border-top-left-radius: 0px;
        .c-auth__logo {
          display: none;
        }
    }
}
</style>
