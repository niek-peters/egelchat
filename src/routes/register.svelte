<script>
	import Fa from 'svelte-fa';
	import { faBackward } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { setUserFromJWT } from '../stores/user';

	let username = '';
	let email = '';
	let password = '';
	let error = '';

	async function register() {
		try {
			const response = await fetch('http://127.0.0.1:3000/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: username,
					email: email,
					password: password
				})
			});

			if (response.status !== 200) throw new Error(await response.text());

			// Reset all inputs and errors
			username = '';
			email = '';
			password = '';
			error = '';

			const token = response.headers.get('Authorization');

			// Put the token in local storage
			if (token) {
				localStorage.setItem('auth-token', token);

				// Put the user in the store
				setUserFromJWT(token);
			}

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

<form class="flex flex-col items-center w-full" on:submit|preventDefault={register} action="/">
	<h2 class="text-3xl my-4">Register</h2>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="text"
		placeholder="Username"
		bind:value={username}
		required
		minlength="3"
		maxlength="255"
	/>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="email"
		placeholder="Email"
		bind:value={email}
		required
		minlength="3"
		maxlength="255"
	/>
	<input
		class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
		type="password"
		placeholder="Password"
		bind:value={password}
		required
		minlength="3"
		maxlength="255"
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
