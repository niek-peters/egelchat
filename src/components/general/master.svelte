<script>
	import '../../tailwind.css';
	import Header from './header.svelte';

	import { onMount } from 'svelte';
	import { login } from '../../models/user';

	onMount(() => {
		login(localStorage.getItem('auth-token'));
	});
</script>

<div class="wrapper">
	<div class="bg absolute w-full h-full bg-no-repeat bg-center bg-cover -z-10" />
	<Header />
	<div class="flex w-full justify-center  -mt-16">
		<slot />
	</div>
</div>

<style>
	.bg {
		background-image: url('./bg-1.svg');
	}
</style>
