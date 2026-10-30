import { store, type WritableStore } from 'openrct2-flexui'

export const CHROMA_STORAGE_KEY = 'rgbChroma.values'

export interface ChromaState {
	enableChroma: boolean
	chromaMode: number       // 0: Breathing RGB (Snake Wave), 1: Classic Rainbow
	chromaSpeed: number      // 0: Slow, 1: Normal, 2: Fast
	chromaTarget: number     // 0: Selected Ride Only, 1: All Park Rides
	targetRideIndex: number
	chromaVehicleMode: number // 0: Per Car, 1: Per Train, 2: All Same
	chromaVehicles: boolean
	chromaTrack: boolean
	chromaBalloons: boolean
	chromaGuests: boolean
	rides: Ride[]
}

export const defaultChromaState: ChromaState = {
	enableChroma: false,
	chromaMode: 0,
	chromaSpeed: 2,
	chromaTarget: 1,
	targetRideIndex: 0,
	chromaVehicleMode: 0,
	chromaVehicles: true,
	chromaTrack: true,
	chromaBalloons: true,
	chromaGuests: true,
	rides: [],
}

function getInitialChromaState(): ChromaState {
	let loaded: Partial<ChromaState> | null = null
	if (typeof context !== 'undefined' && context.getParkStorage) {
		loaded = context.getParkStorage().get<Partial<ChromaState>>(CHROMA_STORAGE_KEY, null)
	}
	return {
		...defaultChromaState,
		...(loaded || {}),
	}
}

export const chromaStore: WritableStore<ChromaState> = store(getInitialChromaState())

export function updateChromaState(patch: Partial<ChromaState>) {
	const cur = chromaStore.get()
	const updated: ChromaState = { ...cur, ...patch }
	chromaStore.set(updated)
	if (typeof context !== 'undefined' && context.getParkStorage) {
		context.getParkStorage().set(CHROMA_STORAGE_KEY, {
			enableChroma: updated.enableChroma,
			chromaMode: updated.chromaMode,
			chromaSpeed: updated.chromaSpeed,
			chromaTarget: updated.chromaTarget,
			targetRideIndex: updated.targetRideIndex,
			chromaVehicleMode: updated.chromaVehicleMode,
			chromaVehicles: updated.chromaVehicles,
			chromaTrack: updated.chromaTrack,
			chromaBalloons: updated.chromaBalloons,
			chromaGuests: updated.chromaGuests,
		})
	}
}

export function syncRideList() {
	if (typeof map === 'undefined') return
	const rides = map.rides.filter((r) => r.classification === 'ride')
	updateChromaState({ rides })
}
