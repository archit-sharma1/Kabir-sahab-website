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

/** Text used by Copy-all and Share: the doha, its meaning and attribution. */
export function shareText(d: { id: number; text: string; meaning: string }): string {
	return `${d.text}\n\n${d.meaning}\n— Kabir Saheb, Doha ${d.id}`;
}
