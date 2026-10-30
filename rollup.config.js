import { exec } from 'node:child_process'
import { homedir } from 'node:os'
import { promisify } from 'node:util'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const options = {
	filename: 'rgb-chroma.js',
	build: process.env.BUILD || 'development',
}

async function getOutput() {
	if (options.build !== 'development') {
		return `./dist/${options.filename}`
	}

	const platform = process.platform
	const pluginPath = `OpenRCT2/plugin/${options.filename}`

	if (platform === 'win32') {
		const { stdout } = await promisify(exec)(
			'powershell -command "[Environment]::GetFolderPath(\'MyDocuments\')"',
		)
		return `${stdout.trim()}/${pluginPath}`
	}

	if (platform === 'darwin') {
		return `${homedir()}/Library/Application Support/${pluginPath}`
	}

	const configFolder = process.env.XDG_CONFIG_HOME || `${homedir()}/.config`
	return `${configFolder}/${pluginPath}`
}

export default {
	input: './src/plugin.ts',
	output: {
		file: await getOutput(),
		format: 'iife',
		compact: true,
	},
	treeshake: 'smallest',
	plugins: [
		commonjs(),
		resolve(),
		typescript(),
		terser({
			compress: {
				passes: 5,
				toplevel: true,
				unsafe: true,
			},
			format: {
				comments: false,
				quote_style: 1,
				wrap_iife: true,
				beautify: options.build === 'development',
			},
		}),
	],
}
