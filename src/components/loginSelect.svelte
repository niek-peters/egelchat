<script>
	import Fa from 'svelte-fa';
	import { faArrowRightToBracket, faIdCard } from '@fortawesome/free-solid-svg-icons';

	function toggleLogin() {
		state = 'login';
	}

	function toggleRegister() {
		state = 'register';
	}

	let state = '';
</script>

{#if !state}
	<p class="text-center text-2xl mt-4 mb-2">Log in to start chatting!</p>
	<button
		on:click={toggleLogin}
		class="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 p-2 mb-4 w-32 text-xl rounded-md"
		><Fa icon={faArrowRightToBracket} class="text-2xl mr-2" />Login</button
	>
	<p class="text-center text-2xl mt-4 mb-2">Or create a new account</p>
	<button
		on:click={toggleRegister}
		class="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 p-2 mb-4 w-32 text-xl rounded-md"
		><Fa icon={faIdCard} class="text-2xl mr-2" />Register</button
	>
{:else if state == 'login'}
	<form class="flex flex-col items-center w-full">
		<input
			class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition"
			type="text"
			name="username"
			placeholder="Username"
		/>
		<input
			class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition"
			type="email"
			name="email"
			placeholder="Email"
		/>
		<input
			class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition"
			type="password"
			name="password"
			placeholder="Password"
		/>
	</form>
{:else if state == 'register'}{/if}
