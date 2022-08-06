<script lang="ts">
	import Fa from 'svelte-fa';
	import { faLock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import { SyncLoader } from 'svelte-loading-spinners';
	import ChatContainer from '../../components/main/chatContainer.svelte';
	import { setCurrentChat } from '../../stores/currentChat';

	setCurrentChat();

	export let status: string = 'loading';
</script>

<ChatContainer>
	<h1 slot="chat-header" class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">
		{#if status == 'disconnected'}
			Oops! Could not connect
		{:else if status == 'locked'}
			Sign in to start chatting
		{:else}
			Loading...
		{/if}
	</h1>
	<div slot="messages" class="flex items-center justify-center w-full h-full overflow-y-auto">
		{#if status == 'disconnected'}
			<Fa icon={faTriangleExclamation} class="text-9xl text-blue-400" />
		{:else if status == 'locked'}
			<Fa icon={faLock} class="text-9xl text-blue-400" />
		{:else}
			<SyncLoader size="10" color="#60a5fa" unit="rem" duration=".5s" />
		{/if}
	</div>
</ChatContainer>
