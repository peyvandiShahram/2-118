<template>
    <div>
        <v-row>
            <div class="rating-title">
                تصاویر 360 درجه 
            </div>
        </v-row>
        <v-carousel 
            v-model="model"
            cycle
            show-arrows-on-hover
            hide-delimiters 
            height="100%"
            v-if="images.length>0"
        >
            <v-carousel-item
            v-for="(image, index) in images"
            :key="index"
            >
                <v-sheet
                    height="100%"
                    tile
                >
                    <v-row>
                <v-zoomer class="image">
                <img
                    :src="image.img"
                    style="object-fit: contain; width: 100%; height: 100%;"
                >
                </v-zoomer>
                    </v-row> 
                </v-sheet>
            </v-carousel-item>
        </v-carousel>   
        <v-row v-else>
            <img src="~/assets/img/no-image.png" class="image"  alt="">
            <div class="header-title">تصویری وجود ندارد</div>
        </v-row>   
    </div>
</template>
 
<script>
    export default {
        name:'ImagePar',
        props: {
            images: {
                type: Array,
                require:true 
            },
        },
        data() {
            return {
                 model: 0,
            }
        },

    }
</script>

<style lang="scss" scoped>
    .image{
        height: 300px;
        width: 100%;
        border: 1px solid black;
        border-radius: 15px;
        -webkit-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
    }
    @media only screen and (max-width: 700px){
        .image{
            margin: 10px 0; 
        }
    }
    .rating-title{
        width: 100%;
        font-size: 17px;
        font-weight: 700;
        margin-right: 10px;
        text-align: right;
        padding:20px;
    }
    .header-title{
        font-weight: 500;
        font-size: 15px;
        padding: 10px 24px;
        margin-bottom: 20px;
    }
</style>