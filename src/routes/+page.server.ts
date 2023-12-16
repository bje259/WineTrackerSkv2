/* eslint-disable @typescript-eslint/no-unused-vars */
import { bottleIdGen, bottles } from '$lib/bottleDB';
import { bottleSchema } from '$lib/schemas';
import type { TBottle, TBottles } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ url, params }) => {
	const form = await superValidate(bottleSchema);
	return { form: form, bottles: bottles, debug: true };
});

function maxId(tmpBottles: TBottles): number {
	const maxId = tmpBottles.reduce((max, bottle) => Math.max(max, Number.parseInt(bottle.Id)), 0);
	return maxId;
}

// function resetForm(data: z.infer<BottleFormSchema>): void {
// 	data.wineName = '';
// 	data.vintage = 2020;
// 	data.producer = '';
// 	data.purchased = '01/01/1900';
// 	data.consumed = '01/01/1900';
// }

// let bottles: TBottles = [
// 	{
// 		Id: 1,
// 		Name: 'Barbera',
// 		Vintage: 2019,
// 		Producer: 'Becker Vineyards',
// 		Purchased: '03/01/2021',
// 		Consumed: '01/01/1900'
// 	},
// 	{
// 		Id: 2,
// 		Name: 'Barbera',
// 		Vintage: 2019,
// 		Producer: 'Becker Vineyards',
// 		Purchased: '03/01/2021',
// 		Consumed: '01/01/1900'
// 	},
// 	{
// 		Id: 3,
// 		Name: 'Barbera',
// 		Vintage: 2019,
// 		Producer: 'Becker Vineyards',
// 		Purchased: '03/01/2021',
// 		Consumed: '01/01/1900'
// 	}
// ];

export const actions: Actions = {
	newBottle: async (event) => {
		const form = await superValidate(event, bottleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const bottle: TBottle = {
			Id: bottleIdGen(),
			Name: form.data.Name,
			Vintage: form.data.Vintage,
			Producer: form.data.Producer,
			Purchased: form.data.Purchased ? form.data.Purchased : '01/01/1900',
			Consumed: form.data.Consumed ? form.data.Consumed : '01/01/1900'
		};
		bottles.push(bottle);
		//resetForm(form.data);
		return {
			form
		};
	}
};
