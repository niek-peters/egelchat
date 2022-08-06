<script lang="ts">
	import { onMount } from 'svelte';
	import Master from '../components/general/master.svelte';
	import MainPanels from '../components/general/mainPanels.svelte';
	import Menu from '../components/menu/menu.svelte';
	import ChatStatus from '../components/main/chatStatus.svelte';
	import checkConnection from '../connections/checkConnection';

	let connected: boolean;

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
			</Menu>
		</div>
		<div slot="main">
			{#if connected === false}
				<ChatStatus status="disconnected" />
			{:else}
				<ChatStatus status="locked" />
			{/if}
		</div>
	</MainPanels>
</Master>
