<template>
  <div class="edit">
    <jobInfo v-if="step == 1" />
    <Address v-if="step == 2"  />
    <SocialNetwork v-if="step == 3"  />
    <HoursWork v-if="step == 4"  />
    <AppImage v-if="step == 5"  />
  </div>
</template>

<script>
import Address from "~/components/job/edit/AppAddress.vue";
import SocialNetwork from "~/components/job/edit/AppSocialNetwork.vue";
import HoursWork from "~/components/job/edit/AppHoursWork.vue";
import AppImage from "~/components/job/edit/AppImage.vue";
import jobInfo from '~/components/job/edit/AppFormEdit.vue'

export default {
  components: {
    Address,
    SocialNetwork,
    HoursWork,
    AppImage,
    jobInfo
  },
  data() {
    return {
      step: null
    };
  },
  methods: {
    getStep() {
      this.step = this.$route.query.step;
    }
  },
  created () {
    this.getStep();
  },
};
</script>

<style lang="scss" scoped>
.c-submit-job {
  margin: 0px auto;
}
.edit{
    padding-top:70px;
    padding-bottom: 50px;
}
@media only screen and (max-width: 960px){
    .edit{
        padding-top: 0px;
    }
}
</style>
