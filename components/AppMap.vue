<template>
  <div>
    <div id="map" @click="showModal = true;otherMap()"></div>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="500px"
      v-model="showModal"
      style="z-index:1000000000"
    >
      <v-card class="c-modal-useCity">
        <div id="map2"></div>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="showModal = false"
          >بستن</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
</template>

<script>

export default {
  name:'Map',
  props: {
    lat: {
      type: Number,
      default: 32.6539
    },
    lng: {
      type: Number,
      default: 51.6660
    },
  },
  data() {
    return {
      showModal:false,
      marker:null,
      mapContainers:{
        map1:null,
        map2:null
      }
    }
  },
  methods: {
    createMap(){
      setTimeout(()=>{
        this.mapContainers.map1 = L.map('map', {
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
        }).addTo(this.mapContainers.map1);
        L.control.zoom({
        position: 'topleft'
        }).addTo(this.mapContainers.map1);
        this.marker=L.marker([this.lat,this.lng],{draggable:false}).addTo(this.mapContainers.map1)
        this.mapContainers.map1.setView(this.marker.getLatLng(), 5,{
        animate: true
        })
      },100)

    
    },

    otherMap(){
      setTimeout(()=>{        
        this.mapContainers.map2 = L.map('map2', {
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
        }).addTo(this.mapContainers.map2);
        L.control.zoom({
        position: 'topleft'
        }).addTo(this.mapContainers.map2);
        const marker=L.marker([this.lat,this.lng],{draggable:true}).addTo(this.mapContainers.map2)
        this.mapContainers.map2.setView(marker.getLatLng(), 5,{
        animate: true
        })

        marker.on('click',()=>{
          this.lat=marker.getLatLng().lat
          this.lng=marker.getLatLng().lng
          this.setMarker()
          this.$emit('setLocation',marker.getLatLng())
          this.showModal=false  
        })
      },100)      
    },
 
    setMarker(){
      this.marker.setLatLng([this.lat,this.lng])
      this.mapContainers.map1.setView(this.marker.getLatLng(), 5,{
        animate: true
      })
    }

  },
  created () {
    if (process.browser){
      this.createMap();
    }
    
  },
};
</script>

<style lang="scss" scoped>
  #map2{
    height: 600px;
  }
  #map{
    height: 200px;
  }
</style>
