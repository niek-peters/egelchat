<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Message from './message.svelte';
	import type MessageType from '../models/message';
	import type Chat from '../models/chat';
	import { messages, addMessage } from '../stores/messages';
	import socket from '../sockets/socket';
	import ChatContainer from './chatContainer.svelte';

	socket.on('message', (message: MessageType) => {
		addMessage(message);
	});

	let scrollDiv: HTMLDivElement;
	let autoscroll: boolean;
	let chat: Chat | undefined = undefined;
	export let uuid: string = '';

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

	// Getting the chat from the egelchat-api
	async function getChat(uuid: string) {
		try {
			const response = await fetch(`http://127.0.0.1:3000/api/chats/${uuid}`);
			const data = await response.json();
			chat = data;
		} catch (er) {
			console.error(er);
		}
	}
	getChat(uuid);
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
			<Message {message} />
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
