import { writable } from 'svelte/store';
import type { Chat } from '../models/chat';

export const currentChat = writable<Chat>();

export async function setCurrentChat(chat: Chat) {
	currentChat.set(chat);
}

