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
						<f7-block-title>File saving</f7-block-title>
						<f7-block inner>
							<pr-data-store></pr-data-store>
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
				trackGPS: false
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
				this.position = position
			}
		}
	}
</script>
