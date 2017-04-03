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
      watchID: NaN
    }
  },
  methods: {
    watchTemp() {
      ble.scan([], 5,
        function(device) {
          console.log(JSON.stringify(device));
          console.log("Id:", device.id)
          if (device.name = "WGX_iBeacon") {
            let devId = device.id
            ble.connect(devId,
              function(result) {
                console.log("Success connecting:", result)
                for (let charac of result.characteristics) {
                  if (charac.properties.indexOf("Read") >= 0) {
                    console.log("Can read", charac)
                    let servId = charac.service
                    let characId = charac.characteristic
                    ble.read(devId, servId, characId,
                      function(result) {
                        console.log("Resultado de", characId, "es", result)
                      },
                      function(error) {
                        console.log("Error leyendo de", characId, "es", error)
                      }
                    )
                  }
                }
              },
              function(error) {
                console.log("Error connecting:", error)
              }
            )
          }
        }, function(error) {
          console.log("Error:", error)
        }
      )
      let deviceId = "EC:74:2E:A6:FA:57"
      ble.connect(deviceId,
        function(result) {
          console.log("Success:", result)
        },
        function(error) {
          console.log("Error:", error)
        }
      )
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
