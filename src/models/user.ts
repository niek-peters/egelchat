import * as jose from 'jose';

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

export function userFromJWT(token: string): User {
	const data = jose.decodeJwt(token);

	// Return the data stored in the token as a user object
	return {
		uuid: data.uuid as string,
		name: data.name as string,
		email: data.email as string,
		pf_pic: data.pf_pic as string
	};
}
