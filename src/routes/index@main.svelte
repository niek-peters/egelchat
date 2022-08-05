<script context="module" lang="ts">
	import type { Chat as ChatType } from '../models/chat';
	import type { Message, MessageRes } from '../models/message';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		try {
			const generalChatUUID = 'acdf90a0-1408-11ed-8f13-436d0cf1e378';

			let response = await fetch(`http://127.0.0.1:3000/api/chats/${generalChatUUID}`);

			if (response.status !== 200) throw new Error(await response.text());

			const chat: ChatType = await response.json();

			response = await fetch(`http://127.0.0.1:3000/api/messages/${chat.uuid}`);

			// If there aren't any messages, return an empty array for the messages
			if (response.status !== 200)
				return {
					props: {
						chat,
						chatMessages: []
					}
				};

			const messagesRes: MessageRes[] = await response.json();

			const messages: Message[] = messagesRes.map((messageRes) => {
				return {
					chat_uuid: messageRes.chat_uuid,
					sender_uuid: messageRes.sender_uuid,
					content: messageRes.content,
					sent_at: messageRes.sent_at
				};
			});

			return {
				props: {
					chat,
					chatMessages: messages
				}
			};
		} catch (er) {
			console.error(er);
		}
	};
</script>

<script lang="ts">
	import Chat from '../components/main/chat.svelte';
	import { setCurrentChat } from '../stores/currentChat';

	export let chat: ChatType;
	export let chatMessages: Message[];

	setCurrentChat(chat);
</script>

<Chat {chat} {chatMessages} />
