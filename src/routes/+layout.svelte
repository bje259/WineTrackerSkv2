<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import '../app.postcss';
	// Floating UI for Popups
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { getFlash } from 'sveltekit-flash-message/client';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const flash = getFlash(page);

	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() != nav.to?.url.toString()) {
			$flash = undefined;
		}
	});
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail"></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/wine">Form Testing</a></li>
				<li><a href="/wines">Form Testing2</a></li>
			</ul>
			{#if $flash}
				{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
				<div style:background-color={bg} class="flash">{$flash.message}</div>
			{/if}
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style lang="scss">
	.flash {
		padding: 5px 10px;
		color: white;
		border-radius: 3px;
	}
</style>
