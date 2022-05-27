<template>
    <div>
        <v-row>
            <div id="map"></div>
        </v-row>        
    </div>
</template>

<script>
    export default {
        name:'InfoMap', 
        props: {
            lat: {
                type: Number,
                require:true 
            },
            lng: {
                type: Number,
                require:true 
            },
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
            
            createMap(){
                const map = L.map("map", {
                    minZoom: 1,
                    maxZoom: 20,
                    crs: L.CRS.EPSG3857,
                    center: [31, 52],
                    zoom: 5,
                    drawControl: false,
                    zoomControl: false
                });
 
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                }).addTo(map);
                L.control.zoom({
                position: 'bottomleft'
                }).addTo(map);
                const marker=L.marker([this.lat,this.lng]).addTo(map)
                map.setView(marker.getLatLng(), 14,{
                animate: true
                })
            }
        },
        mounted () {
            this.createMap();
        },
    }
</script>

<style lang="scss" scoped>
    #map{
        height: 300px;
        width: 100%;
        border: 1px solid black;
        border-radius: 15px;
        margin: 40px 0;
        -webkit-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
    }
</style>