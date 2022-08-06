import { writable } from 'svelte/store';
import type { Chat } from '../models/chat';

export const currentChat = writable<Chat | undefined>();

export async function setCurrentChat(chat?: Chat) {
	currentChat.set(chat);
}
