<template lang="html">
  <div class="">
    <p>Here the data store messages</p>
    <button type="button" name="button" @click="createData">Create indexedDB</button>
    <button type="button" name="button" @click="readAllData">Save indexedDB</button>
    <!-- <button type="button" name="button" @click="saveRemoteData">Save Firebase</button> -->
  </div>
</template>

<script>
// import { getFirebaseRef } from './mixins/FirebaseDB'

export default {
  data() {
    return {
      db: NaN,
      databaseName: 'pointsGPS',
      databaseVersion: 2,
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
                65.50043818576843
            ]
        }
      }
      let request = featuresStore.add(feature)
      request.onerror = function(e) {
        console.error('Error when creating data.', e.target.error)
      }
      request.onsuccess = function(e) {
        console.log("Data written")
      }
    },
    readAllData() {
      let transaction = this.db.transaction(['features', 'sentFeatures'], 'readwrite')
      let featuresStore = transaction.objectStore('features')
      let sentFeaturesStore = transaction.objectStore('sentFeatures')
      let request = featuresStore.getAllKeys()
      request.onerror = function(evt) {
        console.error('Error getting data.', evt.target.error)
      }
      request.onsuccess = function(evt) {
        let keys = evt.target.result
        for (let k of keys) {
          let request2 = featuresStore.get(k)
          request2.onerror = function(e) {
            console.error('Error getting data for key = '+k+'.', e.target.error)
          }
          request2.onsuccess = function(e) {
            let aux_feat = e.target.result
            let request3 = sentFeaturesStore.add(aux_feat, k)
            request3.onerror = function(e1) {
              console.error('Error when adding data to sent Features.', e.target.error)
            }
            request3.onsuccess = function(e1) {
              let request4 = featuresStore.delete(k)
              request4.onerror = function(e2) {
                console.error('Error when deleting data from Features.', e.target.error)
              }
              request4.onsuccess = function(e2) {
                console.log("Data deleted from features")
              }
            }
          }
        }
      }
    },
    // saveRemoteData() {
    //   getFirebaseRef('testFeatures').set(this.feature)
    // }
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
        let store = aux_db.createObjectStore('features', {autoIncrement: true})
        console.log("Added features object store")
      }
      if(!aux_db.objectStoreNames.contains('sentFeatures')) {
        let store = aux_db.createObjectStore('sentFeatures')
        console.log("Added sent features object store")
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
