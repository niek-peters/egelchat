<script lang="ts">
	import MyAccount from '../settings/myAccount.svelte';
	import DangerZone from '../settings/dangerZone.svelte';

	import { settingsNav } from '../../stores/settingsNav';
	import { user } from '../../stores/user';
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Settings</h1>
<article class="p-4">
	{#if $user && $settingsNav}
		{#if $settingsNav === 'My Account'}
			<MyAccount user={$user} />
		{:else if $settingsNav === 'Danger Zone'}
			<DangerZone user={$user} />
		{/if}
	{/if}
</article>

<style>
	article {
		width: 50vw;
		height: 75vh;
	}
</style>
