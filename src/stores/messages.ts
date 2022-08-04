import { writable } from 'svelte/store';
import type { Message, MessageFull } from '../models/message';

export const messages = writable<MessageFull[]>([]);

export async function setMessages(newMessages: Message[]) {
	try {
		const newMessagesFull = await Promise.all(
			newMessages.map(async (message) => {
				const fullMessage = await getFullMessage(message);
				if (!fullMessage) throw new Error('Could not get full message information');
				return fullMessage;
			})
		);
		messages.set(newMessagesFull);
	} catch (er) {
		console.error(er);
	}
}

export async function addMessage(message: Message) {
	try {
		const messageFull = await getFullMessage(message);
		if (!messageFull) throw new Error('Could not get full message information');
		messages.update((messages) => [...messages, messageFull]);
	} catch (er) {
		console.error(er);
	}
}

async function getFullMessage(message: Message): Promise<MessageFull | undefined> {
	try {
		const response = await fetch(`http://127.0.0.1:3000/api/users/${message.sender_uuid}`);
		const data = await response.json();
		const sender = data;

		const messageFull: MessageFull = {
			chat_uuid: message.chat_uuid,
			sender_uuid: message.sender_uuid,
			content: message.content,
			sent_at: message.sent_at,
			sender_name: sender.name,
			sender_pf_pic: sender.pf_pic
		};

		return messageFull;
	} catch (er) {
		console.error(er);
	}
	return;
}

// export function updateMessage(message: MessageRes): void {
// 	messages.update((messages) => messages.map((m) => (m.id === message.id ? message : m)));
// }

// export function removeMessage(message: MessageRes): void {
// 	messages.update((messages) => messages.filter((m) => m.id !== message.id));
// }

export function clearMessages(): void {
	messages.set([]);
}
