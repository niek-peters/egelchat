<script>
	import Master from '../components/general/master.svelte';

	import { onMount } from 'svelte';
	import MainPanels from '../components/general/mainPanels.svelte';
	import Menu from '../components/menu/menu.svelte';
	import ChatList from '../components/menu/chatList.svelte';
	import You from '../components/menu/you.svelte';
	import LoginSelect from '../components/menu/loginSelect.svelte';

	import { user } from '../stores/user';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

<Master>
	<MainPanels>
		<div slot="menu">
			<Menu>
				{#if $user}
					<ChatList />
					<You user={$user} />
				{:else if loaded}
					<LoginSelect />
				{/if}
			</Menu>
		</div>
		<div slot="main">
			<slot />
		</div>
	</MainPanels>
</Master>
