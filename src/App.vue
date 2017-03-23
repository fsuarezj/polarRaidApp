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
									<f7-button>Get GPS info</f7-button>
								</f7-col>
								<f7-col width="50">
									<f7-button>Get temperature</f7-button>
								</f7-col>
							</f7-grid>
						</f7-block>
						<f7-block-title>Track status</f7-block-title>
						<f7-block inner>
							<pr-track-info></pr-track-info>
						</f7-block>
						<f7-block-title>Temperature status</f7-block-title>
						<f7-block inner>
							<p>Here the temperature status</p>
						</f7-block>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>

	</div>
</template>

<script>
	import LeftPanel from './components/LeftPanel.vue'
	import TrackInfo from './components/TrackInfo.vue'

	export default {
		components: {
			'pr-left-panel': LeftPanel,
			'pr-track-info': TrackInfo
		}
	}
</script>
