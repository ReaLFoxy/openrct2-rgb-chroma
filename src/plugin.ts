/// <reference path="../lib/openrct2.d.ts" />

import { startup } from './startup'

registerPlugin({
	name: 'RGBChroma',
	version: '1.1.0',
	authors: ['ReaLFoxy', 'Google Gemini 3.8 Flash (High)'],
	type: 'local',
	licence: 'MIT',
	targetApiVersion: 111,
	main: startup,
})
