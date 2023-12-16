<!-- <script lang="ts">
	import { Form } from 'formsnap';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	// Client API:
	let schema = JSON.parse(data.schema);
	const { form } = superForm(data.form);
</script> -->

<!-- <div class="flex flex-grow-0">
	<Form.Root form={data.form} {schema} class="space-y-2" let:config>
		<input type="hidden" name="__superform_id" value={formId} />
		<Form.Field {config} name="name">
			<Form.Label>Name</Form.Label>
			<Form.Input />
			<Form.Description>Be sure to use your real name.</Form.Description>
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="email">
			<Form.Label>E-mail</Form.Label>
			<Form.Input type="email" />
			<Form.Description>It's preferred that you use your company email.</Form.Description>
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Label>Password!?</Form.Label>
			<Form.Input type="password" />
			<Form.Description>Ensure the password is at least 10 characters.</Form.Description>
			<Form.Validation />
		</Form.Field>
		<div>
			<button type="submit" class="btn bg-gradient-to-br variant-gradient-primary-secondary"
				>Submit</button
			>
		</div>
	</Form.Root>
</div>
<div class="flex text-start">
	<SuperDebug data={$form} />
</div> -->
