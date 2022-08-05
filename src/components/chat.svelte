<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Message from './message.svelte';
	import type MessageType from '../models/message';
	import { messages, addMessage } from '../stores/messages';
	import socket from '../sockets/socket';

	socket.on('message', (message: MessageType) => {
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

<div class="messages w-full overflow-y-auto" bind:this={scrollDiv}>
	{#each $messages as message}
		<Message {message} />
	{/each}
</div>

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
