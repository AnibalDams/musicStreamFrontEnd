<script>
	import { player } from "$lib/musics.svelte";
	let {onclick=()=>{}, cover="", name=""}=$props()

</script>
<div class="container" onclick={()=>onclick()}>
	<div style="display: flex; align-items: center; gap: 8px;">
		<img src={cover} alt="" />
		<span style="font-weight: bold;">{name}</span>
	</div>

	<span class="play"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
			/></svg
		></span
	>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400px;
		height: 60px;
		background-color: var(--secondary-color);
		border-radius: 8px;
		padding-right: 8px;
		cursor: pointer;
		transition: 0.1s;
	}
	.container img {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-bottom-left-radius: 8px;
		border-top-left-radius: 8px;
	}
	.container:hover {
		transform: scale(1.02);
		filter: brightness(1.1);
	}
	.container:hover .play {
		display: flex;
	}
	.play {
		display: none;

		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		padding: 8px;
		background-color: var(--primary-color);
	}
	.play svg {
		fill: var(--secondary-color);
	}
</style>
