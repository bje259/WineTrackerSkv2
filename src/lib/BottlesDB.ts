/* eslint-disable @typescript-eslint/no-unused-vars */
import { getYear } from 'date-fns';
import { z } from 'zod';

// See https://zod.dev/?id=primitives for schema syntax
export const bottleSchema = z.object({
	Id: z.string().regex(/^\d+$/),
	Name: z
		.string()
		.min(1, { message: 'Name cannot be empty' })
		.max(30, { message: 'Name cannot be longer than 30 characters' }),
	Producer: z
		.string()
		.min(1, { message: 'Producer cannot be empty' })
		.max(30, { message: 'Producer cannot be longer than 30 characters' }),
	Vintage: z
		.number()
		.min(1900, { message: 'Vintage must be after 1900' })
		.max(getYear(new Date()), { message: 'Vintage must be before the current year' })
		.default(2023),
	Purchased: z
		.string()
		.refine((v) => v)
		.optional(),
	Consumed: z
		.string()
		.refine((v) => v)
		.optional()
});

export type BottleDB = z.infer<typeof bottleSchema>[];

// Let's worry about id collisions later
export const bottleId = () => String(Math.random()).slice(2);

// A simple user "database"

function maxId(tmpBottles: TBottles): number {
	const maxId = tmpBottles.reduce((max, bottle) => Math.max(max, bottle.Id), 0);
	return maxId;
}

export const bottles: BottleDB = [
	{
		Id: '1',
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	},
	{
		Id: '2',
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	},
	{
		Id: bottleId(),
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	}
];