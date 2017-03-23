cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
        "id": "cordova-plugin-bluetoothle.BluetoothLe",
        "pluginId": "cordova-plugin-bluetoothle",
        "clobbers": [
            "window.bluetoothle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-geolocation": "2.4.2",
    "cordova-plugin-bluetoothle": "4.3.1"
}
// BOTTOM OF METADATA
});