<script lang="ts">
	import Line from '../general/line.svelte';
	import ChatButton from './chatButton.svelte';
	import type { Chat } from '../../models/chat';

	async function getChats() {
		try {
			const result = await fetch('http://127.0.0.1:3000/api/chats');
			const chats: Chat[] = await result.json();
			return chats;
		} catch (er) {
			console.error(er);
		}
	}
</script>

<div class="flex flex-col w-full p-4">
	<h2 class="text-2xl font-semibold">Chats</h2>
	<Line />
	<nav class="flex flex-col">
		{#await getChats() then chats}
			{#if chats}
				{#each chats as chat}
					<ChatButton {chat} />
				{/each}
			{/if}
		{/await}
	</nav>
</div>
