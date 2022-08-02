<script lang="ts">
	import Message from './message.svelte';
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import dateToString from '../functions/dateToString';

	type User = {
		id: string;
		name: string;
		pf_pic?: string;
	};

	let user: User = {
		id: '1',
		name: 'John Doe',
		pf_pic: 'https://i.pravatar.cc/300'
	};
	let dateTime = dateToString(new Date());
	let message =
		'Lorem, ipsum dolor sit ametcon sectetura dipisicing elit. At, rem assumenda, nulla ex aut magnam quisquam commodi neque delectus';
</script>

<h1 class="text-5xl p-6 font-semibold w-full text-center bg-gray-400/20">Central Chat</h1>
<article class="flex flex-col items-center">
	<div class="messages w-full overflow-y-auto">
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
		<Message {user} {dateTime} {message} />
	</div>
	<div class="flex h-20 w-full">
		<input
			class="flex-grow p-6 text-2xl outline-none border-transparent focus:border-gray-400 border-2 rounded-bl-md transition"
			type="text"
			placeholder="Start typing..."
		/>
		<button class="flex items-center justify-center w-20 bg-blue-400 hover:bg-blue-500 transition"
			><Fa icon={faPaperPlane} class="text-3xl text-white" /></button
		>
	</div>
</article>

<style lang="scss">
	article {
		width: 50vw;

		.messages {
			height: 65vh;

			/* width */
			&::-webkit-scrollbar {
				width: 0.4rem;
			}

			/* Track */
			&::-webkit-scrollbar-track {
				background: #f1f1f1;
			}

			/* Handle */
			&::-webkit-scrollbar-thumb {
				background: #999;
			}

			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background: #888;
			}
		}
	}
</style>
