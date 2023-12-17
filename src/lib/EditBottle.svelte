<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import { page } from '$app/stores';
	import * as Form from '$components/ui/form/';
	import * as Popover from '$components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button/';
	import { Calendar } from '$lib/components/ui/calendar/';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { bottleSchema } from './BottlesDB';
	import writable from 'svelte/store';
	import type {Writable}  from 'svelte/store';
	import { z } from 'zod';

	const crudSchema = bottleSchema.extend({
	Id: bottleSchema.shape.Id.optional()
});
	type CrudSchema = typeof crudSchema;

	export let data: SuperValidated<CrudSchema>;

	

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let open = false;

	const {form: theForm} = superForm(data, {
		validators: crudSchema,
		taintedMessage: null
	});

	$: formStore = theForm;
	let value1: DateValue | undefined = $formStore.Purchased
		? parseDate($formStore.Purchased)
		: undefined;
	let value2: DateValue | undefined = $formStore.Consumed
		? parseDate($formStore.Consumed)
		: undefined;
	let placeholder: DateValue = today(getLocalTimeZone());

	/* function closeAndFocusTrigger(triggerId: string) {
	open = false;
	tick().then(() => {
		document.getElementById(triggerId)?.focus();
	});
} */

</script>

<div class="flex items-center justify-between">
	<Form.Root
		Form={theForm}
		schema={bottleSchema}
		class="space-y-2"
		let:config
		debug={true}
		let:enhance
		asChild
		controlled
		action="?/newBottle"
	>
		<form method="POST" action="?/newBottle" use:enhance>
			<Form.Field {config} name="wineName">
				<div class="flex">
					<Form.Label class="p-0.5">Wine Name</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<Form.Input />
				<Form.Description>The name of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="producer">
				<div class="flex">
					<Form.Label class="p-0.5">Producer</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<Form.Input />

				<Form.Description>The producer of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="vintage">
				<div class="flex">
					<Form.Label class="p-0.5">Vintage</Form.Label>
					<Form.Validation class="ml-8" />
				</div>
				<Form.Select>
					<Form.SelectTrigger placeholder="2022" />
					<Form.SelectContent>
						{#each { length: 20 } as _, i}
							<Form.SelectItem
								value={new Date().getFullYear() - 20 + i}
								label={`${new Date().getFullYear() - 20 + i}`}
							>
								{new Date().getFullYear() - 20 + i}
							</Form.SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>

				<Form.Description>The vintage of this wine bottle.</Form.Description>
			</Form.Field>
			<Form.Field {config} name="purchased">
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
									$formStore.purchased = v.toString();
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
			<Form.Field {config} name="consumed">
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
									$formStore.consumed = v.toString();
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
		</form>
	</Form.Root>
</div>
<div class="flex text-start">
	{#if $page.data.debug}<SuperDebug data={theForm.form} collapsible />{/if}
</div>

{#each bottles as bottle}
	<br />
	<p>{JSON.stringify(bottle, null, 2)}</p>
{/each}
