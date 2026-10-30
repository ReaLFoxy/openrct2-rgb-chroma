export interface ColorDef {
	id: number
	name: string
}

export const OPENRCT2_COLORS: ColorDef[] = [
	{ id: 0, name: '0: Black' },
	{ id: 1, name: '1: Grey' },
	{ id: 2, name: '2: White' },
	{ id: 3, name: '3: Dark Purple' },
	{ id: 4, name: '4: Light Purple' },
	{ id: 5, name: '5: Bright Purple' },
	{ id: 6, name: '6: Dark Blue' },
	{ id: 7, name: '7: Light Blue' },
	{ id: 8, name: '8: Icy Blue' },
	{ id: 9, name: '9: Teal' },
	{ id: 10, name: '10: Aquamarine' },
	{ id: 11, name: '11: Intense Green' },
	{ id: 12, name: '12: Dark Green' },
	{ id: 13, name: '13: Moss Green' },
	{ id: 14, name: '14: Olive Green' },
	{ id: 15, name: '15: Amber' },
	{ id: 16, name: '16: Light Orange' },
	{ id: 17, name: '17: Bright Red' },
	{ id: 18, name: '18: Dark Red' },
	{ id: 19, name: '19: Bright Pink' },
	{ id: 20, name: '20: Deep Pink' },
	{ id: 21, name: '21: Dark Pink' },
	{ id: 22, name: '22: Lavender' },
	{ id: 23, name: '23: Burgundy' },
	{ id: 24, name: '24: Light Peach' },
	{ id: 25, name: '25: Yellow' },
	{ id: 26, name: '26: Olive' },
	{ id: 27, name: '27: Bronze' },
	{ id: 28, name: '28: Pastel Green' },
	{ id: 29, name: '29: Coral' },
	{ id: 30, name: '30: Light Coral' },
	{ id: 31, name: '31: Light Indigo' },
]

// 32-Step Smooth Serpentine "Breathing RGB" Spectrum (Exact OpenRCT2 Native Palette Grid Mapping)
export const BREATHING_PALETTE: number[] = [
	18, // 0: Dark Red
	17, // 1: Bright Red
	29, // 2: Coral
	30, // 3: Light Coral
	24, // 4: Light Peach
	16, // 5: Light Orange
	15, // 6: Amber
	25, // 7: Yellow
	27, // 8: Bronze
	26, // 9: Olive
	14, // 10: Olive Green
	13, // 11: Moss Green
	12, // 12: Dark Green
	11, // 13: Intense Green
	28, // 14: Pastel Green
	10, // 15: Aquamarine
	9,  // 16: Teal
	8,  // 17: Icy Blue
	7,  // 18: Light Blue
	6,  // 19: Dark Blue
	31, // 20: Light Indigo
	3,  // 21: Dark Purple
	4,  // 22: Light Purple
	5,  // 23: Bright Purple
	22, // 24: Lavender
	21, // 25: Dark Pink
	20, // 26: Deep Pink
	19, // 27: Bright Pink
	23, // 28: Burgundy
	0,  // 29: Black
	1,  // 30: Grey
	2,  // 31: White
]

// 9-Step Classic Rainbow Spectrum
export const RAINBOW_PALETTE: number[] = [
	17, // 0: Bright Red
	16, // 1: Light Orange
	25, // 2: Yellow
	11, // 3: Intense Green
	10, // 4: Aquamarine
	7,  // 5: Light Blue
	6,  // 6: Dark Blue
	5,  // 7: Bright Purple
	19, // 8: Bright Pink
]
