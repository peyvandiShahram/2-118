<template>
  <div class="c-favorit" :style="style" @click="addFavorit()">
    <v-icon v-if="!favorit" medium>
      mdi-heart-outline
    </v-icon>
    <v-icon v-else medium class="c-favorit-heart">
      mdi-heart
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    imgheight: {
      default: "190",
      type: String
    },
    office_id: {
      default: null,
      type: String,
      required: true
    }
  },
  data() {
    return {
      favorit: false,
      style: "top: " + this.imgheight + "px !important;"
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    addFavorit() {
      if (this.user) {
        this.$axios
          .post("add_office_like", {
            office_user_id: this.office_id,
            state: 1,
            token: this.user.token
          })
          .then(res => {
            this.results = res.data;
            this.$toast.global.msgSuccess({
              message: "با موفقیت به لیست علاقه مندی ها اضافه شد"
            });
          })
          .catch(err => {
            //   this.$toast.global.msgError({
            //     message: "خطایی پیش آمده"
            //   });
          });
        this.favorit = !this.favorit;
      } else {
        this.$toast.global.msgError({
          message: "لطفا ابتدا وارد شوید"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.c-favorit {
  position: absolute;
  left: 14px;
  // top: calc(100% - 30);
  cursor: pointer;
  .c-favorit-heart {
    color: red;
  }
}
</style>
