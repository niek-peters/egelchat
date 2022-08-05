<script lang="ts">
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { addMessage } from '../../stores/messages';
	import type MessageType from '../../models/message';
	import { user } from '../../stores/user';
	import { currentChat } from '../../stores/currentChat';
	import { getMySQLDateTime } from '../../models/dateTime';
	import socket from '../../sockets/socket';

	let text = '';

	function createMessage(): void {
		if (!text) return;
		if (!$user) return;

		const message: MessageType = {
			chat_uuid: $currentChat.uuid,
			sender_uuid: $user.uuid,
			content: text,
			// TO DO: Fix the timezone issue
			sent_at: getMySQLDateTime()
		};

		addMessage(message);

		// Send it to all other clients in this room
		socket.emit('message', message);

		text = '';
	}
</script>

<slot name="chat-header" />
<article class="flex flex-col items-center">
	<slot name="messages" />
	<form class="flex h-20 w-full mt-auto" on:submit|preventDefault={createMessage}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="flex-grow p-6 text-2xl outline-none border-transparent focus:border-gray-400 border-2 rounded-bl-md transition"
			type="text"
			placeholder="Start typing..."
			bind:value={text}
			autofocus
		/>
		<button class="flex items-center justify-center w-20 bg-blue-400 hover:bg-blue-500 transition"
			><Fa icon={faPaperPlane} class="text-3xl text-white" /></button
		>
	</form>
</article>

<style>
	article {
		width: 50vw;
		height: 75vh;
	}
</style>
