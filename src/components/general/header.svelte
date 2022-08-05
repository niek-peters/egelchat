<script>
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<header class="flex w-full">
	<div class="logo p-3.5">
		<a
			href="https://github.com/MrValk/uitest"
			target="_blank"
			class="rounded-full flex w-fit hover:scale-105 transition"
		>
			<Fa icon={faGithub} class="icon text-5xl text-white" />
		</a>
	</div>
	<div class="flex flex-row items-center justify-between w-full p-2 h-20">
		<h1 class="text-4xl font-semibold">Egel Chat</h1>
	</div>
</header>

<style lang="scss">
	.logo {
		height: 8rem;
		width: 8rem;
		background-image: -webkit-linear-gradient(-43.5deg, black 50%, transparent 51%);
	}
</style>
