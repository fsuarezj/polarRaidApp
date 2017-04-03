let configPolarRaidBeta = {
  apiKey: "AIzaSyAFs_c-JhZrYY8RoJtqKcxSIfaZQvJ8VVw",
  authDomain: "polarraid-83d2f.firebaseapp.com",
  databaseURL: "https://polarraid-83d2f.firebaseio.com",
  projectId: "polarraid-83d2f",
  storageBucket: "polarraid-83d2f.appspot.com",
  messagingSenderId: "609239958081"
};

let appPolarRaidBeta = window.FirebasePlugin.initializeApp(configPolarRaidBeta, "PolarRaidBeta");

export const getFirebaseRef = function(ref, app = appPolarRaidBeta) {
  let firebaseDB = app.database();
  return firebaseDB.ref(ref);
}
