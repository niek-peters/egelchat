<script lang="ts">
	import ChatList from './chatList.svelte';
	import You from './you.svelte';
	import LoginSelect from './loginSelect.svelte';

	import type User from '../models/user';

	// TO DO: Get current user

	// let user: User = {
	// 	uuid: '1',
	// 	name: 'John Doe',
	// 	pf_pic: 'https://i.pravatar.cc/300'
	// };

	let user = undefined;
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Menu</h1>

<article class="flex flex-col items-center">
	{#if user}
		<ChatList />
		<You {user} />
	{:else}
		<LoginSelect />
	{/if}
</article>

<style lang="scss">
	article {
		width: 24vw;
		height: 75vh;
	}
</style>
