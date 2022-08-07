<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import formatDate from '../../models/dateTime';
	import type { MessageFull } from '../../models/message';
	import { user } from '../../stores/user';

	export let message: MessageFull;
</script>

<div
	class={`bg-blue-300 p-4 w-fit max-w-3xl rounded-xl m-4 ${
		$user && $user.uuid == message.sender_uuid ? 'rounded-tr-none ml-auto' : 'rounded-tl-none'
	}`}
>
	<header class="flex items-center w-full mb-2">
		<a
			href="https://www.minecraft.net/nl-nl"
			class="flex items-center justify-center rounded-full overflow-hidden bg-blue-400 mr-2 w-10 h-10"
		>
			{#if message.sender_pf_pic}
				<img src={message.sender_pf_pic} alt="pf pic" />
			{:else}
				<Fa icon={faUser} class="text-2xl" />
			{/if}
		</a>
		<a href="https://www.minecraft.net/nl-nl" class="text-xl mr-4">{message.sender_name}</a>
		<h2 class="ml-auto mr-2">{formatDate(message.sent_at)}</h2>
	</header>
	<p>
		{message.content}
	</p>
</div>
