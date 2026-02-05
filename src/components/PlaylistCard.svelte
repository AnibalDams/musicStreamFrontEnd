<script lang="ts">
	import { player } from "$lib/musics.svelte";
	import { onMount } from "svelte";

    let {playlist} = $props();

    let musicPlaylist:any=[]
    onMount(()=>{
        console.log(playlist)
    })
    function setMusic(){
            for(let i=0; i<playlist.musics.length; i++){
            musicPlaylist.push({
                id: playlist.musics[i]._id,
                title: playlist.musics[i].name,
                url: `http://localhost:8000/static/${playlist.musics[i].audio}`,
                cover: `http://localhost:8000/static/${playlist.musics[i].cover}`,
                artist: playlist.userId.username

            })
        
        }
        player.setPlaylist(musicPlaylist)
        player.play()
    }
</script>


<div class="container">
<div class="cover_container">
    <img src={`http://localhost:8000/static/${playlist.cover}`} alt="">
    <button class="play_button" aria-label="Play playlist" onclick={setMusic}>

       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--secondary-color)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8l-13 -8" /></svg>

    </button>
</div>
<span>{playlist.name}</span>
</div>


<style>
    .container{
        width: 200px;
        height: 360px;
        border-radius: 8px;
        cursor: pointer;
    }
    .container:hover {
        transform: translateY(-4px);
        transition: 0.1s;
        filter: brightness(1.1);
    }
    .container .cover_container{
        position: relative;
        width: 100%;
        height: 200px;
        margin-bottom: 8px;
        overflow: hidden;
    }
    .container .cover_container .play_button{
        position: absolute;
        top: 75%;
        left: 75%;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.1s;
        cursor: pointer;
    }
    .container .cover_container .play_button:hover {
        transform: scale(1.1);
    }
    .container .cover_container img{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
    }
    .container span {
        font-weight:  bold;
    }

</style>