<script lang="ts">
	import Fa from 'svelte-fa';
	import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '$app/env';
	import type User from '../../models/user';
	import { login } from '../../models/user';

	export let user: User;

	let usernameErr: string;
	let passwordErr: string;
	let pfPicErr: string;

	let newUsername: string;
	let password: string;
	let newPassword: string;
	let pfPicUrl: string;

	let usernameChanged: boolean = false;
	let passwordChanged: boolean = false;

	async function changeUsername() {
		if (!browser) return;
		try {
			if (!newUsername) throw new Error('Please enter a new username');

			let token = localStorage.getItem('auth-token');
			if (!token || token === 'undefined')
				throw new Error('Could not authenticate you, maybe try logging out and logging back in?');

			const response = await fetch('http://127.0.0.1:3000/api/users', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: token as string
				},
				body: JSON.stringify({
					uuid: user.uuid,
					name: newUsername
				})
			});

			if (response.status !== 200) throw new Error(await response.text());

			// Reset all inputs and errors
			newUsername = usernameErr = '';

			// Login
			login(response.headers.get('Authorization'));

			usernameChanged = true;

			setTimeout(() => {
				usernameChanged = false;
			}, 2000);
		} catch (er) {
			if (er instanceof Error) {
				usernameChanged = false;
				usernameErr = er.message;

				setTimeout(() => {
					usernameErr = '';
				}, 2000);
			}
		}
	}

	async function changePassword() {
		if (!browser) return;
		try {
			if (!(password && newPassword)) throw new Error('Please fill in all fields');

			let token = localStorage.getItem('auth-token');
			if (!token || token === 'undefined')
				throw new Error('Could not authenticate you, maybe try logging out and logging back in?');

			const response = await fetch('http://127.0.0.1:3000/api/users', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: token as string
				},
				body: JSON.stringify({
					uuid: user.uuid,
					password: password,
					new_password: newPassword
				})
			});

			if (response.status !== 200) throw new Error(await response.text());

			// Reset all inputs and errors
			password = newPassword = passwordErr = '';

			// Login
			login(response.headers.get('Authorization'));

			passwordChanged = true;

			setTimeout(() => {
				passwordChanged = false;
			}, 2000);
		} catch (er) {
			if (er instanceof Error) {
				passwordChanged = false;
				passwordErr = er.message;

				setTimeout(() => {
					passwordErr = '';
				}, 2000);
			}
		}
	}

	async function changePfPic() {
		if (!browser) return;
		try {
			if (!pfPicInput.files) throw new Error('Please choose a new profile picture');

			let token = localStorage.getItem('auth-token');
			if (!token || token === 'undefined')
				throw new Error('Could not authenticate you, maybe try logging out and logging back in?');

			const formData = new FormData();
			formData.append('pf_pic', pfPicInput.files[0]);

			const response = await fetch('http://127.0.0.1:3000/api/images', {
				method: 'PUT',
				headers: {
					Authorization: token as string
				},
				body: formData
			});

			if (response.status !== 200) throw new Error(await response.text());

			// Reset all inputs and errors
			pfPicUrl = pfPicErr = '';

			// Login
			login(response.headers.get('Authorization'));
		} catch (er) {
			if (er instanceof Error) {
				// Find the message in the html (I know it's stupid)
				if (er.message.includes('<')) pfPicErr = betweenMarkers(er.message, '<pre>Error: ', '<br>');
				else pfPicErr = er.message;

				setTimeout(() => {
					pfPicErr = '';
				}, 2000);
			}
		}
	}

	function betweenMarkers(text: string, begin: string, end: string): string {
		var firstChar = text.indexOf(begin) + begin.length;
		var lastChar = text.indexOf(end);
		var newText = text.substring(firstChar, lastChar);
		return newText;
	}

	function updateImgPreview() {
		if (!pfPicInput.files) return;

		const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
		if (!acceptedImageTypes.includes(pfPicInput.files[0].type)) {
			pfPicUrl = 'https://static.thenounproject.com/png/586340-200.png';
			return;
		}

		pfPicUrl = URL.createObjectURL(pfPicInput.files[0]);
	}

	let pfPicInput: HTMLInputElement;
</script>

<form
	class="flex p-8 items-center justify-center bg-gray-200/50 rounded-md"
	on:submit|preventDefault={changePfPic}
	enctype="multipart/form-data"
>
	<div class="flex flex-col items-center">
		<h2 class="text-4xl mr-8 mb-2"><b>{user.name}</b></h2>
		<h4 class="text-xl mr-8">{user.uuid}</h4>
	</div>
	<button
		type="button"
		class={`flex outline-none items-center justify-center relative rounded-full bg-blue-300 ${
			pfPicUrl ? '' : 'hover:bg-blue-400'
		} mx-4 w-36 h-36 transition`}
		on:click={() => pfPicInput.click()}
	>
		<input
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png"
			bind:this={pfPicInput}
			on:change={updateImgPreview}
		/>
		{#if pfPicErr}
			<p
				class="flex items-center justify-center p-4 rounded-full overflow-hidden w-36 h-36 bg-red-400 border-red-500 border-2 text-lg"
			>
				{pfPicErr}
			</p>
		{:else if pfPicUrl}
			<img
				src={pfPicUrl}
				alt="pf pic"
				class="rounded-full overflow-hidden w-36 h-36 object-cover"
			/>
		{:else if user.pf_pic}
			<img
				src={user.pf_pic}
				alt="pf pic"
				class="rounded-full overflow-hidden w-36 h-36 object-cover"
			/>
		{:else}
			<Fa icon={faPlus} class="text-7xl" />
		{/if}

		<button
			class={`flex outline-none items-center justify-center absolute top-24 left-24 p-2 text-md rounded-full m-2 text-white bg-green-400 hover:bg-green-500 w-12 h-12 transition ${
				pfPicUrl ? 'opacity-100' : 'opacity-0'
			}`}
			on:click|stopPropagation><Fa icon={faCheck} class="text-3xl" /></button
		>
	</button>
</form>
<div class="flex flex-col items-center mt-6">
	<h2 class="text-3xl font-semibold">Edit my profile</h2>
	<div class="flex justify-between w-4/5 mt-4">
		<form class="flex flex-col items-center" on:submit|preventDefault={changeUsername}>
			<h4 class="text-xl mb-4">Change username:</h4>
			<input
				class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
				type="text"
				placeholder="New username"
				required
				bind:value={newUsername}
				minlength="3"
				maxlength="24"
			/>
			<button
				class="p-4 text-xl rounded-md m-2 text-white bg-blue-400 hover:bg-blue-500 transition w-72"
				>Submit</button
			>
			{#if usernameErr}
				<p
					class="flex justify-center p-4 text-xl rounded-md m-2 bg-red-400 border-red-500 border-2 w-72"
				>
					{usernameErr}
				</p>
			{:else if usernameChanged}
				<p
					class="flex justify-center p-4 text-xl rounded-md m-2 bg-green-400 border-green-500 border-2 w-72"
				>
					Username changed!
				</p>
			{/if}
		</form>
		<form class="flex flex-col items-center" on:submit|preventDefault={changePassword}>
			<h4 class="text-xl mb-4">Change password:</h4>
			<input
				class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
				type="password"
				placeholder="Password"
				required
				bind:value={password}
				minlength="3"
				maxlength="255"
			/><input
				class="p-4 text-xl rounded-md m-2 outline-none border-transparent focus:border-gray-400 border-2 transition w-72"
				type="password"
				placeholder="New password"
				required
				bind:value={newPassword}
				minlength="3"
				maxlength="255"
			/>
			<button
				class="flex justify-center p-4 text-xl rounded-md m-2 text-white bg-blue-400 hover:bg-blue-500 transition w-72"
				>Submit</button
			>
			{#if passwordErr}
				<p class="p-4 text-xl rounded-md m-2 bg-red-400 border-red-500 border-2 w-72">
					{passwordErr}
				</p>
			{:else if passwordChanged}
				<p
					class="flex justify-center p-4 text-xl rounded-md m-2 bg-green-400 border-green-500 border-2 w-72"
				>
					Password changed!
				</p>
			{/if}
		</form>
	</div>
</div>
