<script lang="ts">
	import ChatList from '../components/chatList.svelte';
	import You from '../components/you.svelte';
	import LoginSelect from '../components/loginSelect.svelte';

	import type User from '../models/user';

	// TO DO: Get current user

	// let user: User = {
	// 	uuid: '1',
	// 	name: 'John Doe',
	// 	pf_pic: 'https://i.pravatar.cc/300'
	// };

	let user: User | undefined = undefined;
</script>

{#if user}
	<ChatList />
	<You {user} />
{:else}
	<LoginSelect />
{/if}
