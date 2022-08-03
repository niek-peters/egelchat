<script>
	import Fa from 'svelte-fa';
	import { faArrowRightToBracket, faIdCard } from '@fortawesome/free-solid-svg-icons';
</script>

<p class="text-center text-2xl mt-4 mb-2">Log in to start chatting!</p>
<a
	href="/login"
	class="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 p-2 mb-4 w-32 text-xl rounded-md"
	><Fa icon={faArrowRightToBracket} class="text-2xl mr-2" />Login</a
>
<p class="text-center text-2xl mt-4 mb-2">Or create a new account</p>
<a
	href="/register"
	class="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 p-2 mb-4 w-32 text-xl rounded-md"
	><Fa icon={faIdCard} class="text-2xl mr-2" />Register</a
>
