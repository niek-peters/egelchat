<script>
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';

	import { settingsNav } from '../../stores/settingsNav';
	import { user } from '../../stores/user';
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Settings</h1>
<article class="p-4">
	{#if $user && $settingsNav}
		{#if $settingsNav === 'My Account'}
			<div class="flex p-8 items-center justify-center bg-gray-200/50 rounded-md">
				<div class="flex flex-col items-center">
					<h2 class="text-4xl mr-8 mb-2"><b>{$user.name}</b></h2>
					<h4 class="text-xl mr-8">{$user.uuid}</h4>
				</div>
				<div
					class="flex items-center justify-center rounded-full overflow-hidden bg-blue-300 mx-4 w-36 h-36"
				>
					{#if $user.pf_pic}
						<img src={$user.pf_pic} alt="pf pic" />
					{:else}
						<Fa icon={faUser} class="text-7xl" />
					{/if}
				</div>
			</div>
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
