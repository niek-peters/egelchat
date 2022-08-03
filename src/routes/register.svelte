<script>
	import Fa from 'svelte-fa';
	import { faBackward } from '@fortawesome/free-solid-svg-icons';

	let username = '';
	let email = '';
	let password = '';

	function register() {}
</script>

<form class="flex flex-col items-center w-full" on:submit|preventDefault={register}>
	<h2 class="text-3xl my-4">Register</h2>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="text"
		placeholder="Username"
		bind:value={username}
	/>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="email"
		placeholder="Email"
		bind:value={email}
	/>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="password"
		placeholder="Password"
		bind:value={password}
	/>
	<button
		class="p-4 text-xl rounded-md m-2 text-white bg-blue-400 hover:bg-blue-500 transition w-72"
		>Submit</button
	>
	<a href="/" class="flex items-center text-xl m-8 hover:text-gray-600 transition"
		><Fa icon={faBackward} class="text-xl mr-2" />Go back</a
	>
</form>
