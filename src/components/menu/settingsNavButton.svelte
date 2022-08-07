<script lang="ts">
	import Fa from 'svelte-fa';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

	import { settingsNav, setSettingsNav } from '../../stores/settingsNav';

	export let text: string;
	export let icon: IconDefinition;

	function goToSetting() {
		setSettingsNav(text);
	}
</script>

<button
	class="flex items-center bg-gray-200/50 hover:bg-gray-200/100 m-1 transition rounded-md overflow-hidden"
	on:click={goToSetting}
>
	<Fa {icon} class="text-lg ml-4" />
	<p class="m-2">{text}</p>
	<div
		class={`h-full w-4 ml-auto rounded-sm ${
			$settingsNav && text === $settingsNav ? 'bg-blue-400' : ''
		}`}
	/>
</button>
