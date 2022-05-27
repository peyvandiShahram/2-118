<template>
  <v-col lg="8" cols="12" class="c-aboutUs ">
    <div class="c-aboutUs-title">
      <h3 class="pa-4">
        شرایط و قوانین استفاده از خدمات
      </h3>
    </div>
    <div class="pa-5">
      ss
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
    border-radius: $bradius;
    padding-top: 70px;
    padding-bottom: 50px;
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
</style>
