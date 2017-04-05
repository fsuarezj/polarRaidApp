<template lang="html">
</template>

<script type="text/babel">

export default {
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
      device: {
        ids: ["EC:74:2E:A6:FA:57", "FF:2C:6B:6D:20:B4"],
        service: "ffb0",
        measurement: "ffb3"
      },
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
      if (this.device.ids.indexOf(peripheral.id) >= 0) {
        ble.connect(peripheral.id, this.onConnect, this.onDisconnect)
      } else {
        console.log("Found another sensor:", peripheral.id)
      }
    },
    scanFailure(error) {
      console.error("Scan failed:", error)
    },
    onConnect(peripheral) {
      if (this.device.ids.indexOf(peripheral.id) === 0) {
        console.log("Connected to Sensor 1")
        ble.read(peripheral.id, this.device.service, this.device.measurement, this.onData1, this.onError1)
        ble.startNotification(peripheral.id, this.device.service, this.device.measurement, this.onData1, this.onError1)
      } else if (this.device.ids.indexOf(peripheral.id) === 1) {
        console.log("Connected to Sensor 2")
        ble.read(peripheral.id, this.device.service, this.device.measurement, this.onData2, this.onError2)
        ble.startNotification(peripheral.id, this.device.service, this.device.measurement, this.onData2, this.onError2)
      } else {
        console.error("Error: Trying to connect to a non-registered device")
      }
    },
    onDisconnect(reason) {
      console.error("BLE Disconnected", reason)
    },
    onData1(buffer) {
      console.log("Data for Sensor 1 found")
      let data = new Int8Array(buffer)
      console.log("Data =", data)
      this.$emit('changedTemp', {
        sensor: "Sensor 1",
        temp: data[0]
      })
    },
    onData2(buffer) {
      console.log("Data for Sensor 2 found")
      let data = new Int8Array(buffer)
      console.log("Data =", data)
      this.$emit('changedTemp', {
        sensor: "Sensor 2",
        temp: data[0]
      })
    },
    onError1(error) {
      console.error("There was an error reading from Sensor 1:", error)
    },
    onError2(error) {
      console.error("There was an error reading from Sensor 2:", error)
    },
    unwatchPosition() {
      navigator.geolocation.clearWatch(this.watchID)
    }
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
