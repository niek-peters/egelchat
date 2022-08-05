<script lang="ts">
	import Line from '../general/line.svelte';
	import ChatButton from './chatButton.svelte';
</script>

<div class="flex flex-col w-full p-4">
	<h2 class="text-2xl font-semibold">Your Chats</h2>
	<Line />
	<nav class="flex flex-col">
		<ChatButton uuid={'2'} name={'Chat 1'} />
		<ChatButton uuid={'3'} name={'Chat 2'} />
		<ChatButton uuid={'4'} name={'Chat 3'} />
		<ChatButton uuid={'5'} name={'Chat 4'} />
		<ChatButton uuid={'6'} name={'Chat 5'} />
		<ChatButton uuid={'7'} name={'Chat 6'} />
	</nav>
</div>
