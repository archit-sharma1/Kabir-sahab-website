import { error } from '@sveltejs/kit';
import { dohas } from '#lib/dohas.js';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender one page per doha: /doha/1 … /doha/252.
export const entries: EntryGenerator = () => dohas.map((d) => ({ id: String(d.id) }));

export const load: PageLoad = ({ params }) => {
	const doha = dohas.find((d) => String(d.id) === params.id);
	if (!doha) error(404, 'Doha not found');
	return { doha };
};
