<script lang="ts">
	import * as Calendar from '$lib/components/ui/calendar';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = today(getLocalTimeZone());
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	const yearOptions = Array.from({ length: 100 }, (_, i) => ({
		label: String(new Date().getFullYear() - i),
		value: new Date().getFullYear() - i
	}));

	$: defaultYear = placeholder
		? {
				value: placeholder.year,
				label: String(placeholder.year)
			}
		: undefined;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Root
	{weekdayFormat}
	class={cn('p-3 rounded-md border', className)}
	{...$$restProps}
	on:keydown
	bind:value
	bind:placeholder
>
	<Calendar.Header>
		<Calendar.Heading class="flex items-center justify-between w-full gap-2">
			<Select.Root
				selected={defaultYear}
				items={yearOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.year) return;
					placeholder = placeholder.set({ year: v.value });
				}}
			>
				<Select.Trigger aria-label="Select year" class="w-[40%]">
					<Select.Value placeholder="Select year" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each yearOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Calendar.Heading>
	</Calendar.Header>
</CalendarPrimitive.Root>
