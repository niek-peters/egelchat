<script>
	import Master from '../components/general/master.svelte';
	import MainPanels from '../components/general/mainPanels.svelte';
	import Menu from '../components/menu/menu.svelte';
	import Chat from '../components/main/chat.svelte';
</script>

<Master>
	<MainPanels>
		<div slot="menu">
			<Menu>
				<slot />
			</Menu>
		</div>
		<div slot="main" />
	</MainPanels>
</Master>
