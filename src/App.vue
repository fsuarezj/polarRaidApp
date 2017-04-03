<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<pr-left-panel></pr-left-panel>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
				<!-- Navbar -->
				<f7-navbar>
					<f7-nav-right>
						<f7-link icon="icon-bars" open-panel="left"></f7-link>
					</f7-nav-right>
					<f7-nav-center sliding>Polar Raid Tracking</f7-nav-center>
				</f7-navbar>
				<!-- Pages -->
				<f7-pages>
					<f7-page>
						<f7-block-title>Gathering data</f7-block-title>
						<f7-block inner>
							<p>When clicking you will get the info from the sensors</p>
							<f7-grid>
								<f7-col width="50">
									<f7-button @click="trackGPS = !trackGPS">{{ gpsAction }} GPS log</f7-button>
									<pr-gps-tracker :watching="trackGPS" @changedPosition="changePosition"></pr-gps-tracker>
								</f7-col>
								<f7-col width="50">
									<f7-button>Start temp log</f7-button>
								</f7-col>
							</f7-grid>
						</f7-block>
						<f7-block-title>Track status</f7-block-title>
						<f7-block inner>
							<pr-gps-info :position="position"></pr-gps-info>
						</f7-block>
						<f7-block-title>Temperature status</f7-block-title>
						<f7-block inner>
							<p>Here the temperature status</p>
						</f7-block>
						<f7-block-title>Stored points</f7-block-title>
						<f7-block inner>
							<pr-data-store :feature="feature"></pr-data-store>
						</f7-block>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>

	</div>
</template>

<script>
	import LeftPanel from './components/LeftPanel.vue'
	import GPSInfo from './components/GPSInfo.vue'
	import GPSTracker from './components/GPSTracker.vue'
	import DataStore from './components/DataStore.vue'
  import gjt from 'geojson-tools'
  import gju from 'geojson-utils'

	export default {
		components: {
			'pr-left-panel': LeftPanel,
			'pr-gps-info': GPSInfo,
			'pr-gps-tracker': GPSTracker,
			'pr-data-store': DataStore
		},
		data() {
			return {
				position: {
					coords: NaN
				},
				trackGPS: false,
				feature: {
					geometry: {
						coordinates: [0, 0]
					}
				}
			}
		},
		computed: {
			gpsAction() {
				if (this.trackGPS) {
					return "Stop"
				} else {
					return "Start"
				}
			}
		},
		methods: {
			changePosition(position) {
				console.log("Position is:", position)
				this.position = position
			}
		},
		watch: {
			position() {
				let lat = this.position.coords.latitude
				let lon = this.position.coords.longitude
				let timestamp = this.position.timestamp
				let geometry_val = gjt.toGeoJSON([lat, lon], 'Point')
        let aux_feature = {
					type: 'Feature',
					geometry: geometry_val,
					properties: {
						time: timestamp
					}
				}
				if (gju.pointDistance(aux_feature.geometry, this.feature.geometry) > 10) {
					this.feature = aux_feature
					console.log("Saving new point")
				// } else {
				// 	console.log("Not saving new point")
				}
			}
		}
	}
</script>
