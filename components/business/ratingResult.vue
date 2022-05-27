<template>
    <div>
        <v-row v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
          <div class="point">
            به این کسب و کار امتیاز دهید
          </div>
            <v-rating
              v-model="rating"
              background-color="#92939f"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="35"
              class="rating-container"
            ></v-rating>
            <v-divider></v-divider>
        </v-row>
        <v-row>
            <div class="rating-title">
                امتیازات کاربران
            </div>
        </v-row>
        <v-row>
            <v-col cols="4" class="circle-bar" >
                <client-only>               
                    <RadialProgressBar          
                        :diameter="diameter"
                        :completed-steps=totalResult
                        :total-steps=totalOpinion
                        startColor="#152d72"
                        stopColor="#152d72"
                        innerStrokeColor
                        ="#e9e7e7"
                        :strokeWidth=8
                        :innerStrokeWidth=8
                    >
                        <div class="chart-number">
                            {{totalResult}}
                        </div>
                        <p class="chart-text">
                          {{totalOpinion}} نفر
                        </p>
                    </RadialProgressBar> 
                </client-only>
                
            </v-col>
            <v-col cols="8" >
                <div class="bar-container">
                    <div class="bar-text">5</div>
                      <client-only>
                      <progress-bar
                        :diameter=200
                        :completed-steps="opinion.score_5"
                        :total-steps="totalOpinion"
                        :width=400
                        startColor="#152d72"
                        style="padding:5px 0"
                        :showTip="false"
                        :height="height"
                    /> 
                    </client-only>
                   
                    <div class="bar-text">{{opinion.score_5}}</div>
                </div>
                <div class="bar-container">
                    <div class="bar-text">4</div>
                      <client-only>
                      <progress-bar
                        :diameter=200
                        :completed-steps="opinion.score_4"
                        :total-steps="totalOpinion"
                        :width=400
                        startColor="#152d72"
                        style="padding:5px 0"
                        :showTip="false"
                        :height="height"
                    /> 
                    </client-only>
                   
                    <div class="bar-text">{{opinion.score_4}}</div>
                </div>
                <div class="bar-container">
                    <div class="bar-text">3</div>
                      <client-only>
                      <progress-bar
                        :diameter=200
                        :completed-steps="opinion.score_3"
                        :total-steps="totalOpinion"
                        :width=400
                        startColor="#152d72"
                        style="padding:5px 0"
                        :showTip="false"
                        :height="height"
                    /> 
                    </client-only>
                   
                    <div class="bar-text">{{opinion.score_3}}</div>
                </div>
                <div class="bar-container">
                    <div class="bar-text">2</div>
                      <client-only>
                      <progress-bar
                        :diameter=200
                        :completed-steps="opinion.score_2"
                        :total-steps="totalOpinion"
                        :width=400
                        startColor="#152d72"
                        style="padding:5px 0"
                        :showTip="false"
                        :height="height"
                    /> 
                    </client-only>
                   
                    <div class="bar-text">{{opinion.score_2}}</div>
                </div>
                <div class="bar-container">
                    <div class="bar-text">1</div>
                      <client-only>
                      <progress-bar
                        :diameter=200
                        :completed-steps="opinion.score_1"
                        :total-steps="totalOpinion"
                        :width=400
                        :height="height"
                        startColor="#152d72"
                        style="padding:5px 0"
                        :showTip="false"
                    /> 
                    </client-only>
                   
                    <div class="bar-text">{{opinion.score_1}}</div>
                </div>                                                
            </v-col>
        </v-row>

    </div>
</template>

<script>

    export default {
        name:'RatingResult',
        props: {
            opinion: {
                type: Object,
                require:true 
            },
        },
        data() {
            return {
                completedSteps: 8,
                totalSteps: 10,
                rating:0
            };
        },
        computed: {
            diameter() {
                if(this.$vuetify.breakpoint.xs)
                    return 110 
                else if(this.$vuetify.breakpoint.sm)
                    return 130
                return 150
            },
            height(){
                if(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
                    return 25 
                return 10
            },
            totalOpinion(){
                return Object.values(this.opinion).reduce((a, b) => a + b, 0)
            },
            totalResult(){
                let sum=0
                Object.values(this.opinion).forEach((element,index) => {
                    sum+=element*(index+1)
                });
                if(sum===0)
                    return 0
                return sum/Object.values(this.opinion).reduce((a, b) => a + b, 0)
            }
        },

    }
</script>

<style lang="scss" scoped>
    .bar-container{
        width: 100%;
        display: flex;
        justify-content: space-between;
        direction: rtl;
    }
    .bar-text{
        font-size: 12px;
        color:"#454744";
        font-weight: 700;
        padding: 5px 10px;
    }
    .rating-title{
        width: 100%;
        font-size: 17px;
        font-weight: 700;
        margin-right: 10px;
        text-align: right;
        padding:20px;
    }
    .chart-number{
        font-size: 30px;
        font-weight: bold;
        line-height: 1.6;
        text-align: center;
        color: #454744;
    }
    .chart-text{

        font-size: 15px;
        font-weight: bold;
        line-height: 1.6;
        text-align: center;
        color: #454744;
    }
    .point{
        width: 100%;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-top: 20px;
    }
    .rating-container{
        width: 100%;
        text-align: center;
    }
    @media only screen and (max-width: 600px){
        .circle-bar{
            margin: 20px -20px 0 20px;
        }
        .chart-number{
            font-size: 25px;
        }
    }
</style>