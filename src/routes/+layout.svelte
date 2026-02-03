<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import LeftPanel from '../components/leftPanel.svelte';
	import Player from '../components/Player.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div style="display: flex; gap:12px;">
	<div style="width: 15%;">
	<LeftPanel/>
</div>
<div style="width:85%;">
{@render children()}</div></div>
<Player/>