import { writable } from 'svelte/store';

export const settingsNav = writable<string | undefined>();

export function setSettingsNav(nav: string) {
	settingsNav.set(nav);
}

export function resetSettingsNav() {
	settingsNav.set(undefined);
}
