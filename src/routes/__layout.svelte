<script>
	import '../tailwind.css';
	import Header from '../components/header.svelte';
	import Card from '../components/card.svelte';
	import Chat from '../components/chat.svelte';
	import Menu from '../components/menu.svelte';

	import { onMount } from 'svelte';
	import { user, setUserFromJWT } from '../stores/user';

	let loaded = false;

	// Log the user in if there is an auth token in localStorage
	onMount(() => {
		if ($user) return;
		const token = localStorage.getItem('auth-token');
		if (token) {
			setUserFromJWT(token);
		}
		loaded = true;
	});
</script>

<div class="wrapper">
	<div class="bg absolute w-full h-full bg-no-repeat bg-center bg-cover -z-10" />
	<Header />
	<div class="flex w-full justify-center  -mt-16">
		<Card>
			<Menu>
				{#if $user || loaded}
					<slot />
				{/if}
			</Menu>
		</Card>
		<Card>
			<Chat />
		</Card>
	</div>
</div>

<style>
	.bg {
		background-image: url('./bg-1.svg');
	}
</style>
