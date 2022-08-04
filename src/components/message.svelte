<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import dateToString from '../models/dateTime';
	import type User from '../models/user';
	import type Message from '../models/message';

	export let message: Message;

	let user: User | undefined;

	// Getting the message sender from the egelchat-api
	async function getSender(sender_id: string) {
		const response = await fetch(`http://127.0.0.1:3000/api/users/${sender_id}`);
		const data = await response.json();
		user = data;
	}
	getSender(message.sender_uuid);
</script>

{#if user}
	<div class="bg-blue-300 p-4 max-w-3xl rounded-xl rounded-tl-none m-4">
		<header class="flex items-center w-full mb-2">
			<a
				href="https://www.minecraft.net/nl-nl"
				class="flex items-center justify-center rounded-full overflow-hidden bg-blue-400 mr-2 w-10 h-10"
			>
				{#if user.pf_pic}
					<img src={user.pf_pic} alt="pf pic" />
				{:else}
					<Fa icon={faUser} class="text-2xl" />
				{/if}
			</a>
			<h3 class="text-xl">{user.name}</h3>
			<h2 class="ml-auto mr-2">{dateToString(new Date(message.sent_at))}</h2>
		</header>
		<p>
			{message.content}
		</p>
	</div>
{/if}
