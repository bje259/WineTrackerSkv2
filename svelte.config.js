import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import sequence from 'svelte-sequential-preprocessor';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess({}), preprocessMeltUI()]),
	vitePlugin: {
		inspector: false
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$components: './src/lib/components',
			$lib: './src/lib',
			$routes: './src/routes'
		}
	},
	compilerOptions: {}
};
export default config;
