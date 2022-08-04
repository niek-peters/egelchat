<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import dateToString from '../models/dateTime';
	import type User from '../models/user';
	import type Message from '../models/message';
	import { user } from '../stores/user';

	export let message: Message;

	let sender: User | undefined;

	// Getting the message sender from the egelchat-api
	async function getSender(sender_id: string) {
		const response = await fetch(`http://127.0.0.1:3000/api/users/${sender_id}`);
		const data = await response.json();
		sender = data;
	}
	getSender(message.sender_uuid);
</script>

{#if sender}
	<div
		class={`bg-blue-300 p-4 max-w-3xl rounded-xl m-4 ${
			$user && $user.uuid == sender.uuid ? 'rounded-tr-none ml-auto' : 'rounded-tl-none'
		}`}
	>
		<header class="flex items-center w-full mb-2">
			<a
				href="https://www.minecraft.net/nl-nl"
				class="flex items-center justify-center rounded-full overflow-hidden bg-blue-400 mr-2 w-10 h-10"
			>
				{#if sender.pf_pic}
					<img src={sender.pf_pic} alt="pf pic" />
				{:else}
					<Fa icon={faUser} class="text-2xl" />
				{/if}
			</a>
			<h3 class="text-xl">{sender.name}</h3>
			<h2 class="ml-auto mr-2">{dateToString(new Date(message.sent_at))}</h2>
		</header>
		<p>
			{message.content}
		</p>
	</div>
{/if}
