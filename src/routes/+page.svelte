<script lang="ts">
	import EditBottle from './EditBottle.svelte';
	//import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	//import TestForm from './TestForm3.svelte';

	export let data: PageData;

	// Client API:
	//const { form } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="px-4 text-center flex flex-col items-center">
		<h1 class="h1">Form Testing!</h1>
		<!-- <TestForm {data} /> -->
		<EditBottle form={data.form} />
	</div>
</div>

<style lang="postcss">
</style>
