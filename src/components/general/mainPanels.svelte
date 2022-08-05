<script>
	import Card from './card.svelte';
</script>

<Card>
	<slot name="menu" />
</Card>
<Card>
	<slot name="main" />
</Card>
