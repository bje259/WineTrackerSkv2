<script lang="ts">
	//import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import type { PageData } from './$types';
	//import YearCal from './yearCal.svelte';
	//import TestForm from './TestForm3.svelte';
	$: bottles = data.bottles;
	export let data: PageData;
	const flash = getFlash(page);
	// Client API:
	//const { form } = superForm(data.form);
</script>

<div class="container mx-auto flex justify-center">
	<div class="px-4 text-center flex flex-col items-center">
		<h1 class="h1">Form Testing!</h1>
		<!-- <TestForm {data} /> -->
		<!-- <EditBottle form={data.form} /> -->
		<br />
		<br />
	</div>
</div>
{#if $flash}
	{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
	<div style:background-color={bg} class="flash">{$flash.message}</div>
{/if}
{#each bottles as bottle}
	<br />
	<p>{JSON.stringify(bottle, null, 2)}</p>
{/each}

<style lang="postcss">
</style>
