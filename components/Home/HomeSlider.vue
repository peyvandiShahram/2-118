<template>
  <div class="c-home-slide custom-container">
    <div class="c-swiper">
      <div v-swiper:homeSlider="homeSliderOptions" class="swiper">
        <div class="swiper-wrapper">
          <div v-for="slide in slides" :key="slide.i" class="swiper-slide">
            <a :href="slide.link">
              <img
                :src="slide.url"
                :alt="slide.alt"
                class="swiper-lazy"
                width="100%"
              />
              <div class="swiper-lazy-preloader" />
            </a>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   async fetch () {
  //     const data = await this.$axios.post('list_of_header_image')
  //     this.items = data.data
  //   },
  data() {
    return {
      slides: [
        {
          url: require("~/assets/img/Slide-1-1-min.png"),
          link: "/",
          alt: "2118"
        },
        {
          url: require("~/assets/img/Slide-2-2-min.png"),
          link: "/",
          alt: "2118"
        }
      ],
      homeSliderOptions: {
        lazy: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.c-home-slide {
  margin-top: 65px;
  position: relative;
}
.swiper {
  border-radius: 40px;
  border: 2px solid #152d72;
}

.c-swiper {
  img {
    object-fit: fill;
    width: 100%;
    height: 300px;
  }
}

@media only screen and (max-width: 900px) {
  .c-home-slide {
    padding: 0px !important;
    margin-top: 0;
  }
  .c-swiper {
    padding: 0 10px;
    img {
      height: 300px;
    }
  }
}
@media only screen and (max-width: 600px) {
  .c-swiper {
    padding: 0 10px;
    img {
      height: 30vh;
    }
  }
}
</style>
