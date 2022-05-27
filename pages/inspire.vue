<template>
  <v-row class="inspire">
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<style scoped>
    .inspire{
        padding-top: 70px;
        padding-bottom: 50px;
    }
    @media only screen and (max-width: 960px){
        .inspire{
          padding-top: 0px;
        }
    }
</style>