import {
	box,
	button,
	checkbox,
	compute,
	dropdown,
	horizontal,
	label,
	vertical,
	window,
} from 'openrct2-flexui'

import {
	getRides,
	isFlatRide,
	startChroma,
	stopChroma,
} from './chroma'
import {
	chromaStore,
	syncRideList,
	updateChromaState,
} from './state'

export const chromaWindow = window({
	title: 'RGB Chroma (v1.0.0)',
	width: { value: 320, min: 320, max: 320 },
	height: { value: 315, min: 315, max: 315 },
	onOpen: syncRideList,
	content: [
		box({
			text: 'Rainbow RGB Chroma FX',
			content: vertical({
				content: [
					checkbox({
						text: 'Enable Real-Time Rainbow RGB Cycle',
						isChecked: compute(chromaStore, (st) => st.enableChroma),
						onChange: (val) => {
							if (val) {
								startChroma()
							} else {
								stopChroma(false)
							}
						},
					}),
					horizontal({
						content: [
							label({ text: 'FX Mode:', width: '30%' }),
							dropdown({
								items: ['Breathing RGB (Snake Wave)', 'Classic Rainbow Spectrum'],
								width: '70%',
								selectedIndex: compute(chromaStore, (st) => st.chromaMode !== undefined ? st.chromaMode : 0),
								onChange: (idx) => updateChromaState({ chromaMode: idx }),
							}),
						],
					}),
					horizontal({
						content: [
							label({ text: 'Target:', width: '30%' }),
							dropdown({
								items: ['Selected Ride Only', 'All Park Rides'],
								width: '70%',
								selectedIndex: compute(chromaStore, (st) => st.chromaTarget),
								onChange: (idx) => {
									updateChromaState({ chromaTarget: idx })
								},
							}),
						],
					}),
					horizontal({
						content: [
							label({ text: 'Ride:', width: '30%' }),
							dropdown({
								items: compute(chromaStore, (st) => {
									const rList = (st.rides && st.rides.length > 0) ? st.rides : getRides()
									return rList.map((r) => r.name)
								}),
								width: '70%',
								selectedIndex: compute(chromaStore, (st) => st.targetRideIndex),
								disabled: compute(chromaStore, (st) => st.chromaTarget === 1),
								onChange: (idx) => {
									updateChromaState({ targetRideIndex: idx })
								},
							}),
						],
					}),
					horizontal({
						content: [
							label({ text: 'Vehicle Style:', width: '35%' }),
							dropdown({
								items: [
									'Per Car (Rainbow Cars)',
									'Per Train (Distinct Trains)',
									'All Same (Synchronized)',
								],
								width: '65%',
								selectedIndex: compute(chromaStore, (st) => st.chromaVehicleMode !== undefined ? st.chromaVehicleMode : 0),
								disabled: compute(chromaStore, (st) => !st.chromaVehicles),
								onChange: (idx) => {
									updateChromaState({ chromaVehicleMode: idx })
									const targetRides = (chromaStore.get().chromaTarget === 0)
										? [getRides()[chromaStore.get().targetRideIndex || 0]]
										: getRides()
									const targetScheme = (idx === 0) ? 2 : ((idx === 1) ? 1 : 0)
									for (let i = 0; i < targetRides.length; i++) {
										const r = targetRides[i]
										if (r && !isFlatRide(r)) {
											context.executeAction('ridesetappearance', {
												ride: r.id,
												type: 6,
												value: targetScheme,
												index: 0,
											}, () => {})
										}
									}
								},
							}),
						],
					}),
					horizontal({
						content: [
							checkbox({
								text: 'Vehicles (Cars & Flat)',
								width: '50%',
								isChecked: chromaStore.get().chromaVehicles,
								onChange: (val) => updateChromaState({ chromaVehicles: val }),
							}),
							checkbox({
								text: 'Tracks (Wave)',
								width: '50%',
								isChecked: chromaStore.get().chromaTrack,
								onChange: (val) => updateChromaState({ chromaTrack: val }),
							}),
						],
					}),
					horizontal({
						content: [
							checkbox({
								text: 'Balloons & Shops',
								width: '50%',
								isChecked: chromaStore.get().chromaBalloons,
								onChange: (val) => updateChromaState({ chromaBalloons: val }),
							}),
							checkbox({
								text: 'Guests & Staff Clothes',
								width: '50%',
								isChecked: chromaStore.get().chromaGuests,
								onChange: (val) => updateChromaState({ chromaGuests: val }),
							}),
						],
					}),
					horizontal({
						content: [
							label({ text: 'Speed:', width: '30%' }),
							dropdown({
								items: ['Slow (Chill Wave)', 'Normal (Classic Chroma)', 'Fast (Hyper Gamer RGB)'],
								width: '70%',
								selectedIndex: compute(chromaStore, (st) => st.chromaSpeed),
								onChange: (idx) => updateChromaState({ chromaSpeed: idx }),
							}),
						],
					}),
					button({
						text: 'Stop RGB & Restore Colors',
						height: '24px',
						onClick: () => {
							stopChroma(true)
						},
					}),
					button({
						text: compute(chromaStore, (st) => {
							return st.enableChroma ? 'Stop RGB (Keep Colors)' : 'Restart RGB'
						}),
						height: '24px',
						onClick: () => {
							const curActive = chromaStore.get().enableChroma
							if (curActive) {
								stopChroma(false)
							} else {
								startChroma()
							}
						},
					}),
				],
			}),
		}),
	],
})
