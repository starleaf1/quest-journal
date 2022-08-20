<template>
  <l-map ref="primaryMap" style="height: 100%; z-index: 0;" :zoom="11" :center="center">
    <l-tile-layer :url="tileUrl" />
  </l-map>
</template>

<script>
export default {
  name: 'MapLayer',
  data () {
    return ({
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [-8.4537137,114.5110415]
    })
  },
  mounted () {
    this.$nextTick().then(() => {
      this.$refs.primaryMap.mapObject.invalidateSize()
    })
  }
}
</script>
