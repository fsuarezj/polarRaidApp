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
        "restoreKey" : "bluetoothleplugin"
      },
      watchID: NaN
    }
  },
  methods: {
    watchTemp() {
      bluetoothle.initialize(onInitializeSuccess, onInitializeError, this.watchTempOptions)
      let elem = this

      function onInitializeSuccess(position) {
        elem.$emit('changedPosition', position)
      }

      function onError(error) {
        alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
      }
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
