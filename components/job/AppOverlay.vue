<template>
  <v-col cols="lg-12" class="px-0">
    <div id="map-wrap" class="c-page-map">
      <div class="c-page-map-overlay" @click="openModal"></div>
    </div>
  </v-col>
</template>

<script>
let L = { icon() {} };
if (process.browser) {
  L = require("leaflet");
}
export default {
  data() {
    return {
      isMapModalOpen: false
    };
  },
  methods: {
    openModal() {
      this.isMapModalOpen = true;
      this.$emit("openModal", this.isMapModalOpen);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-page-map {
  border-radius: $bradius;
  height: 100px;
  &-overlay {
    height: 100px;
    margin: 0;
    background: url("../../assets/img/map.png");
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    border: 2px solid #ccc;
    border-radius: 3px;
  }
}
</style>
