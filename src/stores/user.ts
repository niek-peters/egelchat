import { writable } from 'svelte/store';
import type User from '../models/user';

export const user = writable<User | undefined>();

export function setUser(loggedInUser: User) {
	user.update(() => loggedInUser);
}

export function resetUser() {
	user.set(undefined);
}
