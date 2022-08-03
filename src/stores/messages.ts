import { writable } from 'svelte/store';
import type Message from '../models/message';

export const messages = writable<Message[]>([]);

export function addMessage(message: Message): void {
	messages.update((messages) => [...messages, message]);
}

export function updateMessage(message: Message): void {
	messages.update((messages) => messages.map((m) => (m.uuid === message.uuid ? message : m)));
}

export function removeMessage(message: Message): void {
	messages.update((messages) => messages.filter((m) => m.uuid !== message.uuid));
}

export function clearMessages(): void {
	messages.set([]);
}
