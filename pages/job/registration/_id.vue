<template>
  <div>
    <Address v-if="step == 2" @nextstep="nextStep()" />
    <SocialNetwork v-if="step == 3" @nextstep="nextStep()" />
    <HoursWork v-if="step == 4" @nextstep="nextStep()" />
    <AppImage v-if="step == 5" @nextstep="nextStep()" />
  </div>
</template>

<script>
import Address from "~/components/job/AppAddress.vue";
import SocialNetwork from "~/components/job/AppSocialNetwork.vue";
import HoursWork from "~/components/job/AppHoursWork.vue";
import AppImage from "~/components/job/AppImage.vue";

export default {
  components: {
    Address,
    SocialNetwork,
    HoursWork,
    AppImage
  },
  data() {
    return {
      step: 2
    };
  },
  methods: {
    nextStep() {
      this.step = this.step + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.c-submit-job {
  margin: 0px auto;
}
</style>
