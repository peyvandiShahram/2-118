<template>
  <div style="margin:100px 0">
    <div>
      <h3>اطلاعات تماس</h3>
    </div>
    <div class="c-job_form">
      <div v-for="(social, index) in socials" :key="index" class="mt-3">
        <v-row>
          <v-col lg="4" cols="12" style="padding:5px">
            <v-select
              v-model="social.social_network_id"
              :items="items"
              item-value="type"
              item-text="name"
              class="c-job-phone"
              dense
              outlined
              hide-details="true"
            />
          </v-col>
          <v-col lg="8" cols="12" style="padding:5px">
            <v-text-field
              v-model="social.link"
              label="آدرس"
              outlined
              dense
              hide-details="true"
              class="position-relative"
              :append-icon="
                social.social_network_id == 1
                  ? 'mdi-instagram'
                  : 'mdi-facebook'
              "
              prepend-inner-icon="mdi-close-box"
              @click:prepend-inner="delrow(index)"
            />
          </v-col>
        </v-row>
      </div>
      <v-row class="add-container" @click="addRow()">
        <v-icon color="#152d72">
          mdi-plus-box
        </v-icon>
        افزودن شماره دیگر
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            type: 0,
            name: "فیسبوک"
          },
          {
            type: 1,
            name: "اینستاگرام"
          }
        ],
        socials: [{ social_network_id: "", link: "" }]
      }
    },
    methods: {
      delrow(index) {
        this.socials.splice(index, 1);
      },
      addRow() {
        this.socials.push({ social_network_id: "", link: "" })
      },
    },
  }
</script>

<style lang="scss" scoped>
.c-job_form {
  background: #fff;
  padding: 15px;
  border-radius: $bradius;
  border: solid 1px $border-color;
  margin-bottom: 15px;
  margin-top: 10px;
}
.c-job-phone {
  background: #e9e9e9;
  border: solid 1px #e9e9e9;
  font-size: 13px;
}

.add-container{
  color: #152d72;
  font-size: 15px;
  font-weight: 700;
  padding: 15px;
  cursor: pointer;
}

</style>