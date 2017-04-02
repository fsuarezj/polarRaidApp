<template lang="html">
  <div class="">
    <p>Here the data store messages</p>
    <button type="button" name="button" @click="createData">Botón</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: NaN,
      databaseName: 'pointsGPS',
      databaseVersion: 1,
      openRequest: NaN
    }
  },
  methods: {
    errorFunc(evt) {
      console.log('Error when connecting with the indexedDB. Code: ' + this.openRequest)
      alert('Error when connecting with the indexedDB. Code: ' + evt.target.error.code, evt.target.error.name)
    },
    storeData(evt) {
      this.db = this.openRequest.result
      console.log("Connected with the indexedDB")
    },
    createData() {
      let featuresStore = this.db.transaction(['features'], 'readwrite').objectStore('features')
      let feature = {
        "type": "Feature",
        "properties": {
            "name": "Rovaniemi",
            "time": "2017-02-23T02:52:11Z",
            "temp": 1
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                25.713897943496704,
                66.50043818576843
            ]
        }
      }
      let request = featuresStore.add(feature, 1)
      request.onerror = function(e) {
        alert('Error when creating data. Name:', e.target.error.name)
      }
      request.onSuccess = function(e) {
        console.log("DONE!!!")
      }
    }
  },
  mounted() {
    this.openRequest = window.indexedDB.open(this.databaseName, this.databaseVersion)
    this.openRequest.onerror = this.errorFunc
    this.openRequest.onsuccess = this.storeData
    this.openRequest.onupgradeneeded = function(event) {
      let aux_db = event.target.result
      aux_db.onerror = function() {
        console.log("Error when updating db. Code:", aux_db.errorcode)
      }

      console.log("Upgraded")
      if(!aux_db.objectStoreNames.contains('features')) {
        let store = aux_db.createObjectStore('features') //, {keyPath: 'featureId', autoIncrement: true})
        console.log("Added features object store")
      }
      // store.transaction.oncomplete = function(event) {
      //   let featuresStore = db.transaction(['features'], 'readwrite').objectStore('features')
      //   features.forEach(function(feature) {
      //     featureStore.add(feature)
      //   })
      // }
    }
  }
}
</script>

<style lang="css">
</style>
