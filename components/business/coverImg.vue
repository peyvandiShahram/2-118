<template>
        <v-row>
            <img class="image-container" :src="setImg" alt="">
        </v-row>
</template>

<script>
    export default {
        name:'ConverImg',
        props: {
            cover: {
                type: String,
                require: true
            },
        },
        computed: {
            setImg() {
                return this.cover
            }
        },
    }
</script>

<style lang="scss" scoped>
    .image-container{
        border-radius: 20px;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 600px){
        .image-container{
            height: 180px;
        }
    }
</style>