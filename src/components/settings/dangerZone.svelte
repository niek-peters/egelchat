<script lang="ts">
	import Fa from 'svelte-fa';
	import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '$app/env';
	import { logout } from '../../models/user';
	import type User from '../../models/user';

	export let user: User;

	async function deleteAccount() {
		if (!browser) return;
		try {
			// Ask the user if they are sure
			if (confirm('Are you sure you want to delete your account?')) {
				let token = localStorage.getItem('auth-token');
				if (!token || token === 'undefined')
					throw new Error('Could not authenticate you, maybe try logging out and logging back in?');

				await fetch('http://127.0.0.1:3000/api/users', {
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json',
						Authorization: token as string
					},
					body: JSON.stringify({
						uuid: user.uuid
					})
				});

				alert('Your account has been deleted');

				// Logout the user
				setTimeout(() => {
					logout();
				}, 1000);
			}
		} catch (er) {
			if (er instanceof Error) {
				console.error(er);
			}
		}
	}
</script>

<div class="flex p-8 items-center justify-between bg-gray-200/50 rounded-md">
	<h2 class="text-2xl font-semibold">Delete my account</h2>
	<div class="flex mt-4">
		<form class="flex flex-col items-center" on:submit|preventDefault={deleteAccount}>
			<button
				class="flex items-center px-4 text-xl rounded-md m-2 text-white bg-red-400 hover:bg-red-500 transition w-72"
				><Fa icon={faTriangleExclamation} class="text-3xl mr-3" /><b class="py-4">Submit</b></button
			>
		</form>
	</div>
</div>
