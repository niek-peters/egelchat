<script context="module" lang="ts">
	import type { Chat } from '../../models/chat';
	import type { Message, MessageRes } from '../../models/message';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		try {
			let response = await fetch(`http://127.0.0.1:3000/api/chats/${params.uuid}`);
			const chat: Chat = await response.json();

			response = await fetch(`http://127.0.0.1:3000/api/messages/${chat.uuid}`);
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
	import { messages, setMessages, addMessage } from '../../stores/messages';
	import ChatContainer from '../../components/chatContainer.svelte';
	import MessageEl from '../../components/message.svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import socket from '../../sockets/socket';

	export let chat: Chat;
	export let chatMessages: Message[];

	setMessages(chatMessages);

	socket.on('message', (message: Message) => {
		addMessage(message);
	});

	let scrollDiv: HTMLDivElement;
	let autoscroll: boolean;

	// Get scrollheight before update, to determine if the user is scrolled to the bottom
	beforeUpdate(() => {
		autoscroll =
			scrollDiv && scrollDiv.offsetHeight + scrollDiv.scrollTop > scrollDiv.scrollHeight - 20;
	});

	// Update the scrollheight when the chat updates, but only if the user is scrolled to the bottom
	afterUpdate(() => {
		console.log(scrollDiv.scrollTop);
		if (autoscroll) scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
	});
</script>

<ChatContainer>
	<h1 slot="chat-header" class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">
		{#if chat}
			{chat.name}
		{:else}
			General
		{/if}
	</h1>
	<div slot="messages" class="messages w-full overflow-y-auto" bind:this={scrollDiv}>
		{#each $messages as message}
			<MessageEl {message} />
		{/each}
	</div>
</ChatContainer>

<style lang="scss">
	.messages {
		/* width */
		&::-webkit-scrollbar {
			width: 0.4rem;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: #999;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: #888;
		}
	}
</style>
