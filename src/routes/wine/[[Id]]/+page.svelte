<script lang="ts">
	import EditBottle from '$lib/EditBottle.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { bottleSchema, type BottleFormSchema } from '$lib/schemas';
	//import type { SuperValidated } from 'sveltekit-superforms';
	export let data: PageData;
	 import * as flashModule from 'sveltekit-flash-message/client';

	$: bottles = data.bottles;
	// Client API:
	//const { form } = superForm(data.form);

	const theForm = superForm(data.form, {
    dataType: 'json',
    async onUpdate({ form }) {
      if (form.valid) {
        await goto('?id=' + form.data.id);
      }
    },
    onSubmit({ formData, cancel }) {
      if (formData.has('cancel')) {
        console.log('Cancelling');
        cancel();
      }
    },
    onUpdated({ form }) {
      updates = [...updates, '1:' + String(form.valid)];
    },
    onError({ result, message }) {
      message.set({ type: 'error', message: result.error.message });
    },
    flashMessage: {
      module: flashModule,
      onError({ result, message }) {
        message.set({
          type: 'error',
          message: result.error.message
        });
      }
    },
    syncFlashMessage: true,
    selectErrorText: true
  });
	const {
    form,
    errors,
    enhance,
    message,
    delayed,
    reset,
    constraints,
    fields,
    tainted
  } = theForm;

const {
    form: staticform,
    errors: staticerrors,
    constraints: staticconstraints
  } = superForm(data.form, {
    warnings: {
      duplicateId: false
    }
  });
  let updates: string[] = [];


</script>


{#if $message}
  <h4 class:error={$message.type == 'error'} class="message">
    {$message.message}
  </h4>
{/if}
<div class="updates">Updates: {updates.join(',')}</div>
<div class="container mx-auto flex justify-center">
	<div class="px-4 text-center flex flex-col items-center">
		
		<h1>sveltekit-superforms</h1>

<div class="users">
  <b>Select customer:</b>
  {#each data.bottles as bottle}
    | <a href="?id={bottle.Id}">{bottle.Name}</a> |
  {/each}
  {#if $form.id}
    <button on:click={() => goto('?')}>Create new</button>
  {/if}
</div>
		<h2>{!$form.id ? 'Create' : 'Update'} user</h2>
		{#if $message}
			<h3 class:invalid={$page.status >= 400}>{$message}</h3>
		{/if}
		

		<EditBottle {theForm} />
		<br />
		<br />
	</div>
</div>

{#each bottles as bottle}
	<br />
	<p>{JSON.stringify(bottle, null, 2)}</p>
{/each}

<style lang="postcss">
</style>
