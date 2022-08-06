import * as jose from 'jose';
import { setUser } from '../stores/user';
import socket from '../connections/socket';
import { setMessages } from '../stores/messages';

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
		// Check if a token was provided
		if (!token || token === 'undefined') return;

		// Try to decode the token
		const { uuid, name, email, pf_pic } = jose.decodeJwt(token);

		// If we get here, it means it is a valid token
		// Put the token in localStorage if available
		if (localStorage) localStorage.setItem('auth-token', token);

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

		// Setup error reporting
		// socket.on('connect_error', (err) => {
		// 	// console.error(err);
		// });

		// Fetch all messages from the database
		// const defaultChatUUID = 'acdf90a0-1408-11ed-8f13-436d0cf1e378';
		// const result = await fetch(`http://127.0.0.1:3000/api/messages/${defaultChatUUID}`);
		// const messages = await result.json();

		// if (!messages.length) throw new Error('No messages found');

		// // Put the messages in the store
		// setMessages(messages);
	} catch (er) {
		if (er instanceof Error) console.error(er.message);
	}
}
