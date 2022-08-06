<script lang="ts">
	import { currentChat } from '../../stores/currentChat';
	import type { Chat } from '../../models/chat';
	export let chat: Chat;
</script>

<a
	class="flex bg-gray-200/50 hover:bg-gray-200/100 m-1 transition rounded-md overflow-hidden"
	href={`/chats/${chat.uuid}`}
>
	<p class="m-2">{chat.name}</p>
	<div
		class={`h-full w-4 ml-auto ${
			$currentChat && chat.uuid == $currentChat.uuid ? 'bg-blue-400' : ''
		}`}
	/>
</a>
