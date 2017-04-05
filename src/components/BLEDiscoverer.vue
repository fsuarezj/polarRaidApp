<template lang="html">
  <pr-temp-tracker v-for="deviceId in discoveredDevices" :deviceId="deviceId"></pr-temp-tracker>
</template>

<script type="text/babel">
import TempTracker from './components/TempTracker.vue'

export default {
	components: {
		'pr-temp-tracker': TempTracker
	},
  props: {
    watching: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      watchTempOptions: {
        "request": true,
        "statusReceiver": false,
        "restoreKey" : "PolarRaidTracking"
      },
			sensorIds: {
       	"EC:74:2E:A6:FA:57": "Sensor 1",
				"FF:2C:6B:6D:20:B4": "Sensor 2"
			},
      discoveredDevices: [],
      devices: [
        "EC:74:2E:A6:FA:57",
        "FF:2C:6B:6D:20:B4"
      ],
      watchID: NaN
    }
  },
  methods: {
    watchTemp() {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    onDeviceReady() {
      console.log("Device Ready")
      ble.scan([], 15, this.onScan, this.scanFailure)
    },
    onScan(peripheral) {
      console.log("Scanned")
      if (peripheral.id in this.devices) {
        this.discoveredDevices.push(peripheral.id)
      }
    },
    scanFailure(error) {
      console.error("Scan failed:", error)
    },
  },
  watch: {
    watching() {
      if (this.watching) {
        this.watchTemp()
      } else {
        this.unwatchPosition()
      }
    }
  }
}
</script>

<style lang="css">
</style>
