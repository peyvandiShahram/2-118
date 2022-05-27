<template>
    <v-row>
        <v-row class="edit" v-if="edit">
            <div  @click="editInfo">ویرایش اطلاعات</div>
            <v-icon size="20" color="#152d72">
                mdi-square-edit-outline
            </v-icon>
        </v-row>        
        <div class="info-card">
            <v-row>
                <v-col cols="4">
                    <div class="info-seen">
                        {{like}}
                        <v-icon size="25">mdi-eye</v-icon>
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="logo-container">
                        <img class="info-logo" src="~/assets/img/logo/logo.png" alt="">                     
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="info-sms">
                        <v-badge
                            color="green"
                            content="6"
                            >
                            <v-icon size="40">mdi-email-outline</v-icon>
                        </v-badge>
                    </div>                  
                </v-col>
            </v-row>
            <v-row>
                <div class="info-title">{{title}}</div>
            </v-row>
            <v-row>
                <div class="contact">
                    <v-icon class="contact-icon" color="#152d72" size="20">mdi-phone</v-icon>
                    <div v-if="tel.length>0" class="contact-number">{{tel[0].tel}}</div>
                    <div v-else class="contact-number">----------------------------------</div>
                </div>
            </v-row>
            <v-row>
                <div class="contact">
                    <v-icon class="contact-icon" color="#152d72" size="20">mdi-cellphone</v-icon>
                    <div v-if="tel.length>1" class="contact-number">{{tel[1].tel}}</div>
                    <div v-else class="contact-number">----------------------------------</div>
                </div>
            </v-row>
            <v-row>
                <div class="contact" style="width:100%">
                    <v-icon class="contact-icon" color="#152d72" size="20">mdi-map-marker-outline</v-icon>
                <div class="contact-number">{{address}}</div>
                </div>
            </v-row>
            <v-row>
                <div class="social">
                    <a href="/">
                        <i class="icon-linkedin" />
                    </a>
                    <a href="/">
                        <i class="icon-facebook" />
                    </a>
                    <a href="/">
                        <i class="icon-twitter" />
                    </a>
                    <a href="/">
                        <i class="icon-instagram" />
                    </a>
                    <a href="/">
                        <i class="icon-telegram" />
                    </a>
                </div>
            </v-row>
            <nuxt-link :to="website" v-if="website">
                <v-btn 
                    outlined 
                    color="#ff9900"
                    width="85%"
                    style="margin:0 20px 20px 20px"
                >
                    مشاهده وب سایت
                </v-btn>
            </nuxt-link>
        </div>        
    </v-row>
</template>

<script>
    export default {
        name:'InfoCard',
        props: {
            title: {
                type: String,
                require:true 
            },
            tel: {
                type: Array,
                require:true 
            },
            address: {
                type: String,
                require:true 
            },
            website: {
                type: String,
                require:true 
            },
            like:{
                type:String,
                require:true
            },
            // links: {
            //     type: Array,
            //     require:true 
            // },
            edit:{
                type:Boolean,
                require:true
            },
            id:{
                type:String,
                require:true
            },
        },
        methods: {
            editInfo() {
                this.$router.push({ path: `/job/edit/${this.id}`, query: { step: 1 }})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .info-card{
        width: 100%;
        border: 2px solid #152d72;
        border-radius: 15px;
        position: relative;
        margin-top: 50px;
        -webkit-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
    }
    .info-seen{
        width: 100%;
        border-radius:0 15px 0 35px ;
        border: 1px solid #152d72;
        display: flex;
        justify-content: center;
        padding: 10px;
    }
    .info-sms{
        width: 100%;
        border-radius: 15px 0 35px 0 ;
        border: 1px solid #152d72;
        display: flex;
        justify-content: center;
        padding: 5px;
    }
    .logo-container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .contact-number{
        font-size: 16px;
        font-weight: 700;
    }
    .info-logo{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        position: absolute;
        background: #fff;
        padding: 5px;
        top: -40px;
    }
    .info-title{
        width: 100%;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        color: #152d72;
        margin-top: -10px;
    }
    .edit{
        font-weight: 700;
        font-size: 17px;
        color: #152d72; 
        cursor: pointer;
        margin-top: 40px;
    }
    .contact{
        padding:10px 20px;
        display: flex;
        // width: 45%;
        // justify-content: space-between;
    }

    .contact-icon{
        border: 1px solid #152d72;
        border-radius: 50px;
        padding: 5px;
        width: 25px;
        height: 25px;
        margin-left: 20px;
    }
    .social{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-right: 60px;
        padding-left: 50px;
        margin-bottom: 20px;

        i {
            color: #fff;
            border-radius: 4px;
            display: inline-block;
            padding: 8px;
            font-size: 17px;
        }
    }
    @media only screen and (max-width: 600px){
        .contact{
            width: 55%;
        }
        .info-logo{
            right: 37%;
        }
        .info-card{
            margin:40px 0 20px 0
        }
    }

        .icon-facebook {
            background-color: #385697;
        }
        .icon-telegram {
            background-color: #2ba0da;
        }
        .icon-twitter {
            background-color: #00acee;
        }
        .icon-linkedin {
            background-color: #0182b9;
        }
        .icon-instagram {
            background-image: linear-gradient(266deg,#4e60d3,#913baf 35%,#d52d88 68%,#f26d4f);
        }
</style>