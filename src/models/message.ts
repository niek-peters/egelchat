export type Message = {
	chat_uuid: string;
	sender_uuid: string;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export type MessageDB = {
	chat_uuid: Buffer;
	sender_uuid: Buffer;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export type MessageDBRes = {
	id: number;
	chat_uuid: Buffer;
	sender_uuid: Buffer;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export default Message;
