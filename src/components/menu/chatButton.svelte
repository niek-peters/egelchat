<script lang="ts">
	import type { Chat } from '../../models/chat';
	export let chat: Chat;
</script>

<a
	class="bg-gray-100/50 hover:bg-gray-100/100 p-2 m-1 transition rounded-md"
	href={`/chats/${chat.uuid}`}>{chat.name}</a
>
