import { writable } from 'svelte/store';
import type User from '../models/user';
import { userFromJWT } from '../models/user';

export const user = writable<User | undefined>();

export function setUser(loggedInUser: User) {
	user.update(() => loggedInUser);
}

export function setUserFromJWT(token: string) {
	user.update(() => userFromJWT(token));
}
