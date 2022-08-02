<script>
	import '../tailwind.css';
	import Header from '../components/header.svelte';
</script>

<div class="wrapper">
	<div class="bg absolute w-full h-full bg-no-repeat bg-center bg-cover -z-10" />
	<Header />
	<slot />
</div>

<style>
	.bg {
		background-image: url('./bg-1.svg');
	}
</style>
