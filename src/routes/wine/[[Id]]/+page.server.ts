/* eslint-disable @typescript-eslint/no-unused-vars */
import { bottleIdGen, bottles } from '$lib/bottleDB';
import { bottleSchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { loadFlash } from 'sveltekit-flash-message/server';
//import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from '../../wine/[[Id]]/$types';
export const load = loadFlash(async ({ url, params }) => {
	const tmpId = params.Id;
	const bottle = tmpId ? bottles.find((b) => b.Id == tmpId) : null;
	if (tmpId && !bottle) console.log('Bottle not found.');
	console.log('bottle', bottle);
	if (tmpId && !bottle) throw error(404, 'Bottle not found.');

	const form = await superValidate<typeof bottleSchema, App.PageData['flash']>(bottle, bottleSchema,{
		errors:false
	}
	);
	return { form: form, bottles: bottles, debug: true };
}) satisfies PageServerLoad;

// function resetForm(data: z.infer<BottleFormSchema>): void {
// 	data.wineName = '';
// 	data.vintage = 2020;
// 	data.producer = '';
// 	data.purchased = '01/01/1900';
// 	data.consumed = '01/01/1900';
// }

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		if (data.get('error')) throw error(501);
		console.log('Post', data);
		
		const form = await superValidate<typeof bottleSchema, App.PageData['flash']>(data, bottleSchema,{
			errors:false
		}
		);
		console.log('FORM', form);

		if (!form.valid) return fail(400, { form });
		
		//throw error(500);

    if (!form.data.Id) {
      // CREATE user
      const bottle = { ...form.data, id: bottleIdGen() };
      bottles.push(bottle);
      throw redirect(
        //'?id=' + user.id,
        {
          type: 'success',
          message: 'bottle created!'
        },
        event
      );
    } else {
      // UPDATE user
      const bottle = bottles.find((b) => b.Id == form.data.Id);
      if (!bottle) throw error(404, 'Bottle not found.');

      bottles[bottles.indexOf(bottle)] = { ...form.data, Id: bottle.Id };

      form.message = {
        type: 'success',
        message: 'Bottle updated!'
      };
      return { form };
    }
  }
} satisfies Actions;
