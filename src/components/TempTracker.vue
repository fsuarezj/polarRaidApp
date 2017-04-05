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
      //   function(device) {
      //     console.log(JSON.stringify(device));
      //     console.log("Id:", device.id)
      //     if (device.name = "WGX_iBeacon") {
      //       let devId = device.id
      //       ble.connect(devId,
      //         function(result) {
      //           console.log("Success connecting:", result)
      //           for (let charac of result.characteristics) {
      //             if (charac.properties.indexOf("Read") >= 0) {
      //               console.log("Can read", charac)
      //               let servId = charac.service
      //               let characId = charac.characteristic
      //               ble.read(devId, servId, characId,
      //                 function(result) {
      //                   console.log("Resultado de", characId, "es", result)
      //                 },
      //                 function(error) {
      //                   console.log("Error leyendo de", characId, "es", error)
      //                 }
      //               )
      //             }
      //           }
      //           ble.read("ffb0", )
      //         },
      //         function(error) {
      //           console.log("Error connecting:", error)
      //         }
      //       )
      //     }
      //   }, function(error) {
      //     console.log("Error:", error)
      //   }
      // )
      // let deviceId = "EC:74:2E:A6:FA:57"
      // ble.connect(deviceId,
      //   function(result) {
      //     console.log("Success:", result)
      //   },
      //   function(error) {
      //     console.log("Error:", error)
      //   }
      // )
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
      console.log("Connected")
      ble.read(peripheral.id, this.device.service, this.device.measurement, this.onData, this.onError)
      ble.startNotification(peripheral.id, this.device.service, this.device.measurement, this.onData, this.onError)
    },
    onDisconnect(reason) {
      console.error("BLE Disconnected", reason)
    },
    onData(buffer) {
      console.log("Data found")
      let data = new Uint8Array(buffer)
      console.log("Data =", data[0])
      this.$emit('changedTemp', data[0])
    },
    onError(error) {
      console.error("There was an error:", error)
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
