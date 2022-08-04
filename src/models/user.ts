import * as jose from 'jose';

type User = {
	uuid: string;
	name: string;
	email: string;
	pf_pic?: string;
};

export default User;

export type UserFull = {
	uuid: string;
	name: string;
	email: string;
	password: string;
	pf_pic?: string;
};

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
