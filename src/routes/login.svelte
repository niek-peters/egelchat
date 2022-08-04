<script>
	import Fa from 'svelte-fa';
	import { faBackward } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { login } from '../models/user';

	let email = '';
	let password = '';
	let error = '';

	async function loginProcess() {
		try {
			const response = await fetch('http://127.0.0.1:3000/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});

			if (response.status !== 200) throw new Error(await response.text());

			// Reset all inputs and errors
			email = password = error = '';

			// Login
			login(response.headers.get('Authorization'));

			// Redirect to the homepage
			goto('/');
		} catch (er) {
			if (er instanceof Error) {
				console.log(er.message);
				error = er.message;
			}
		}
	}
</script>

<form class="flex flex-col items-center w-full" on:submit|preventDefault={loginProcess}>
	<h2 class="text-3xl my-4">Login</h2>
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
	{#if error}
		<p class="p-4 text-xl rounded-md m-2 bg-red-400 border-red-500 border-2 w-72">
			{error}
		</p>
	{/if}
	<a href="/" class="flex items-center text-xl m-8 hover:text-gray-600 transition"
		><Fa icon={faBackward} class="text-xl mr-2" />Go back</a
	>
</form>
