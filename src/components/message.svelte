<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';

	type User = {
		id: string;
		name: string;
		pf_pic?: string;
	};

	export let user: User;
	export let dateTime: string;
	export let message: string;
</script>

<div class="bg-blue-300 p-4 max-w-3xl rounded-xl rounded-tl-none m-4">
	<header class="flex items-center w-full mb-2">
		<a
			href="https://www.minecraft.net/nl-nl"
			class="rounded-full p-2.5 overflow-hidden bg-blue-400 mr-2"
		>
			<Fa icon={faUser} class="text-2xl" />
		</a>
		<h3 class="text-xl">{user.name}</h3>
		<h2 class="ml-auto mr-2">{dateTime}</h2>
	</header>
	<p>
		{message}
	</p>
</div>
