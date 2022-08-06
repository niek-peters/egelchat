import * as jose from 'jose';
import { setUser, resetUser } from '../stores/user';
import { resetSettingsNav } from '../stores/settingsNav';
import socket from '../connections/socket';
import { browser } from '$app/env';
import { goto } from '$app/navigation';

export type User = {
	uuid: string;
	name: string;
	email: string;
	pf_pic?: string;
};

export type UserLogin = {
	email: string;
	password: string;
};

export type UserDB = {
	uuid: Buffer;
	name: string;
	email: string;
	password: string;
	pf_pic?: string;
};

export default User;

export async function login(token: string | null) {
	try {
		if (!browser) return;

		// Check if a token was provided
		if (!token || token === 'undefined') return;

		// Try to decode the token
		const { uuid, name, email, pf_pic } = jose.decodeJwt(token);

		// If we get here, it means it is a valid token
		// Put the token in localStorage
		localStorage.setItem('auth-token', token);

		// Get the the user data from the token
		const user: User = {
			uuid: uuid as string,
			name: name as string,
			email: email as string,
			pf_pic: pf_pic as string
		};

		// Put the user in the store
		setUser(user);

		// Put the token in the socket auth object and (re)connect
		socket.auth = { jwt: token };
		socket.connect();
	} catch (er) {
		if (er instanceof Error) console.error(er.message);
	}
}

export function logout() {
	try {
		if (!browser) return;

		localStorage.setItem('auth-token', 'undefined');

		// Reset the user store
		resetUser();

		// Reset the settingsNav store
		resetSettingsNav();

		// Disconnect from the socket
		socket.disconnect();

		// Redirect to the homepage
		goto('/');
	} catch (er) {
		if (er instanceof Error) console.error(er.message);
	}
}
