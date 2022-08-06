<script lang="ts">
	import checkConnection from '../../connections/checkConnection';

	let connected: boolean;

	async function ping() {
		connected = await checkConnection();
	}

	ping();
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Menu</h1>

<article class="flex flex-col items-center">
	{#if connected}
		<slot />
	{/if}
</article>

<style lang="scss">
	article {
		width: 24vw;
		height: 75vh;
	}
</style>
