<script lang="ts">
	import ChatList from '../components/chatList.svelte';
	import You from '../components/you.svelte';
	import LoginSelect from '../components/loginSelect.svelte';

	import { user } from '../stores/user';
</script>

{#if $user}
	<ChatList />
	<You user={$user} />
{:else}
	<LoginSelect />
{/if}
