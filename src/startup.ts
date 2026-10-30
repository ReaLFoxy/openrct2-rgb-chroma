import { chromaWindow } from './view'

export function startup() {
	if (typeof ui !== 'undefined') {
		ui.registerMenuItem('RGB Chroma', () => {
			chromaWindow.open()
		})
	}
}
