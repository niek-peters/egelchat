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
