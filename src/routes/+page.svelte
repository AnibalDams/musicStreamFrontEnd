<script lang="ts">
	import { onMount } from "svelte";
    import LeftPanel from "../components/leftPanel.svelte";
	import LongMusicCard from "../components/LongMusicCard.svelte";
	import { player } from "$lib/musics.svelte.js";
    let {data} = $props();
    let musicPlaylist:any=$state([])

    onMount(()=>{
        console.log(data)
    })

    function setMusic(index:number){

        for(let i=0; i<data.music.length; i++){
            musicPlaylist.push({
                id: data.music[i]._id,
                title: data.music[i].name,
                url: `http://localhost:8000/static/${data.music[i].audio}`,
                cover: `http://localhost:8000/static/${data.music[i].cover}`,
                artist: data.music[i].artist.username

            })
        
        }
        player.setPlaylist(musicPlaylist)
        player.play(index)
    
    }
</script>

<div class="container">


    <h1>Hi, Anibal!</h1>
    <div class="latest_music_container">
        {#each data.music as music, index}
            
        <LongMusicCard cover={`http://localhost:8000/static/${music.cover}`} name={music.name} onclick={()=>setMusic(index)}/>
        {/each}
        
        
    </div>
    <h1>Made for you</h1>
</div>


<style>

    .container{
        display: flex;
        flex-direction: column;
        margin: 20px;
        gap: 32px;
    }

    .latest_music_container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
</style>