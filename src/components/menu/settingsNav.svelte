<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faBackward,
		faUser,
		faArrowRightFromBracket,
		faTriangleExclamation
	} from '@fortawesome/free-solid-svg-icons';

	import Line from '../general/line.svelte';
	import SettingsNavButton from './settingsNavButton.svelte';

	import { logout } from '../../models/user';
</script>

<div class="flex flex-col w-full p-4">
	<h2 class="text-2xl font-semibold">User Settings</h2>
	<Line />
	<nav class="flex flex-col">
		<SettingsNavButton text="My Account" icon={faUser} />
		<SettingsNavButton text="Danger Zone" icon={faTriangleExclamation} />
	</nav>

	<Line />
	<nav class="flex flex-col">
		<button
			class="flex items-center bg-gray-300/50 hover:bg-gray-300/100 m-1 transition rounded-md overflow-hidden"
			on:click={logout}
		>
			<Fa icon={faArrowRightFromBracket} class="text-lg ml-4" />
			<p class="m-2">Sign out</p>
			<div class="h-full w-4 ml-auto" />
		</button>
	</nav>
</div>

<a href="/" class="flex items-center self-center text-xl m-8 hover:text-gray-600 transition"
	><Fa icon={faBackward} class="text-xl mr-2" />Go back</a
>
