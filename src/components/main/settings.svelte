<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import MyAccount from '../settings/myAccount.svelte';

	import { settingsNav } from '../../stores/settingsNav';
	import { user } from '../../stores/user';
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Settings</h1>
<article class="p-4">
	{#if $user && $settingsNav}
		{#if $settingsNav === 'My Account'}
			<MyAccount user={$user} />
		{:else if $settingsNav === 'Danger Zone'}
			<div>
				<h2>Username: {$user.name}</h2>
				<div
					class="flex items-center justify-center rounded-full overflow-hidden bg-blue-300 mx-4 w-14 h-14"
				>
					{#if $user.pf_pic}
						<img src={$user.pf_pic} alt="pf pic" />
					{:else}
						<Fa icon={faUser} class="text-2xl" />
					{/if}
				</div>
			</div>
		{/if}
	{/if}
</article>

<style>
	article {
		width: 50vw;
		height: 75vh;
	}
</style>
