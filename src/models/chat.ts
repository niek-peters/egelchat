export type Chat = {
	uuid: string;
	owner_uuid: string;
	name: string;
};

export type ChatDB = {
	uuid: Buffer;
	owner_uuid: Buffer;
	name: string;
};

export default Chat;
