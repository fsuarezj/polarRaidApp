cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
        "id": "cordova-plugin-bluetoothle.BluetoothLe",
        "pluginId": "cordova-plugin-bluetoothle",
        "clobbers": [
            "window.bluetoothle"
        ]
    },
    {
        "file": "plugins/com.firebase.sdk/www/firebase/firebase.js",
        "id": "com.firebase.sdk.firebase",
        "pluginId": "com.firebase.sdk",
        "clobbers": [
            "firebase"
        ]
    },
    {
        "file": "plugins/cordova-plugin-firebase/www/firebase-browser.js",
        "id": "cordova-plugin-firebase.FirebasePlugin",
        "pluginId": "cordova-plugin-firebase",
        "clobbers": [
            "FirebasePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-geolocation": "2.4.2",
    "cordova-plugin-bluetoothle": "4.3.1",
    "com.firebase.sdk": "3.0.4.2",
    "cordova-plugin-firebase": "0.1.19"
}
// BOTTOM OF METADATA
});