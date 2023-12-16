/* eslint-disable @typescript-eslint/no-unused-vars */
import type { BottleDB } from './schemas';

//type BottleDB = z.infer<typeof bottleSchema>[];

// Let's worry about id collisions later
export function bottleIdGen() {
	return String(Math.random()).slice(2);
}

// A simple user "database"
// function maxId(tmpBottles: BottleDB): number {
// 	const maxId = tmpBottles.reduce((max, bottle) => Math.max(max, bottle.Id), 0);
// 	return maxId;
// }

export const bottles: BottleDB = [
	{
		Id: bottleIdGen(),
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	},
	{
		Id: bottleIdGen(),
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	},
	{
		Id: bottleIdGen(),
		Name: 'Barbera',
		Vintage: 2019,
		Producer: 'Becker Vineyards',
		Purchased: '03/01/2021',
		Consumed: '01/01/1900'
	}
];
