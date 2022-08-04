import { writable } from 'svelte/store';
import type { Message } from '../models/message';

export const messages = writable<Message[]>([]);

export function setMessages(newMessages: Message[]) {
	messages.set(newMessages);
}

export function addMessage(message: Message): void {
	messages.update((messages) => [...messages, message]);
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
