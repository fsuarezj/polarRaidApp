<template lang="html">
  <f7-block>
  <p>
      <br>Latitude: {{ position.coords.latitude }}
      <br>Longitude: {{ position.coords.longitude }}
      <br>Altitude: {{ position.coords.altitude }}
      <br>Accuracy: {{ position.coords.accuracy }}
      <br>Altitude Accuracy: {{ position.coords.altitudeAccuracy }}
      <br>Heading: {{ position.coords.heading }}
      <br>Speed: {{ position.coords.speed }}
      <br>Timestamp: {{ position.timestamp }}
  </p>
  </f7-block>
</template>

<script type="text/babel">

export default {
  props: {
    position: {
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
