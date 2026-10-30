import { BREATHING_PALETTE, RAINBOW_PALETTE } from './palette'
import { chromaStore, updateChromaState } from './state'

export interface RideSnapshot {
	colourSchemes: RideColourScheme[]
	vehicleColours: VehicleColour[]
	vehicleColourSettings?: number
}

export interface StallSnapshot {
	colourSchemes: RideColourScheme[]
	vehicleColours?: VehicleColour[]
}

export interface StaffSnapshot {
	id: number
	colour: number
}

export interface ParkSnapshot {
	rides: Record<number, RideSnapshot>
	stalls: Record<number, StallSnapshot>
	staff: StaffSnapshot[]
	cars?: Record<number, { body: number; trim: number; tertiary: number }>
	waterId?: string
}

export interface WaterPaletteDef {
	id: string
	name: string
}

export const WATER_PALETTES: WaterPaletteDef[] = [
	{ id: 'openrct2.water.chroma_00', name: '01: Dark Red' },
	{ id: 'openrct2.water.chroma_01', name: '02: Bright Red' },
	{ id: 'openrct2.water.chroma_02', name: '03: Coral' },
	{ id: 'openrct2.water.chroma_03', name: '04: Light Coral' },
	{ id: 'openrct2.water.chroma_04', name: '05: Light Peach' },
	{ id: 'openrct2.water.chroma_05', name: '06: Light Orange' },
	{ id: 'openrct2.water.chroma_06', name: '07: Amber' },
	{ id: 'openrct2.water.chroma_07', name: '08: Gold' },
	{ id: 'openrct2.water.chroma_08', name: '09: Yellow' },
	{ id: 'openrct2.water.chroma_09', name: '10: Chartreuse' },
	{ id: 'openrct2.water.chroma_10', name: '11: Lime Green' },
	{ id: 'openrct2.water.chroma_11', name: '12: Bright Lime' },
	{ id: 'openrct2.water.chroma_12', name: '13: Pastel Green' },
	{ id: 'openrct2.water.chroma_13', name: '14: Emerald Green' },
	{ id: 'openrct2.water.chroma_14', name: '15: Sea Green' },
	{ id: 'openrct2.water.chroma_15', name: '16: Mint' },
	{ id: 'openrct2.water.chroma_16', name: '17: Teal' },
	{ id: 'openrct2.water.chroma_17', name: '18: Crystal Cyan' },
	{ id: 'openrct2.water.chroma_18', name: '19: Icy Blue' },
	{ id: 'openrct2.water.chroma_19', name: '20: Sky Blue' },
	{ id: 'openrct2.water.chroma_20', name: '21: Ocean Blue' },
	{ id: 'openrct2.water.chroma_21', name: '22: Dark Blue' },
	{ id: 'openrct2.water.chroma_22', name: '23: Light Indigo' },
	{ id: 'openrct2.water.chroma_23', name: '24: Lavender' },
	{ id: 'openrct2.water.chroma_24', name: '25: Light Purple' },
	{ id: 'openrct2.water.chroma_25', name: '26: Bright Purple' },
	{ id: 'openrct2.water.chroma_26', name: '27: Magenta' },
	{ id: 'openrct2.water.chroma_27', name: '28: Deep Pink' },
	{ id: 'openrct2.water.chroma_28', name: '29: Bright Pink' },
	{ id: 'openrct2.water.chroma_29', name: '30: Rose Pink' },
	{ id: 'openrct2.water.chroma_30', name: '31: Burgundy' },
	{ id: 'openrct2.water.chroma_31', name: '32: Crimson' },
]

export const CLASSIC_WATER_INDICES = [1, 5, 8, 11, 15, 19, 21, 25, 28] // 9 Classic Rainbow steps

export function getCurrentWaterId(): string {
	try {
		const mgr = (typeof objectManager !== 'undefined')
			? objectManager
			: ((typeof context !== 'undefined' && (context as any).getObjectManager) ? (context as any).getObjectManager() : null)
		if (!mgr) return 'rct2.water.wtrcyan'
		const loaded = mgr.getAllObjects('water')
		if (loaded && loaded.length > 0 && loaded[0].installedObject) {
			return loaded[0].installedObject.identifier
		}
	} catch (e) {}
	return 'rct2.water.wtrcyan'
}

export function switchWaterPalette(targetId: string): boolean {
	try {
		const mgr = (typeof objectManager !== 'undefined')
			? objectManager
			: ((typeof context !== 'undefined' && (context as any).getObjectManager) ? (context as any).getObjectManager() : null)
		if (!mgr) return false
		const loaded = mgr.getAllObjects('water')
		if (loaded && loaded.length > 0) {
			const curInst = loaded[0].installedObject
			if (curInst && curInst.identifier === targetId) {
				return true
			}
			mgr.unload('water', 0)
		}
		const res = mgr.load(targetId)
		return res !== null
	} catch (e) {
		return false
	}
}

export let savedSnapshot: ParkSnapshot | null = null
export let chromaSubscription: IDisposable | null = null

export function getRides(): Ride[] {
	if (typeof map === 'undefined') return []
	return map.rides.filter((r) => r.classification === 'ride')
}

export function getStalls(): Ride[] {
	if (typeof map === 'undefined') return []
	return map.rides.filter((r) => {
		if (!r || r.classification !== 'stall') return false
		try {
			const obj = r.object as unknown as { flags?: number } | null
			if (obj && obj.flags !== undefined) {
				// (1 << 19) = 524288 is disableColourTab (skip fixed food stalls)
				if ((obj.flags & 524288) !== 0) {
					return false
				}
			}
		} catch (e) {}
		return true
	})
}

export function isFlatRide(ride: Ride): boolean {
	try {
		const obj = ride.object as unknown as { carsPerFlatRide?: number } | null
		if (obj && obj.carsPerFlatRide !== undefined) {
			return obj.carsPerFlatRide !== 255 && obj.carsPerFlatRide > 0
		}
	} catch (e) {}
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

export function detectVehicleColourScheme(ride: Ride): number {
	try {
		if (isFlatRide(ride)) return 0
		if (ride.vehicles && ride.vehicles.length > 0) {
			const head = map.getEntity(ride.vehicles[0]) as Car | null
			if (head && head.type === 'car') {
				const trainCars = findTrainCars(head)
				if (trainCars.length > 1) {
					const c0 = trainCars[0].colours
					const c1 = trainCars[1].colours
					if (c0 && c1 && (c0.body !== c1.body || c0.trim !== c1.trim || c0.tertiary !== c1.tertiary)) {
						return 2 // Per Car
					}
				}
			}
			if (ride.vehicles.length > 1) {
				const h0 = map.getEntity(ride.vehicles[0]) as Car | null
				const h1 = map.getEntity(ride.vehicles[1]) as Car | null
				if (h0 && h1 && h0.colours && h1.colours) {
					if (h0.colours.body !== h1.colours.body || h0.colours.trim !== h1.colours.trim || h0.colours.tertiary !== h1.colours.tertiary) {
						return 1 // Per Train
					}
				}
			}
		}
		if (ride.vehicleColours && ride.vehicleColours.length > 1) {
			const v0 = ride.vehicleColours[0]
			const v1 = ride.vehicleColours[1]
			if (v0 && v1 && (v0.body !== v1.body || v0.trim !== v1.trim || v0.tertiary !== v1.tertiary)) {
				return 2 // Per Car
			}
		}
	} catch (e) {}
	return 0 // All Same
}

export function captureParkSnapshot(): ParkSnapshot {
	const snap: ParkSnapshot = { rides: {}, stalls: {}, staff: [], cars: {} }
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
			vehicleColourSettings: detectVehicleColourScheme(r),
		}

		// Capture active car entity colors
		if (r.vehicles && r.vehicles.length > 0 && snap.cars) {
			for (let v = 0; v < r.vehicles.length; v++) {
				const head = map.getEntity(r.vehicles[v]) as Car | null
				if (head && head.type === 'car') {
					const train = findTrainCars(head)
					for (let c = 0; c < train.length; c++) {
						const carObj = train[c]
						if (carObj && carObj.colours) {
							snap.cars[carObj.id] = {
								body: carObj.colours.body,
								trim: carObj.colours.trim,
								tertiary: carObj.colours.tertiary,
							}
						}
					}
				}
			}
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
			vehicleColours: (s.vehicleColours || []).map((vc) => ({
				body: vc.body,
				trim: vc.trim,
				tertiary: vc.tertiary,
			})),
		}
	}

	if (typeof map.getAllEntities !== 'undefined') {
		const allStaff = map.getAllEntities('staff') as Staff[]
		for (let k = 0; k < allStaff.length; k++) {
			const member = allStaff[k]
			if (member && member.colour !== undefined) {
				snap.staff.push({ id: member.id, colour: member.colour })
			}
		}
	}
	snap.waterId = getCurrentWaterId()
	return snap
}

export function restoreParkSnapshot(snap: ParkSnapshot | null) {
	if (!snap || typeof map === 'undefined') return

	if (snap.waterId) {
		switchWaterPalette(snap.waterId)
	}

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

	if (snap.cars) {
		for (const carIdStr in snap.cars) {
			const carId = Number(carIdStr)
			const carEnt = map.getEntity(carId) as Car | null
			if (carEnt && carEnt.type === 'car') {
				const col = snap.cars[carId]
				carEnt.colours = {
					body: col.body,
					trim: col.trim,
					tertiary: col.tertiary,
				}
			}
		}
	}

	for (const sIdStr in snap.stalls) {
		const sId = Number(sIdStr)
		const sSnap = snap.stalls[sId]
		if (!sSnap) continue
		if (sSnap.colourSchemes && sSnap.colourSchemes.length > 0) {
			const cs = sSnap.colourSchemes[0]
			context.executeAction('ridesetappearance', { ride: sId, type: 0, value: cs.main, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: sId, type: 1, value: cs.additional, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: sId, type: 2, value: cs.supports, index: 0 }, () => {})
		}
		if (sSnap.vehicleColours && sSnap.vehicleColours.length > 0) {
			const vc = sSnap.vehicleColours[0]
			context.executeAction('ridesetappearance', { ride: sId, type: 3, value: vc.body, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: sId, type: 4, value: vc.trim, index: 0 }, () => {})
			context.executeAction('ridesetappearance', { ride: sId, type: 5, value: vc.tertiary, index: 0 }, () => {})
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

let chromaTickCounter = 0
let chromaStep = 0
let lastSyncVehicleMode = -1

export function applyChromaStep(step: number) {
	chromaStep = step
	const st = chromaStore.get()
	const isBreathing = (st.chromaMode === 0 || st.chromaMode === undefined)
	const activePalette = isBreathing ? BREATHING_PALETTE : RAINBOW_PALETTE
	const stepCount = activePalette.length

	// 1. Synchronized Water Palette Cycling (100% Lockstep with Main Chroma Clock!)
	if (st.chromaWater) {
		let nextWIdx = 0
		if (st.chromaMode === 1) {
			// Classic Rainbow Mode: cycles through the 9 bold rainbow spectrum colors
			nextWIdx = CLASSIC_WATER_INDICES[step % CLASSIC_WATER_INDICES.length]
		} else {
			// Breathing RGB Mode: 1:1 lockstep sync across all 32 breathing steps
			nextWIdx = step % 32
		}
		switchWaterPalette(WATER_PALETTES[nextWIdx].id)
	}

	const allRides = getRides()
	const selRide = (st.targetRideIndex < allRides.length) ? allRides[st.targetRideIndex] : null

	// 2. Guests, Accessories & Staff Uniforms
	if (st.chromaGuests) {
		const gStepTshirt = step
		const gStepHat = (step + (isBreathing ? 1 : 3)) % stepCount
		const cTshirt = activePalette[gStepTshirt]
		const cHat = activePalette[gStepHat]

		const allGuests = map.getAllEntities('guest') as Guest[]
		for (let gIdx = 0; gIdx < allGuests.length; gIdx++) {
			const guest = allGuests[gIdx]
			if (!guest) continue
			guest.tshirtColour = cTshirt
			guest.hatColour = cHat
			if (guest.balloonColour !== undefined) {
				guest.balloonColour = activePalette[(step + (isBreathing ? 2 : 2)) % stepCount]
			}
			if (guest.umbrellaColour !== undefined) {
				guest.umbrellaColour = activePalette[(step + (isBreathing ? 0 : 6)) % stepCount]
			}
		}

		const sHandyman = cTshirt
		const sMechanic = activePalette[(step + (isBreathing ? 2 : 5)) % stepCount]
		const sSecurity = activePalette[(step + (isBreathing ? 4 : 7)) % stepCount]

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

	// 3. Vehicles: Coasters, Tracked Rides & Flat Rides
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
						carStep = (step - cIdx + stepCount * 10) % stepCount
					} else if (st.chromaVehicleMode === 1) {
						// Per Train (Distinct Trains)
						carStep = (step + trainOffset) % stepCount
					} else {
						// All Same
						carStep = step
					}

					const cBody = activePalette[carStep]
					const cTrim = isBreathing ? activePalette[(carStep + 1) % stepCount] : activePalette[(carStep + 2) % stepCount]
					const cTert = isBreathing ? activePalette[(carStep + stepCount - 1) % stepCount] : activePalette[(carStep + 4) % stepCount]

					car.colours = { body: cBody, trim: cTrim, tertiary: cTert }
				}
			}
		}

		lastSyncVehicleMode = st.chromaVehicleMode

		const targetFlatRides = (st.chromaTarget === 0) ? (selRide && isFlatRide(selRide) ? [selRide] : []) : flatRides
		for (let frIdx = 0; frIdx < targetFlatRides.length; frIdx++) {
			const fRide = targetFlatRides[frIdx]
			if (!fRide) continue

			const fStep = step
			const fBody = activePalette[fStep]
			const fTrim = isBreathing ? activePalette[(fStep + 1) % stepCount] : activePalette[(fStep + 2) % stepCount]
			const fTert = isBreathing ? activePalette[(fStep + stepCount - 1) % stepCount] : activePalette[(fStep + 4) % stepCount]

			// Type 3: Vehicle body / structure
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 3, value: fBody, index: 0 }, () => {})
			// Type 4: Vehicle trim / rotating gondolas
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 4, value: fTrim, index: 0 }, () => {})
			// Type 5: Tertiary
			context.executeAction('ridesetappearance', { ride: fRide.id, type: 5, value: fTert, index: 0 }, () => {})

			// Direct in-memory car entity update for flat/tower rides that have car entities
			if (fRide.vehicles && fRide.vehicles.length > 0) {
				for (let vIdx = 0; vIdx < fRide.vehicles.length; vIdx++) {
					const fCar = map.getEntity(fRide.vehicles[vIdx]) as Car | null
					if (fCar && fCar.type === 'car') {
						fCar.colours = { body: fBody, trim: fTrim, tertiary: fTert }
					}
				}
			}
		}
	}

	// 4. Tracks & Ride Structures (Coasters, Towers, and Flat Ride Frames)
	if (st.chromaTrack && allRides.length > 0) {
		const ridesToProcess = (st.chromaTarget === 0) ? (selRide ? [selRide] : []) : allRides

		for (let rIdx = 0; rIdx < ridesToProcess.length; rIdx++) {
			const ride = ridesToProcess[rIdx]
			if (!ride) continue

			const rideBaseStep = step

			// Update all 4 Schemes (0: Main, 1: Alt 1, 2: Alt 2, 3: Alt 3)
			// Alt colors are delayed by 2 steps per scheme index (sIdx * 2)
			for (let sIdx = 0; sIdx < 4; sIdx++) {
				const sStep = (rideBaseStep - sIdx * 2 + stepCount * 10) % stepCount
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

	// 5. Stalls & Shops
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

			const stallStep = (step + itemPhase) % stepCount
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

export function onChromaTick() {
	const st = chromaStore.get()
	if (!st.enableChroma) {
		if (chromaSubscription) {
			chromaSubscription.dispose()
			chromaSubscription = null
		}
		return
	}

	// 1. Tick Clock (Divisor clock controls the speed of the entire park: Rides, Tracks, Water, Guests)
	chromaTickCounter++
	const divisor = st.chromaSpeed === 0 ? 8 : (st.chromaSpeed === 1 ? 4 : 2)
	if (chromaTickCounter % divisor !== 0) return

	const isBreathing = (st.chromaMode === 0 || st.chromaMode === undefined)
	const activePalette = isBreathing ? BREATHING_PALETTE : RAINBOW_PALETTE
	const stepCount = activePalette.length
	chromaStep = (chromaStep + 1) % stepCount

	applyChromaStep(chromaStep)
}

export function stepChroma(direction: number) {
	if (!savedSnapshot) {
		savedSnapshot = captureParkSnapshot()
	}
	if (chromaStore.get().enableChroma) {
		stopChroma(false)
	}
	const st = chromaStore.get()
	const isBreathing = (st.chromaMode === 0 || st.chromaMode === undefined)
	const activePalette = isBreathing ? BREATHING_PALETTE : RAINBOW_PALETTE
	const stepCount = activePalette.length
	chromaStep = (chromaStep + direction + stepCount * 10) % stepCount
	applyChromaStep(chromaStep)
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

export function applyCurrentPermanent() {
	if (chromaSubscription) {
		chromaSubscription.dispose()
		chromaSubscription = null
	}
	updateChromaState({ enableChroma: false })

	if (typeof map !== 'undefined') {
		const st = chromaStore.get()
		const vehMode = (st.chromaVehicleMode !== undefined) ? st.chromaVehicleMode : 0
		const targetScheme = (vehMode === 0) ? 2 : ((vehMode === 1) ? 1 : 0)
		const rides = getRides()

		for (let i = 0; i < rides.length; i++) {
			const r = rides[i]
			if (!r) continue

			if (isFlatRide(r)) {
				// Flat rides: gondolas / vehicles are index 0
				if (r.vehicles && r.vehicles.length > 0) {
					const fCar = map.getEntity(r.vehicles[0]) as Car | null
					if (fCar && fCar.type === 'car' && fCar.colours) {
						const fb = fCar.colours.body
						const ft = fCar.colours.trim
						const fs = fCar.colours.tertiary
						context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: fb, index: 0 }, () => {})
						context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: ft, index: 0 }, () => {})
						context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: fs, index: 0 }, () => {})
					}
				}
			} else if (r.vehicles && r.vehicles.length > 0) {
				// Track rides: Coasters, Car rides, etc.
				const trainVehicles = r.vehicles
				const isSingleCarRides = (trainVehicles.length > 4)

				// 1. Sync vehicle colour scheme mode (type 6)
				context.executeAction('ridesetappearance', {
					ride: r.id,
					type: 6,
					value: targetScheme,
					index: 0,
				}, () => {})

				// 2. Persist colors based on vehicleMode
				if (vehMode === 0 && !isSingleCarRides) {
					// Per Car mode: set vehicleColours index 0..31 matching each car on the train
					const headCar = map.getEntity(trainVehicles[0]) as Car | null
					if (headCar && headCar.type === 'car') {
						const carsOnTrain = findTrainCars(headCar)
						const numCars = carsOnTrain.length
						for (let cIdx = 0; cIdx < 32; cIdx++) {
                            const carObj = carsOnTrain[cIdx % numCars]
                            if (carObj && carObj.colours) {
                                const cb = carObj.colours.body
                                const ct = carObj.colours.trim
                                const cs = carObj.colours.tertiary
                                context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: cb, index: cIdx }, () => {})
                                context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: ct, index: cIdx }, () => {})
                                context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: cs, index: cIdx }, () => {})
                            }
                        }
					}
				} else if (vehMode === 1 || isSingleCarRides) {
					// Per Train mode (or single-car rides): set index for each train
					const numTrains = trainVehicles.length
					for (let tIdx = 0; tIdx < 32; tIdx++) {
						const tHead = map.getEntity(trainVehicles[tIdx % numTrains]) as Car | null
						if (tHead && tHead.type === 'car' && tHead.colours) {
							const tb = tHead.colours.body
							const tt = tHead.colours.trim
							const ts = tHead.colours.tertiary
							context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: tb, index: tIdx }, () => {})
							context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: tt, index: tIdx }, () => {})
							context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: ts, index: tIdx }, () => {})
						}
					}
				} else {
					// All Same mode: fill all 32 slots with head car's color
					const headCar = map.getEntity(trainVehicles[0]) as Car | null
					if (headCar && headCar.type === 'car' && headCar.colours) {
						const ab = headCar.colours.body
						const at = headCar.colours.trim
						const as = headCar.colours.tertiary
						for (let aIdx = 0; aIdx < 32; aIdx++) {
							context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: ab, index: aIdx }, () => {})
							context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: at, index: aIdx }, () => {})
							context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: as, index: aIdx }, () => {})
						}
					}
				}

				// 3. Re-affirm car.colours on all active cars so they stay 100% frozen
				for (let trkIdx = 0; trkIdx < trainVehicles.length; trkIdx++) {
					const tCar = map.getEntity(trainVehicles[trkIdx]) as Car | null
					if (tCar && tCar.type === 'car') {
						const trainList = findTrainCars(tCar)
						for (let tc = 0; tc < trainList.length; tc++) {
							const carEntity = trainList[tc]
							if (carEntity && carEntity.colours) {
								carEntity.colours = {
									body: carEntity.colours.body,
									trim: carEntity.colours.trim,
									tertiary: carEntity.colours.tertiary,
								}
							}
						}
					}
				}
			}
		}
	}

	// Capture current park colors as the new baseline snapshot
	savedSnapshot = captureParkSnapshot()

	// Explicitly update savedSnapshot's vehicleColours with the new colors for each ride
	// so that if the user clicks "Stop RGB & Restore Colors", it restores to this applied permanent state!
	if (savedSnapshot && savedSnapshot.rides) {
		for (const ridStr in savedSnapshot.rides) {
			const rid = Number(ridStr)
			const rObj = map.getRide(rid)
			if (rObj && !isFlatRide(rObj)) {
				savedSnapshot.rides[rid].vehicleColourSettings = targetScheme
			}
			if (rObj && rObj.vehicles && rObj.vehicles.length > 0) {
				const vColList: VehicleColour[] = []
				if (vehMode === 1) {
					// Per Train mode: sample each train's head car
					const numTrains = rObj.vehicles.length
					for (let s = 0; s < 32; s++) {
						const tHead = map.getEntity(rObj.vehicles[s % numTrains]) as Car | null
						if (tHead && tHead.type === 'car' && tHead.colours) {
							vColList.push({ body: tHead.colours.body, trim: tHead.colours.trim, tertiary: tHead.colours.tertiary })
						}
					}
				} else {
					// Per Car or All Same mode: sample cars on train 0
					const hCar = map.getEntity(rObj.vehicles[0]) as Car | null
					if (hCar && hCar.type === 'car') {
						const cList = findTrainCars(hCar)
						for (let s = 0; s < 32; s++) {
							const cItem = cList[s % cList.length]
							if (cItem && cItem.colours) {
								vColList.push({ body: cItem.colours.body, trim: cItem.colours.trim, tertiary: cItem.colours.tertiary })
							}
						}
					}
				}
				if (vColList.length > 0) {
					savedSnapshot.rides[rid].vehicleColours = vColList
				}
			}
		}
	}

	if (typeof park !== 'undefined' && park.postMessage) {
		park.postMessage({ type: 'blank', text: 'RGB Chroma: Current colors applied as permanent!' })
	}
}
