<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let link: string = '/';

	function nav() {
		if ($page.url.pathname !== '/settings') {
			link = '/settings';
		} else link = '/';
		goto(link);
	}

	import type User from '../../models/user';
	export let user: User;
</script>

<button
	on:click={nav}
	class="flex items-center w-full h-20 mt-auto bg-blue-400 hover:bg-blue-500 transition"
>
	<div
		class="flex items-center justify-center rounded-full overflow-hidden bg-blue-300 mx-4 w-14 h-14"
	>
		{#if user.pf_pic}
			<img src={user.pf_pic} alt="pf pic" />
		{:else}
			<Fa icon={faUser} class="text-2xl" />
		{/if}
	</div>
	<h3 class="text-xl">{user.name}</h3>
	<Fa icon={faGear} class="text-4xl ml-auto mr-4" />
</button>
