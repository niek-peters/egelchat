<script lang="ts">
	import { onMount } from 'svelte';
	import ChatList from '../components/chatList.svelte';
	import You from '../components/you.svelte';
	import LoginSelect from '../components/loginSelect.svelte';
	import MainPanels from '../components/mainPanels.svelte';
	import ChatContainer from '../components/chatContainer.svelte';
	import Menu from '../components/menu.svelte';
	import Chat from '../components/chat.svelte';

	import { user } from '../stores/user';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

<MainPanels>
	<div slot="menu">
		<Menu>
			{#if $user && loaded}
				<ChatList />
				<You user={$user} />
			{:else if loaded}
				<LoginSelect />
			{/if}
		</Menu>
	</div>
	<div slot="main">
		<ChatContainer>
			<Chat />
		</ChatContainer>
	</div>
</MainPanels>
