<script>
	import '../tailwind.css';
	import Header from '../components/header.svelte';
	import Card from '../components/card.svelte';
	import Chat from '../components/chat.svelte';
	import Menu from '../components/menu.svelte';
</script>

<div class="wrapper">
	<div class="bg absolute w-full h-full bg-no-repeat bg-center bg-cover -z-10" />
	<Header />
	<div class="flex w-full justify-center  -mt-16">
		<Card>
			<Menu>
				<slot />
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
