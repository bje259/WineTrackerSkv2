<script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$components/ui/form/';
	import * as Popover from '$components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button/';
	import { Calendar } from '$lib/components/ui/calendar/';
	import { bottleSchema } from '$lib/schemas';
	import { cn } from '$lib/utils';
	import {
		CalendarDate,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormSelectYear from './FormSelectYear.svelte';
	export let theForm = $page.data.bottleForm;
	// Formatter for "MM/DD/YYYY"
	const df = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});

	let open = false;

	// const theForm = superForm(form, {
	// 	validators: bottleSchema,
	// 	taintedMessage: null
	// });

	const { formStore: formStore } = theForm.$formStore;
	let value1: DateValue | undefined = $formStore.purchased
		? parseDate($formStore.purchased)
		: undefined;
	let value2: DateValue | undefined = $formStore.consumed
		? parseDate($formStore.consumed)
		: undefined;

	let placeholder: DateValue = today(getLocalTimeZone());
</script>

<div class="flex items-center justify-between">
	<Form.Root
		form={theForm}
		schema={bottleSchema}
		class="space-y-2"
		let:config
		debug={true}
		let:enhance
		asChild
		controlled
	>
		<form
			method="POST"
			action="?/edit"
			use:enhance={{
				onUpdated: ({ form }) => {
					updates = [...updates, '2:' + String(form.valid)];
				}
			}}
		>
			<input type="hidden" name="id" bind:value={$form.id} />
			<input type="hidden" name="notInSchema" value="123" />
			<Form.Field {config} name="Name">
				<div class="flex">
					<Form.Label class="p-0.5">Wine Name</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<Form.Input />
				<Form.Description>The name of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="Producer">
				<div class="flex">
					<Form.Label class="p-0.5">Producer</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<Form.Input />

				<Form.Description>The producer of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="Vintage">
				<div class="flex">
					<Form.Label class="p-0.5">Vintage</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<FormSelectYear />
				<Form.Description>The vintage of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="Purchased">
				<Form.Label>Purchased Date</Form.Label>
				<Popover.Root>
					<Form.Control id="purchased" let:attrs>
						<Popover.Trigger
							id="purchased"
							{...attrs}
							class={cn(
								buttonVariants({ variant: 'outline' }),
								'w-[280px] justify-start pl-4 text-left font-normal',
								!value1 && 'text-muted-foreground'
							)}
						>
							{value1 ? df.format(value1.toDate(getLocalTimeZone())) : 'Pick a date'}
							<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
						</Popover.Trigger>
					</Form.Control>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							bind:value={value1}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Purchased Date"
							initialFocus
							onValueChange={(v) => {
								if (v) {
									$formStore.purchased = df.format(v.toDate(getLocalTimeZone())).toString();
								} else {
									$formStore.purchased = '01/01/1900';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>The date this wine bottle was purchased.</Form.Description>
				<Form.Validation />
			</Form.Field>
			<Form.Field {config} name="Consumed">
				<Form.Label>Consumed Date</Form.Label>
				<Popover.Root>
					<Form.Control id="consumed" let:attrs>
						<Popover.Trigger
							id="consumed"
							{...attrs}
							class={cn(
								buttonVariants({ variant: 'outline' }),
								'w-[280px] justify-start pl-4 text-left font-normal',
								!value2 && 'text-muted-foreground'
							)}
						>
							{value2 ? df.format(value2.toDate(getLocalTimeZone())) : 'Pick a date'}
							<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
						</Popover.Trigger>
					</Form.Control>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							bind:value={value2}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Consumed Date"
							initialFocus
							onValueChange={(v) => {
								if (v) {
									$formStore.consumed = df.format(v.toDate(getLocalTimeZone())).toString();
								} else {
									$formStore.consumed = '01/01/1900';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>The date this wine bottle was consumed.</Form.Description>
				<Form.Validation />
			</Form.Field>
			<Form.Button class="variant-filled-surface btn">Submit</Form.Button>
			{#if $theForm.delayed}Working...{/if}
		</form>
	</Form.Root>
</div>
<div class="flex text-start">
	{#if $page.data.debug}<SuperDebug data={theForm.form} collapsible />{/if}
</div>
