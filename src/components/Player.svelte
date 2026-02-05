<script lang="ts">
	import formatDuration from '$lib/formatDuration';
	import { onMount } from 'svelte';
	import RangeSlider from './RangeSlider.svelte';
	import { player } from '$lib/musics.svelte';

	let paused = $state(true);
	let duration = $derived(player.duration);
	let durationFormatted = $derived(formatDuration(duration));

	let currentT = $derived(formatDuration(player.currentTime));

	// $effect(()=>{ if(volume == 0){
	//   paused = true;
	// }else{
	//   paused = false;
	// }})
</script>

<div class="player-container">
	<div class="left">
		<img
			src={player.currentTrack?.cover}
			alt=""
			 class:playing={player.isPlaying}
		/>
		<div class="text">
			<span class="name">{player.currentTrack?.title}</span>
			<span class="artist">{player.currentTrack?.artist}</span>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			style="margin-left: 12px;"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
			/></svg
		>
	</div>
	<div class="center">
		<div class="actions">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-shuffle-2"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 4l3 3l-3 3" /><path
					d="M18 20l3 -3l-3 -3"
				/><path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" /><path
					d="M3 17h3a5 5 0 0 0 5 -5a5 5 0 0 1 5 -5h5"
				/></svg
			>
			<span onclick={() => player.prev()}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-player-skip-back"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M20 5v14l-12 -7l12 -7"
					/><path d="M4 5l0 14" /></svg
				></span
			>
			<span onclick={() => player.toggle()} class="play"
				>
        {#if player.isPlaying}
        <svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M6 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12"
					/><path
						d="M14 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12"
					/></svg
				>{:else}
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8l-13 -8" /></svg>
        {/if}
        
        </span
			>
			<span onclick={() => player.next()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-player-skip-forward"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M4 5v14l12 -7l-12 -7"
					/><path d="M20 5l0 14" /></svg
				></span
			>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-repeat"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
					d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"
				/><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" /></svg
			>
		</div>
		{#if player.currentTrack}
			<div class="track">
				<span>{currentT}</span>
				<RangeSlider
					max={duration}
					bind:value={player.currentTime}
					oninput={(e) => player.seek(e.target.value)}
				/>
				<span>{durationFormatted}</span>
			</div>
		{/if}
	</div>
	<div class="right">
		<div class="volume">
        
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
         onclick={()=>player.toggleMute()}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-volume"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8a5 5 0 0 1 0 8" /><path
					d="M17.7 5a9 9 0 0 1 0 14"
				/><path
					d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"
				/></svg
			>
			<RangeSlider bind:value={player.volume} min={0} max={1} step={0.01} />
		</div>
	</div>
</div>

<style>
	.player-container {
		/* Esto es lo vital: */
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		bottom: 0;
		left: 0;

		/* Para que ocupe todo el ancho */
		width: 100%;

		/* Altura fija (ejemplo: 90px) */
		height: 90px;

		/* Estética */
		background-color: var(--secondary-color);
		border-top: 1px solid #333;
		color: var(--secondary-text);
		border-top: 1px solid #333;

		/* Z-INDEX: Asegura que flote SOBRE todo lo demás */
		z-index: 100;
	}
	.player-container .left {
		display: flex;
		align-items: center;
		gap: 8px;
	}
/* Estilo base de la imagen (SIN animación) */
.player-container .left img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    transition: 2s; /* Esto ayuda a que el cambio de opacidad sea suave al pausar */
}

/* Nueva clase que se activa solo al reproducir */
.player-container .left img.playing {
    animation: opacity 1s ease-in-out infinite alternate both;
}
	.player-container .left .text {
		display: flex;
		flex-direction: column;
	}
	.player-container .left .text span.name {
		font-weight: bold;
	}
	.player-container .left .text span.artist {
		color: var(--secondary-text-light);
	}

	.player-container .center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: 800px;
	}

	.player-container .center .actions {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
	}
	.player-container .center .actions .play svg {
		fill: var(--secondary-color);
	}
	.player-container .center .actions .play {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		padding: 8px;
		background-color: var(--secondary-text);
		cursor: pointer;
	}

	.player-container .center .track {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 8px;
	}
	.player-container .center .track span {
		color: var(--secondary-text-light);
	}

	.player-container .volume {
		display: flex;
		align-items: center;
    justify-content: center;
		gap: 8px;
	}

	@keyframes opacity {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}
</style>
