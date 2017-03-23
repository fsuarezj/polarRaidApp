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
      watchGPSOptions: {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
      },
      watchID: NaN
    }
  },
  methods: {
    watchPosition() {
      this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, this.watchGPSOptions);
      let elem = this

      function onSuccess(position) {
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
        this.watchPosition()
      } else {
        this.unwatchPosition()
      }
    }
  }
}
</script>

<style lang="css">
</style>
