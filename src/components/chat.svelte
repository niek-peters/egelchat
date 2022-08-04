<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Message from './message.svelte';
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import type User from '../models/user';
	import type MessageType from '../models/message';
	import { messages, addMessage } from '../stores/messages';
	import { user } from '../stores/user';

	// TO DO: Get current user

	// let user: User = {
	// 	uuid: '1',
	// 	name: 'John Doe',
	// 	email: 'jarvis@gmail.com',
	// 	pf_pic: 'https://i.pravatar.cc/300'
	// };

	function createMessage(): void {
		if (!text) return;
		if (!$user) return;

		const message: MessageType = {
			uuid: '3',
			sender_uuid: $user.uuid,
			content: text,
			sent_at: new Date()
		};

		addMessage(message);
		text = '';
	}

	let scrollToBottom = () => {
		return;
	};

	onMount(() => {
		scrollToBottom = async () => {
			await tick();
			let elem = document.querySelector('.messages');
			if (elem) elem.scrollTop = elem.scrollHeight;
		};
	});

	$: $messages, scrollToBottom();

	let text = '';
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Central Chat</h1>
<article class="flex flex-col items-center">
	<div class="messages w-full overflow-y-auto">
		{#each $messages as message}
			<Message user={$user} {message} />
		{/each}
	</div>
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

<style lang="scss">
	article {
		width: 50vw;
		height: 75vh;

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
	}
</style>
