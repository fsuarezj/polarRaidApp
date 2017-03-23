<template lang="html">
  <f7-block>
	<p>Here the track status</p>
	<f7-grid>
		<f7-col width="50">
			<f7-button @click="getPosition">Get GPS info</f7-button>
		</f7-col>
		<f7-col width="50">
			<f7-button @click="watchPosition">Watch GPS info</f7-button>
		</f7-col>
  </f7-grid>
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
  data() {
    return {
      getGPSOptions: {
        enableHighAccuracy: true,
        maximumAge: 3600000
      },
      watchGPSOptions: {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
      },
      positionGPS: {
        coords: NaN
      }
    }
  },
  computed: {
    position() {
      console.log('this.positionGPS desde position es ', this.positionGPS)
      return this.positionGPS
    }
  },
  methods: {
    getPosition() {
      let watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, this.getGPSOptions);
      let elem = this

      function onSuccess(position) {
        elem.positionGPS = position
      }

      function onError(error) {
        alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
      }
    },
    watchPosition() {
      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, this.watchGPSOptions);
      let elem = this

      function onSuccess(position) {
        elem.positionGPS = position
      }

      function onError(error) {
        alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
      }
    }
  }
}
</script>

<style lang="css">
</style>
