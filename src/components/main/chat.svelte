<script lang="ts">
	import { onMount } from 'svelte';
	import { messages, setMessages, addMessage } from '../../stores/messages';
	import type { Chat } from '../../models/chat';
	import type { Message } from '../../models/message';
	import ChatContainer from '../../components/main/chatContainer.svelte';
	import MessageEl from '../../components/main/message.svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';

	import socket from '../../connections/socket';
	import { setCurrentChat } from '../../stores/currentChat';
	import { user } from '../../stores/user';

	export let chat: Chat;
	export let chatMessages: Message[];

	$: {
		console.log(chat);
		setCurrentChat(chat);

		socket.emit('chat_join', chat.uuid);

		// Code to rerun when the props change
		setMessages(chatMessages);

		if (scrollDiv) scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
	}

	onMount(() => {
		scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
	});

	socket.off('message');
	socket.on('message', (message: Message) => {
		if ($user && message.sender_uuid !== $user.uuid) {
			console.log(message);
			addMessage(message);
		}
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
