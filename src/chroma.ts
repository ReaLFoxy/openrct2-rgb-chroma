import { BREATHING_PALETTE, RAINBOW_PALETTE } from './palette'
import { chromaStore, updateChromaState } from './state'

export interface RideSnapshot {
	colourSchemes: RideColourScheme[]
	vehicleColours: VehicleColour[]
	vehicleColourSettings?: number
}

export interface StallSnapshot {
	colourSchemes: RideColourScheme[]
}

export interface StaffSnapshot {
	id: number
	colour: number
}

export interface ParkSnapshot {
	rides: Record<number, RideSnapshot>
	stalls: Record<number, StallSnapshot>
	staff: StaffSnapshot[]
}

export let savedSnapshot: ParkSnapshot | null = null
export let chromaSubscription: IDisposable | null = null

export function getRides(): Ride[] {
	if (typeof map === 'undefined') return []
	return map.rides.filter((r) => r.classification === 'ride')
}

export function getStalls(): Ride[] {
	if (typeof map === 'undefined') return []
	return map.rides.filter((r) => r.classification === 'stall' || r.classification === 'facility')
}

export function isFlatRide(ride: Ride): boolean {
	const t = ride.type
	return (
		t === 19 || // Spiral Slide
		t === 22 || // Dodgems
		t === 23 || // Swinging Ship
		t === 24 || // Swinging Inverted Ship
		t === 26 || // Ferris Wheel
		t === 27 || // Motion Simulator
		t === 28 || // 3D Cinema
		t === 29 || // Top Spin
		t === 30 || // Space Rings
		t === 34 || // Merry-Go-Round
		t === 41 || // Twist
		t === 42 || // Haunted House
		t === 59 || // Enterprise
		t === 67 || // Mini Golf
		t === 69 || // Crooked House
		t === 71 || // Circus
		t === 78    // Magic Carpet
	)
}

export function captureParkSnapshot(): ParkSnapshot {
	const snap: ParkSnapshot = { rides: {}, stalls: {}, staff: [] }
	if (typeof map === 'undefined') return snap

	const rides = getRides()
	for (let i = 0; i < rides.length; i++) {
		const r = rides[i]
		if (!r) continue
		snap.rides[r.id] = {
			colourSchemes: (r.colourSchemes || []).map((cs) => ({
				main: cs.main,
				additional: cs.additional,
				supports: cs.supports,
			})),
			vehicleColours: (r.vehicleColours || []).map((vc) => ({
				body: vc.body,
				trim: vc.trim,
				tertiary: vc.tertiary,
			})),
			vehicleColourSettings: (r as unknown as { vehicleColourSettings?: number }).vehicleColourSettings,
		}
	}

	const stalls = getStalls()
	for (let j = 0; j < stalls.length; j++) {
		const s = stalls[j]
		if (!s) continue
		snap.stalls[s.id] = {
			colourSchemes: (s.colourSchemes || []).map((cs) => ({
				main: cs.main,
				additional: cs.additional,
				supports: cs.supports,
			})),
		}
	}

	if (typeof map.getAllEntitiesOnTile !== 'undefined') {
		const allStaff = map.getAllEntities('staff') as Staff[]
		for (let k = 0; k < allStaff.length; k++) {
			const member = allStaff[k]
			if (member && member.colour !== undefined) {
				snap.staff.push({ id: member.id, colour: member.colour })
			}
		}
	}
	return snap
}

export function restoreParkSnapshot(snap: ParkSnapshot | null) {
	if (!snap || typeof map === 'undefined') return

	const rides = getRides()
	for (let i = 0; i < rides.length; i++) {
		const r = rides[i]
		if (!r || !snap.rides[r.id]) continue
		const rSnap = snap.rides[r.id]

		if (rSnap.colourSchemes) {
			for (let c = 0; c < rSnap.colourSchemes.length; c++) {
				const cs = rSnap.colourSchemes[c]
				context.executeAction('ridesetappearance', { ride: r.id, type: 0, value: cs.main, index: c }, () => {})
				context.executeAction('ridesetappearance', { ride: r.id, type: 1, value: cs.additional, index: c }, () => {})
				context.executeAction('ridesetappearance', { ride: r.id, type: 2, value: cs.supports, index: c }, () => {})
			}
		}

		if (rSnap.vehicleColours) {
			for (let v = 0; v < rSnap.vehicleColours.length; v++) {
				const vc = rSnap.vehicleColours[v]
				context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: vc.body, index: v }, () => {})
				context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: vc.trim, index: v }, () => {})
				context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: vc.tertiary, index: v }, () => {})
			}
		}

		if (rSnap.vehicleColourSettings !== undefined) {
			context.executeAction('ridesetappearance', { ride: r.id, type: 6, value: rSnap.vehicleColourSettings, index: 0 }, () => {})
		}
	}

	const stalls = getStalls()
	for (let j = 0; j < stalls.length; j++) {
		const s = stalls[j]
		if (!s || !snap.stalls[s.id]) continue
		const sSnap = snap.stalls[s.id]
		if (sSnap.colourSchemes && sSnap.colourSchemes.length > 0) {
			const cs = sSnap.colourSchemes[0]
			context.executeAction('ridesetappearance', { ride: s.id, type: 0, value: cs.main, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: s.id, type: 1, value: cs.additional, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: s.id, type: 2, value: cs.supports, index: 0 }, () => {})
		}
	}

	for (let k = 0; k < snap.staff.length; k++) {
		const stMember = snap.staff[k]
		const ent = map.getEntity(stMember.id) as Staff | null
		if (ent && ent.type === 'staff') {
			ent.colour = stMember.colour
		}
	}
}

export function isStationPlatformTile(x: number, y: number, rideId: number): boolean {
	const t = map.getTile(x, y)
	if (!t || !t.elements) return false
	for (let i = 0; i < t.elements.length; i++) {
		const el = t.elements[i]
		if (el.type === 'track') {
			const trk = el as TrackElement
			if (trk.ride === rideId && trk.isStation) {
				return true
			}
		}
	}
	return false
}

export function findTrainCars(headCar: Car): Car[] {
	const cars: Car[] = [headCar]
	let cur = headCar
	let guard = 0
	while (cur && cur.nextCarOnTrain !== null && cur.nextCarOnTrain !== 65535 && guard++ < 40) {
		const nxt = map.getEntity(cur.nextCarOnTrain) as Car | null
		if (nxt && nxt.type === 'car') {
			cars.push(nxt)
			cur = nxt
		} else {
			break
		}
	}
	return cars
}

let chromaTickCounter = 0
let chromaStep = 0
let lastSyncVehicleMode = -1

export function onChromaTick() {
	const st = chromaStore.get()
	if (!st.enableChroma) {
		if (chromaSubscription) {
			chromaSubscription.dispose()
			chromaSubscription = null
		}
		return
	}

	chromaTickCounter++
	const divisor = st.chromaSpeed === 0 ? 8 : (st.chromaSpeed === 1 ? 4 : 2)
	if (chromaTickCounter % divisor !== 0) return

	const isBreathing = (st.chromaMode === 0)
	const activePalette = isBreathing ? BREATHING_PALETTE : RAINBOW_PALETTE
	const stepCount = activePalette.length
	chromaStep = (chromaStep + 1) % stepCount

	const allRides = getRides()
	const selRide = (st.targetRideIndex < allRides.length) ? allRides[st.targetRideIndex] : null

	// 1. Guests, Accessories & Staff Uniforms
	if (st.chromaGuests) {
		const gStepTshirt = chromaStep
		const gStepHat = (chromaStep + (isBreathing ? 1 : 3)) % stepCount
		const cTshirt = activePalette[gStepTshirt]
		const cHat = activePalette[gStepHat]

		const allGuests = map.getAllEntities('guest') as Guest[]
		for (let gIdx = 0; gIdx < allGuests.length; gIdx++) {
			const guest = allGuests[gIdx]
			if (!guest) continue
			guest.tshirtColour = cTshirt
			guest.hatColour = cHat
			if (guest.balloonColour !== undefined) {
				guest.balloonColour = activePalette[(chromaStep + (isBreathing ? 2 : 2)) % stepCount]
			}
			if (guest.umbrellaColour !== undefined) {
				guest.umbrellaColour = activePalette[(chromaStep + (isBreathing ? 0 : 6)) % stepCount]
			}
		}

		const sHandyman = cTshirt
		const sMechanic = activePalette[(chromaStep + (isBreathing ? 2 : 5)) % stepCount]
		const sSecurity = activePalette[(chromaStep + (isBreathing ? 4 : 7)) % stepCount]

		const allStaff = map.getAllEntities('staff') as Staff[]
		for (let sIdx = 0; sIdx < allStaff.length; sIdx++) {
			const staff = allStaff[sIdx]
			if (!staff) continue
			if (staff.staffType === 'handyman') {
				staff.colour = sHandyman
			} else if (staff.staffType === 'mechanic') {
				staff.colour = sMechanic
			} else if (staff.staffType === 'security') {
				staff.colour = sSecurity
			}
		}
	}

	// 2. Vehicles: Coasters, Tracked Rides & Flat Rides
	if (st.chromaVehicles) {
		const trackRides = allRides.filter((r) => !isFlatRide(r))
		const flatRides = allRides.filter((r) => isFlatRide(r))

		const targetTrackRides = (st.chromaTarget === 0) ? (selRide && !isFlatRide(selRide) ? [selRide] : []) : trackRides
		for (let trIdx = 0; trIdx < targetTrackRides.length; trIdx++) {
			const vRide = targetTrackRides[trIdx]
			if (!vRide || !vRide.vehicles || vRide.vehicles.length === 0) continue

			const expectedScheme = (st.chromaVehicleMode === 0) ? 2 : ((st.chromaVehicleMode === 1) ? 1 : 0)
			if (lastSyncVehicleMode !== st.chromaVehicleMode) {
				context.executeAction('ridesetappearance', {
					ride: vRide.id,
					type: 6,
					value: expectedScheme,
					index: 0,
				}, () => {})
			}

			for (let tIdx = 0; tIdx < vRide.vehicles.length; tIdx++) {
				const headCarId = vRide.vehicles[tIdx]
				if (headCarId === null || headCarId === 65535) continue

				const headCar = map.getEntity(headCarId) as Car | null
				if (!headCar || headCar.type !== 'car') continue

				const trainCars = findTrainCars(headCar)
				const trainCount = vRide.vehicles.length
				const trainOffset = (st.chromaVehicleMode === 1) ? Math.floor(tIdx * (stepCount / Math.max(1, trainCount))) : 0

				for (let cIdx = 0; cIdx < trainCars.length; cIdx++) {
					const car = trainCars[cIdx]
					if (!car) continue

					let carStep = 0
					if (st.chromaVehicleMode === 0) {
						// Per Car (Rainbow Cars)
						carStep = (chromaStep - cIdx + stepCount * 10) % stepCount
					} else if (st.chromaVehicleMode === 1) {
						// Per Train (Distinct Trains)
						carStep = (chromaStep + trainOffset) % stepCount
					} else {
						// All Same
						carStep = chromaStep
					}

					const cBody = activePalette[carStep]
					const cTrim = isBreathing ? activePalette[(carStep + 1) % stepCount] : activePalette[(carStep + 2) % stepCount]
					const cTert = isBreathing ? activePalette[(carStep + stepCount - 1) % stepCount] : activePalette[(carStep + 4) % stepCount]

					if (car.status === 'traveling_cable_lift' || car.status === 'travelling_boat_channel') {
						car.colours = { body: cBody, trim: cTrim, tertiary: cTert }
					} else {
						const carTileX = Math.floor(car.x / 32)
						const carTileY = Math.floor(car.y / 32)
						if (isStationPlatformTile(carTileX, carTileY, vRide.id)) {
							context.executeAction('ridesetappearance', {
								ride: vRide.id,
								type: 3,
								value: cBody,
								index: (st.chromaVehicleMode === 0) ? (cIdx % 32) : ((st.chromaVehicleMode === 1) ? (tIdx % 32) : 0),
							}, () => {})
						} else {
							car.colours = { body: cBody, trim: cTrim, tertiary: cTert }
						}
					}
				}
			}
		}

		lastSyncVehicleMode = st.chromaVehicleMode

		const targetFlatRides = (st.chromaTarget === 0) ? (selRide && isFlatRide(selRide) ? [selRide] : []) : flatRides
		for (let frIdx = 0; frIdx < targetFlatRides.length; frIdx++) {
			const fRide = targetFlatRides[frIdx]
			if (!fRide) continue

			const fPhase = (st.chromaTarget === 0) ? 0 : (frIdx * 3) % stepCount
			const fStep = (chromaStep + fPhase) % stepCount
			const fBody = activePalette[fStep]
			const fTrim = isBreathing ? activePalette[(fStep + 1) % stepCount] : activePalette[(fStep + 2) % stepCount]
			const fTert = isBreathing ? activePalette[(fStep + stepCount - 1) % stepCount] : activePalette[(fStep + 4) % stepCount]

			// Type 3: Vehicle body / structure
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 3, value: fBody, index: 0 }, () => {})
			// Type 4: Vehicle trim / rotating gondolas
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 4, value: fTrim, index: 0 }, () => {})
			// Type 5: Tertiary
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 5, value: fTert, index: 0 }, () => {})
		}
	}

	// 3. Tracks & Ride Structures
	if (st.chromaTrack && allRides.length > 0) {
		const ridesToProcess = (st.chromaTarget === 0) ? (selRide ? [selRide] : []) : allRides

		for (let rIdx = 0; rIdx < ridesToProcess.length; rIdx++) {
			const ride = ridesToProcess[rIdx]
			if (!ride) continue

			const rBasePhase = (st.chromaTarget === 0) ? 0 : (isBreathing ? (rIdx % 4) : (rIdx % stepCount))
			const rideBaseStep = (chromaStep + rBasePhase) % stepCount

			for (let sIdx = 0; sIdx < 4; sIdx++) {
				const sStep = (rideBaseStep + sIdx) % stepCount
				let sSpine: number
				let sRails: number
				let sSupports: number

				if (isBreathing) {
					sSpine = activePalette[sStep]
					sRails = activePalette[(sStep + 1) % stepCount]
					sSupports = activePalette[(sStep + stepCount - 1) % stepCount]
				} else {
					sSpine = activePalette[sStep]
					sRails = activePalette[(sStep + 2) % stepCount]
					sSupports = activePalette[(sStep + 4) % stepCount]
				}

				context.executeAction('ridesetappearance', { ride: ride.id, type: 0, value: sSpine, index: sIdx }, () => {})
				context.executeAction('ridesetappearance', { ride: ride.id, type: 1, value: sRails, index: sIdx }, () => {})
				context.executeAction('ridesetappearance', { ride: ride.id, type: 2, value: sSupports, index: sIdx }, () => {})
			}
		}
	}

	// 4. Stalls & Shops
	if (st.chromaBalloons) {
		const stalls = getStalls()
		for (let stIdx = 0; stIdx < stalls.length; stIdx++) {
			const stall = stalls[stIdx]
			if (!stall) continue

			const sObj = stall.object as unknown as { shopItem?: number; shopItemSecondary?: number } | null
			const sItem = sObj ? sObj.shopItem : -1
			const sItem2 = sObj ? sObj.shopItemSecondary : -1

			let itemPhase = 0
			if (sItem === 0 || sItem2 === 0) {
				itemPhase = 2
			} else if (sItem === 4 || sItem2 === 4) {
				itemPhase = isBreathing ? 0 : 6
			} else if (sItem === 18 || sItem2 === 18) {
				itemPhase = isBreathing ? 1 : 4
			} else if (sItem === 20 || sItem2 === 20) {
				itemPhase = 0
			} else {
				itemPhase = (stIdx * 3) % stepCount
			}

			const stallStep = (chromaStep + itemPhase) % stepCount
			const stallMain = activePalette[stallStep]
			const stallAdd = isBreathing ? activePalette[(stallStep + 1) % stepCount] : activePalette[(stallStep + 2) % stepCount]
			const stallSup = isBreathing ? activePalette[(stallStep + stepCount - 1) % stepCount] : activePalette[(stallStep + 4) % stepCount]

			context.executeAction('ridesetappearance', { ride: stall.id, type: 0, value: stallMain, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: stall.id, type: 1, value: stallAdd, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: stall.id, type: 2, value: stallSup, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: stall.id, type: 3, value: stallMain, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: stall.id, type: 4, value: stallAdd, index: 0 }, () => {})
		}
	}
}

export function startChroma() {
	if (!savedSnapshot) {
		savedSnapshot = captureParkSnapshot()
	}
	updateChromaState({ enableChroma: true })
	if (!chromaSubscription && typeof context !== 'undefined' && context.subscribe) {
		chromaSubscription = context.subscribe('interval.tick', onChromaTick)
	}
}

export function stopChroma(restore: boolean) {
	if (chromaSubscription) {
		chromaSubscription.dispose()
		chromaSubscription = null
	}
	updateChromaState({ enableChroma: false })
	if (restore) {
		if (savedSnapshot) {
			restoreParkSnapshot(savedSnapshot)
			savedSnapshot = null
		}
	}
}

export function updateChromaHook() {
	const st = chromaStore.get()
	if (st.enableChroma) {
		startChroma()
	} else {
		stopChroma(false)
	}
}
