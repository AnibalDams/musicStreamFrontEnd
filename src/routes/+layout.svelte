<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Player from '../components/Player.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<Player/>