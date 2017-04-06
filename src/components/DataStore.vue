<template lang="html">
  <div class="">
    <p v-for="point in savedPoints">Saved point at {{ point[0] }}, {{ point[1] }}</p>
  </div>
</template>

<script>
// import { getFirebaseRef } from './mixins/FirebaseDB'

export default {
  props: {
    feature: {
      type: Object
    }
  },
  data() {
    return {
      db: NaN,
      databaseName: 'pointsGPS',
      databaseVersion: 3,
      openRequest: NaN,
      firebaseConfig: {
        apiKey: "AIzaSyAFs_c-JhZrYY8RoJtqKcxSIfaZQvJ8VVw",
        authDomain: "polarraid-83d2f.firebaseapp.com",
        databaseURL: "https://polarraid-83d2f.firebaseio.com",
        projectId: "polarraid-83d2f",
        storageBucket: "polarraid-83d2f.appspot.com",
        messagingSenderId: "609239958081"
      },
      firebaseApp: NaN,
      savedPoints: []
    }
  },
  computed: {
    firebaseDB() {
      if (!this.firebaseApp) {
        this.firebaseApp = window.firebase.initializeApp(this.firebaseConfig)
        window.firebase.auth().signInWithEmailAndPassword('soyburwa@gmail.com','BurwaPerrete17')
        .catch(function(error) {
          console.log("Authetication error:", error.message, error.code)
        })
      }
      return this.firebaseApp.database()
    }
  },
  watch: {
    feature() {
      if(this.feature) {
        this.createData()
      }
    }
  },
  methods: {
    errorFunc(evt) {
      console.log('Error when connecting with the indexedDB. Code: ' + this.openRequest)
      alert('Error when connecting with the indexedDB. Code: ' + evt.target.error.code, evt.target.error.name)
    },
    dbConnection(evt) {
      this.db = this.openRequest.result
      console.log("Connected with the indexedDB")
    },
    createData() {
      // let feature = { hey: 'hou'}
      let featuresStore = this.db.transaction(['features'], 'readwrite').objectStore('features')
      let request = featuresStore.add(this.feature, this.feature.properties.time)
      let elem = this
      request.onerror = function(e) {
        console.error('Error when creating data.', e.target.error)
      }
      request.onsuccess = function(e) {
        console.log("Data written to indexedDB:")
        elem.saveData2Firebase()
      }
    },
    saveData2Firebase() {
      let transaction = this.db.transaction(['features'], 'readonly')
      let featuresStore = transaction.objectStore('features')
      let request = featuresStore.getAllKeys()
      let elem = this
      request.onerror = function(evt) {
        console.error('Error getting data.', evt.target.error)
      }
      request.onsuccess = function(evt) {
        let keys = evt.target.result
        for (let k of keys) {
          let request = featuresStore.get(k)
          request.onerror = function(e) {
            console.error('Error getting data for key = '+k+'.', e.target.error)
          }
          request.onsuccess = function(e) {
            let aux_feat = e.target.result
            elem.firebaseDB.ref('/pointsTrack/features/' + k).set(aux_feat)
            // elem.firebaseDB.ref('/pointsTrack/features/' + k).set(aux_feat)
            .then(function() {
              console.log("Hecho")
              let transactionRw = elem.db.transaction(['features', 'sentFeatures'], 'readwrite')
              let featuresStoreRw = transactionRw.objectStore('features')
              let sentFeaturesStore = transactionRw.objectStore('sentFeatures')
              let request = sentFeaturesStore.add(aux_feat, k)
              request.onerror = function(e1) {
                console.error('error when adding data to sent features.', e1.target.error)
              }
              request.onsuccess = function(e1) {
                elem.savedPoints.push(aux_feat.geometry.coordinates)
                let request = featuresStoreRw.delete(k)
                request.onerror = function(e2) {
                  console.error('error when deleting data from features.', e2.target.error)
                }
                request.onsuccess = function(e2) {
                  console.log("data deleted from features")
                }
              }
            })
            .catch(function(error) {
              console.error('Error when saving to firebase.', error.name + ":", error.message)
            })
          }
        }
      }
    },
    // Not used
    saveRemoteData(feature) {
      this.firebaseDB.ref('/pointsTrack/features').set([feature])
      .then(function(snapshot) {
        console.log('Salvado!!!')
      })
    },
    // Not used
    updateRemoteData(feature) {
      let newFeatureKey = this.firebaseDB.ref('/pointsTrack/features').push().key
      this.firebaseDB.ref('/pointsTrack/features').push(feature)
      .then(function(snapshot) {
        console.log("Yujuuuu")
      })
    }
  },
  mounted() {
    this.openRequest = window.indexedDB.open(this.databaseName, this.databaseVersion)
    this.openRequest.onerror = this.errorFunc
    this.openRequest.onsuccess = this.dbConnection
    this.openRequest.onupgradeneeded = function(event) {
      let aux_db = event.target.result
      aux_db.onerror = function() {
        console.log("Error when updating db. Code:", aux_db.errorcode)
      }

      console.log("Upgraded")
      if(!aux_db.objectStoreNames.contains('features')) {
        let store = aux_db.createObjectStore('features') //, {autoIncrement: true})
        console.log("Added features object store")
      }
      if(!aux_db.objectStoreNames.contains('sentFeatures')) {
        let store = aux_db.createObjectStore('sentFeatures')
        console.log("Added sent features object store")
      }
    }
  }
}
</script>

<style lang="css">
</style>
