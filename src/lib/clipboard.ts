/** Copy text, falling back to a hidden textarea where the Clipboard API is unavailable. */
export async function copyText(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.setAttribute('readonly', '');
		ta.className = 'visually-hidden-copy';
		document.body.appendChild(ta);
		ta.select();
		try {
			document.execCommand('copy');
		} catch {
			// Nothing more we can do.
		}
		ta.remove();
	}
}

/**
 * What Share sends (and copies, when the share sheet is unavailable):
 *
 *     [Hindi doha]
 *
 *     [English meaning]
 *     — Kabir Saheb
 *
 *     https://…/doha/N
 *
 * The signature has no doha number; a blank line separates it from the link.
 */
export function shareText(d: { text: string; meaning: string }, url: string): string {
	return `${d.text}\n\n${d.meaning}\n— Kabir Saheb\n\n${url}`;
}
