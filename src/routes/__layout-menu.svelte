<script lang="ts">
	import { onMount } from 'svelte';
	import Master from '../components/general/master.svelte';
	import MainPanels from '../components/general/mainPanels.svelte';
	import Menu from '../components/menu/menu.svelte';
	import ChatStatus from '../components/main/chatStatus.svelte';
	import checkConnection from '../connections/checkConnection';
	import Settings from '../components/main/settings.svelte';
	import You from '../components/menu/you.svelte';

	import { settingsNav } from '../stores/settingsNav';
	import { user } from '../stores/user';

	let connected: boolean;
	let loaded = false;

	onMount(() => {
		loaded = true;
	});

	async function ping() {
		connected = await checkConnection();
	}

	ping();
</script>

<Master>
	<MainPanels>
		<div slot="menu">
			<Menu>
				<slot />
				{#if $user}
					<You user={$user} />
				{/if}
			</Menu>
		</div>
		<div slot="main">
			{#if connected === false}
				<ChatStatus status="disconnected" />
			{:else if $settingsNav}
				<Settings />
			{:else if loaded}
				<ChatStatus status="locked" />
			{:else}
				<ChatStatus />
			{/if}
		</div>
	</MainPanels>
</Master>
